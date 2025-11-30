/**
 * Create Cashfree Order Edge Function
 *
 * Creates a payment order in Cashfree for one-time payments (course enrollment).
 * Returns a payment session ID that can be used to initiate checkout.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderRequest {
  orderId: string;
  orderAmount: number;
  orderCurrency: string;
  customerDetails: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  orderNote?: string;
  orderMeta?: {
    returnUrl: string;
    notifyUrl: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const cashfreeAppId = Deno.env.get("CASHFREE_APP_ID");
    const cashfreeSecretKey = Deno.env.get("CASHFREE_SECRET_KEY");
    const cashfreeMode = Deno.env.get("CASHFREE_MODE") || "sandbox";

    if (!cashfreeAppId || !cashfreeSecretKey) {
      throw new Error("Cashfree credentials not configured");
    }

    const orderRequest: OrderRequest = await req.json();

    const cashfreeApiUrl =
      cashfreeMode === "production"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    const orderPayload = {
      order_id: orderRequest.orderId,
      order_amount: orderRequest.orderAmount,
      order_currency: orderRequest.orderCurrency || "INR",
      customer_details: {
        customer_id: orderRequest.customerDetails.customerId,
        customer_name: orderRequest.customerDetails.customerName,
        customer_email: orderRequest.customerDetails.customerEmail,
        customer_phone: orderRequest.customerDetails.customerPhone,
      },
      order_meta: {
        return_url: orderRequest.orderMeta?.returnUrl || Deno.env.get("CASHFREE_RETURN_URL"),
        notify_url: orderRequest.orderMeta?.notifyUrl || Deno.env.get("CASHFREE_NOTIFY_URL"),
      },
      order_note: orderRequest.orderNote || "",
    };

    const response = await fetch(cashfreeApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": cashfreeAppId,
        "x-client-secret": cashfreeSecretKey,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cashfree API Error:", errorData);
      throw new Error(errorData.message || "Failed to create order");
    }

    const orderData = await response.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseUrl && supabaseServiceKey) {
      const { createClient } = await import("jsr:@supabase/supabase-js@2");
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase.from("payment_orders").insert({
        order_id: orderRequest.orderId,
        cashfree_order_id: orderData.cf_order_id,
        amount: orderRequest.orderAmount,
        currency: orderRequest.orderCurrency || "INR",
        customer_id: orderRequest.customerDetails.customerId,
        customer_email: orderRequest.customerDetails.customerEmail,
        status: "PENDING",
        payment_session_id: orderData.payment_session_id,
        created_at: new Date().toISOString(),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderData.order_id,
        payment_session_id: orderData.payment_session_id,
        cf_order_id: orderData.cf_order_id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error creating Cashfree order:", error);

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
