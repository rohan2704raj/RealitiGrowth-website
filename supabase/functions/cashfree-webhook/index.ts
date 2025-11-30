/**
 * Cashfree Webhook Handler Edge Function
 *
 * Handles webhook notifications from Cashfree for:
 * - Payment success/failure
 * - Subscription activation
 * - Subscription payment success/failure
 * - Subscription cancellation
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createHmac } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * Verify webhook signature from Cashfree
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  timestamp: string,
  secret: string
): boolean {
  const signedPayload = `${timestamp}${payload}`;
  const expectedSignature = createHmac("sha256", secret)
    .update(signedPayload)
    .digest("base64");

  return signature === expectedSignature;
}

/**
 * Handle payment success webhook
 */
async function handlePaymentSuccess(data: any, supabase: any) {
  const orderId = data.order.order_id;
  const paymentId = data.payment.cf_payment_id;
  const amount = data.order.order_amount;
  const paymentMethod = data.payment.payment_group;

  const { data: orderData } = await supabase
    .from("payment_orders")
    .select("*")
    .eq("order_id", orderId)
    .single();

  if (!orderData) {
    console.error("Order not found:", orderId);
    return;
  }

  if (orderData.status === "SUCCESS") {
    console.log("Order already processed:", orderId);
    return;
  }

  await supabase
    .from("payment_orders")
    .update({
      status: "SUCCESS",
      payment_id: paymentId,
      payment_method: paymentMethod,
      paid_at: new Date().toISOString(),
    })
    .eq("order_id", orderId);

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", orderData.customer_email)
    .single();

  if (user) {
    await supabase.from("enrollments").insert({
      user_id: user.id,
      order_id: orderId,
      transaction_id: paymentId,
      amount: amount,
      payment_method: paymentMethod,
      status: "completed",
      created_at: new Date().toISOString(),
    });

    await supabase.from("user_courses").insert({
      user_id: user.id,
      course_id: "trading-mastery",
      enrolled_at: new Date().toISOString(),
      access_level: "full",
    });

    await supabase.functions.invoke("send-email", {
      body: {
        template_key: "enrollment_payment_confirmation",
        to: orderData.customer_email,
        user_id: user.id,
        variables: {
          user_name: user.full_name || user.email,
          order_id: orderId,
          transaction_id: paymentId,
          program_name: "A-Z Stock, Forex & Crypto Mastering Program",
          amount_paid: "35,000",
          payment_date: new Date().toLocaleString(),
          payment_method: paymentMethod,
          dashboard_url: `${Deno.env.get("SITE_URL")}/dashboard`,
        },
      },
    });

    setTimeout(() => {
      supabase.functions.invoke("send-email", {
        body: {
          template_key: "course_access_credentials",
          to: orderData.customer_email,
          user_id: user.id,
          variables: {
            user_name: user.full_name || user.email,
            dashboard_url: `${Deno.env.get("SITE_URL")}/dashboard`,
            username: user.email,
          },
        },
      });
    }, 2 * 60 * 1000);

    setTimeout(() => {
      supabase.functions.invoke("send-email", {
        body: {
          template_key: "enrollment_welcome_guide",
          to: orderData.customer_email,
          user_id: user.id,
          variables: {
            user_name: user.full_name || user.email,
            dashboard_url: `${Deno.env.get("SITE_URL")}/dashboard`,
          },
        },
      });
    }, 5 * 60 * 1000);
  }
}

/**
 * Handle payment failure webhook
 */
async function handlePaymentFailure(data: any, supabase: any) {
  const orderId = data.order.order_id;

  await supabase
    .from("payment_orders")
    .update({
      status: "FAILED",
      failure_reason: data.payment.payment_message || "Payment failed",
    })
    .eq("order_id", orderId);
}

/**
 * Handle subscription activation webhook
 */
async function handleSubscriptionActivated(data: any, supabase: any) {
  const subscriptionId = data.subscription.subscription_id;
  const customerId = data.subscription.customer_id;
  const planId = data.subscription.plan_id;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", customerId)
    .single();

  if (!user) {
    console.error("User not found:", customerId);
    return;
  }

  await supabase.from("subscriptions").insert({
    user_id: user.id,
    subscription_id: subscriptionId,
    cashfree_subscription_id: data.subscription.cf_subscription_id,
    plan_id: planId,
    status: "active",
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(data.subscription.next_billing_date).toISOString(),
    created_at: new Date().toISOString(),
  });

  const serviceName = planId.includes("copy_trades") ? "Copy My Trades" : "RealitiGrowth Indicator";
  const templateKey = planId.includes("copy_trades")
    ? "subscription_copy_trades"
    : "subscription_indicator";

  await supabase.functions.invoke("send-email", {
    body: {
      template_key: templateKey,
      to: user.email,
      user_id: user.id,
      variables: {
        user_name: user.full_name || user.email,
        service_name: serviceName,
        subscription_id: subscriptionId,
      },
    },
  });
}

