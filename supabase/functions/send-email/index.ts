/**
 * Send Email Edge Function
 *
 * Sends transactional emails using Resend API and tracks them in the database.
 * Supports template-based emails with variable replacement.
 *
 * Request body:
 * {
 *   template_key: string - Template identifier (e.g., 'welcome_verification')
 *   to: string - Recipient email address
 *   variables: object - Variables to replace in template
 *   user_id?: string - Optional user ID for tracking
 *   attachments?: array - Optional email attachments
 * }
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  template_key: string;
  to: string;
  variables: Record<string, string>;
  user_id?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

interface EmailTemplate {
  id: string;
  template_key: string;
  template_name: string;
  subject: string;
  html_body: string;
  text_body: string;
  variables: string[];
  is_active: boolean;
}

/**
 * Replace template variables with actual values
 */
function replaceVariables(template: string, variables: Record<string, string>): string {
  let result = template;

  // Replace all {{variable}} patterns
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value || '');
  }

  // Add default variables
  const defaults = {
    email_from: Deno.env.get("EMAIL_FROM_ADDRESS") || "hi@realitigrowth.com",
    support_phone: Deno.env.get("SUPPORT_PHONE") || "+91 70193 85981",
    support_whatsapp: Deno.env.get("SUPPORT_WHATSAPP") || "+91 70193 85981",
    company_address: Deno.env.get("COMPANY_ADDRESS") || "No 639, 3rd Cross, 1st Main, Mahalakshmi Layout, Bangalore - 560086",
    site_url: Deno.env.get("SITE_URL") || "https://realitigrowth.com",
  };

  for (const [key, value] of Object.entries(defaults)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }

  return result;
}

/**
 * Send email using Resend API
 */
async function sendWithResend(
  to: string,
  subject: string,
  htmlBody: string,
  textBody: string,
  attachments?: Array<{ filename: string; content: string }>
): Promise<{ id: string; error?: string }> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const emailFromAddress = Deno.env.get("EMAIL_FROM_ADDRESS") || "hi@realitigrowth.com";
  const emailFromName = Deno.env.get("EMAIL_FROM_NAME") || "RealitiGrowth Team";
  const emailReplyTo = Deno.env.get("EMAIL_REPLY_TO") || "hi@realitigrowth.com";

  const payload: any = {
    from: `${emailFromName} <${emailFromAddress}>`,
    to: [to],
    reply_to: emailReplyTo,
    subject,
    html: htmlBody,
    text: textBody,
  };

  // Add attachments if provided
  if (attachments && attachments.length > 0) {
    payload.attachments = attachments;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      id: "",
      error: data.message || "Failed to send email",
    };
  }

  return {
    id: data.id,
  };
}

/**
 * Log email to database
 */
async function logEmail(
  supabaseClient: any,
  emailData: {
    user_id?: string;
    email_to: string;
    template_key: string;
    subject: string;
    status: string;
    external_id?: string;
    error_message?: string;
    metadata?: Record<string, any>;
  }
) {
  const { error } = await supabaseClient
    .from("email_logs")
    .insert({
      ...emailData,
      sent_at: emailData.status === "sent" ? new Date().toISOString() : null,
    });

  if (error) {
    console.error("Failed to log email:", error);
  }
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Parse request body
    const emailRequest: EmailRequest = await req.json();

    // Validate required fields
    if (!emailRequest.template_key || !emailRequest.to) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: template_key and to are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const { createClient } = await import("jsr:@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch email template
    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("template_key", emailRequest.template_key)
      .eq("is_active", true)
      .single();

    if (templateError || !template) {
      return new Response(
        JSON.stringify({
          error: `Template not found: ${emailRequest.template_key}`,
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Replace variables in template
    const subject = replaceVariables(template.subject, emailRequest.variables);
    const htmlBody = replaceVariables(template.html_body, emailRequest.variables);
    const textBody = replaceVariables(template.text_body, emailRequest.variables);

    // Send email via Resend
    const { id: externalId, error: sendError } = await sendWithResend(
      emailRequest.to,
      subject,
      htmlBody,
      textBody,
      emailRequest.attachments
    );

    // Log email to database
    await logEmail(supabase, {
      user_id: emailRequest.user_id,
      email_to: emailRequest.to,
      template_key: emailRequest.template_key,
      subject,
      status: sendError ? "failed" : "sent",
      external_id: externalId,
      error_message: sendError,
      metadata: emailRequest.variables,
    });

    if (sendError) {
      return new Response(
        JSON.stringify({
          error: sendError,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message_id: externalId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Email function error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