/**
 * Handle subscription payment success (renewal)
 */
async function handleSubscriptionPaymentSuccess(data: any, supabase: any) {
  const subscriptionId = data.subscription.subscription_id;
  const paymentId = data.payment.cf_payment_id;

  await supabase
    .from("subscriptions")
    .update({
      status: "active",
      last_payment_date: new Date().toISOString(),
      next_billing_date: new Date(data.subscription.next_billing_date).toISOString(),
    })
    .eq("subscription_id", subscriptionId);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, users(*)")
    .eq("subscription_id", subscriptionId)
    .single();

  if (subscription) {
    await supabase.functions.invoke("send-email", {
      body: {
        template_key: "successful_renewal",
        to: subscription.users.email,
        user_id: subscription.user_id,
        variables: {
          user_name: subscription.users.full_name || subscription.users.email,
          service_name: subscription.service_name,
          renewal_date: new Date().toLocaleDateString(),
        },
      },
    });
  }
}

/**
 * Handle subscription payment failure
 */
async function handleSubscriptionPaymentFailure(data: any, supabase: any) {
  const subscriptionId = data.subscription.subscription_id;

  await supabase
    .from("subscriptions")
    .update({
      status: "past_due",
    })
    .eq("subscription_id", subscriptionId);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, users(*)")
    .eq("subscription_id", subscriptionId)
    .single();

  if (subscription) {
    await supabase.functions.invoke("send-email", {
      body: {
        template_key: "payment_failed",
        to: subscription.users.email,
        user_id: subscription.user_id,
        variables: {
          user_name: subscription.users.full_name || subscription.users.email,
          service_name: subscription.service_name,
        },
      },
    });
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCancelled(data: any, supabase: any) {
  const subscriptionId = data.subscription.subscription_id;

  await supabase
    .from("subscriptions")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
    })
    .eq("subscription_id", subscriptionId);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, users(*)")
    .eq("subscription_id", subscriptionId)
    .single();

  if (subscription) {
    await supabase.functions.invoke("send-email", {
      body: {
        template_key: "subscription_cancelled",
        to: subscription.users.email,
        user_id: subscription.user_id,
        variables: {
          user_name: subscription.users.full_name || subscription.users.email,
          service_name: subscription.service_name,
          cancelled_date: new Date().toLocaleDateString(),
        },
      },
    });
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const webhookSecret = Deno.env.get("CASHFREE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured");
    }

    const signature = req.headers.get("x-webhook-signature") || "";
    const timestamp = req.headers.get("x-webhook-timestamp") || "";
    const rawBody = await req.text();

    const isValid = verifyWebhookSignature(rawBody, signature, timestamp, webhookSecret);

    if (!isValid) {
      console.error("Invalid webhook signature");
      return new Response("Invalid signature", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const webhookData = JSON.parse(rawBody);
    const eventType = webhookData.type;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }

    const { createClient } = await import("jsr:@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    await supabase.from("webhook_events").insert({
      event_type: eventType,
      payload: webhookData,
      created_at: new Date().toISOString(),
    });

    switch (eventType) {
      case "PAYMENT_SUCCESS_WEBHOOK":
        await handlePaymentSuccess(webhookData.data, supabase);
        break;

      case "PAYMENT_FAILED_WEBHOOK":
        await handlePaymentFailure(webhookData.data, supabase);
        break;

      case "SUBSCRIPTION_ACTIVATED_WEBHOOK":
        await handleSubscriptionActivated(webhookData.data, supabase);
        break;

      case "SUBSCRIPTION_PAYMENT_SUCCESS_WEBHOOK":
        await handleSubscriptionPaymentSuccess(webhookData.data, supabase);
        break;

      case "SUBSCRIPTION_PAYMENT_FAILED_WEBHOOK":
        await handleSubscriptionPaymentFailure(webhookData.data, supabase);
        break;

      case "SUBSCRIPTION_CANCELLED_WEBHOOK":
        await handleSubscriptionCancelled(webhookData.data, supabase);
        break;

      default:
        console.log("Unhandled webhook event type:", eventType);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Webhook processing error:", error);

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
