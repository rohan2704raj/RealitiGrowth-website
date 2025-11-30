/**
 * Cashfree Payment Gateway Integration
 *
 * This module provides utilities for integrating with Cashfree Payment Gateway
 * for both one-time payments (course enrollment) and recurring subscriptions
 * (Copy Trades and Indicator services).
 *
 * Documentation: https://docs.cashfree.com/docs/
 */

import { load } from 'cashfree-pg-sdk-javascript';

// Cashfree Configuration
const CASHFREE_CONFIG = {
  appId: import.meta.env.VITE_CASHFREE_APP_ID || '',
  mode: (import.meta.env.VITE_CASHFREE_MODE || 'sandbox') as 'sandbox' | 'production',
  returnUrl: import.meta.env.VITE_CASHFREE_RETURN_URL || window.location.origin + '/payment/success',
  notifyUrl: import.meta.env.VITE_CASHFREE_NOTIFY_URL || window.location.origin + '/api/webhooks/cashfree',
};

// Subscription Plan IDs
export const CASHFREE_PLANS = {
  copyTrades: {
    monthly: import.meta.env.VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY || '',
    quarterly: import.meta.env.VITE_CASHFREE_PLAN_COPY_TRADES_QUARTERLY || '',
    annual: import.meta.env.VITE_CASHFREE_PLAN_COPY_TRADES_ANNUAL || '',
  },
  indicator: {
    monthly: import.meta.env.VITE_CASHFREE_PLAN_INDICATOR_MONTHLY || '',
    quarterly: import.meta.env.VITE_CASHFREE_PLAN_INDICATOR_QUARTERLY || '',
    annual: import.meta.env.VITE_CASHFREE_PLAN_INDICATOR_ANNUAL || '',
  },
};

// Types
export interface CashfreeOrderData {
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

export interface CashfreeSubscriptionData {
  subscriptionId: string;
  planId: string;
  customerDetails: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  subscriptionMeta?: {
    returnUrl: string;
    notifyUrl: string;
  };
}

export interface CashfreePaymentResponse {
  orderId: string;
  orderStatus: string;
  paymentSessionId: string;
  referenceId?: string;
  txMsg?: string;
  txTime?: string;
}

/**
 * Initialize Cashfree SDK
 */
let cashfreeInstance: any = null;

export async function initializeCashfree() {
  if (!cashfreeInstance) {
    cashfreeInstance = await load({ mode: CASHFREE_CONFIG.mode });
  }
  return cashfreeInstance;
}

/**
 * Generate unique order ID
 */
export function generateOrderId(prefix: string = 'ORD'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generate unique subscription ID
 */
export function generateSubscriptionId(prefix: string = 'SUB'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Create Cashfree Order for One-Time Payment
 * Call your backend API to create the order
 */
export async function createCashfreeOrder(
  orderData: CashfreeOrderData,
  supabaseUrl: string,
  anonKey: string
): Promise<{ sessionId: string; orderId: string }> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-cashfree-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    const data = await response.json();
    return {
      sessionId: data.payment_session_id,
      orderId: data.order_id,
    };
  } catch (error) {
    console.error('Error creating Cashfree order:', error);
    throw error;
  }
}

/**
 * Create Cashfree Subscription for Recurring Payment
 * Call your backend API to create the subscription
 */
export async function createCashfreeSubscription(
  subscriptionData: CashfreeSubscriptionData,
  supabaseUrl: string,
  anonKey: string
): Promise<{ authLink: string; subscriptionId: string }> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-cashfree-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create subscription');
    }

    const data = await response.json();
    return {
      authLink: data.authorization_link,
      subscriptionId: data.subscription_id,
    };
  } catch (error) {
    console.error('Error creating Cashfree subscription:', error);
    throw error;
  }
}

/**
 * Open Cashfree Checkout (Seamless Integration)
 * Displays the payment form embedded on your page
 */
export async function openCashfreeCheckout(
  sessionId: string,
  options?: {
    onSuccess?: (data: any) => void;
    onFailure?: (error: any) => void;
    onClose?: () => void;
  }
): Promise<void> {
  try {
    const cashfree = await initializeCashfree();

    const checkoutOptions = {
      paymentSessionId: sessionId,
      returnUrl: CASHFREE_CONFIG.returnUrl,
      ...options,
    };

    await cashfree.checkout(checkoutOptions);
  } catch (error) {
    console.error('Error opening Cashfree checkout:', error);
    throw error;
  }
}

/**
 * Redirect to Cashfree Hosted Checkout
 * User is redirected to Cashfree's hosted payment page
 */
export async function redirectToCashfreeCheckout(
  sessionId: string
): Promise<void> {
  const cashfree = await initializeCashfree();

  const redirectUrl = cashfree.getPaymentUrl({
    paymentSessionId: sessionId,
    returnUrl: CASHFREE_CONFIG.returnUrl,
  });

  window.location.href = redirectUrl;
}

/**
 * Verify Payment Signature (Call from backend)
 * This should be done server-side for security
 */
export async function verifyPaymentSignature(
  orderId: string,
  orderAmount: string,
  referenceId: string,
  txStatus: string,
  paymentMode: string,
  txMsg: string,
  txTime: string,
  signature: string,
  supabaseUrl: string,
  anonKey: string
): Promise<boolean> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/verify-cashfree-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        orderId,
        orderAmount,
        referenceId,
        txStatus,
        paymentMode,
        txMsg,
        txTime,
        signature,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.verified === true;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Get Order Status from Cashfree
 * Call backend to fetch order status
 */
export async function getOrderStatus(
  orderId: string,
  supabaseUrl: string,
  anonKey: string
): Promise<any> {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-cashfree-order-status?orderId=${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${anonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
}

/**
 * Get Subscription Status from Cashfree
 * Call backend to fetch subscription status
 */
export async function getSubscriptionStatus(
  subscriptionId: string,
  supabaseUrl: string,
  anonKey: string
): Promise<any> {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-cashfree-subscription-status?subscriptionId=${subscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${anonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    throw error;
  }
}

/**
 * Cancel Subscription
 * Call backend to cancel subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  supabaseUrl: string,
  anonKey: string
): Promise<boolean> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/cancel-cashfree-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    return true;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}

/**
 * Process Refund
 * Call backend to process refund
 */
export async function processRefund(
  orderId: string,
  refundAmount: number,
  refundNote: string,
  supabaseUrl: string,
  anonKey: string
): Promise<any> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/process-cashfree-refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        orderId,
        refundAmount,
        refundNote,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process refund');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing refund:', error);
    throw error;
  }
}

/**
 * Get Plan ID based on service and billing cycle
 */
export function getCashfreePlanId(
  service: 'copyTrades' | 'indicator',
  billingCycle: 'monthly' | 'quarterly' | 'annual'
): string {
  return CASHFREE_PLANS[service][billingCycle];
}

/**
 * Format amount for Cashfree (in rupees, not paise)
 */
export function formatCashfreeAmount(amount: number): number {
  return Number(amount.toFixed(2));
}

/**
 * Parse payment response from URL parameters
 */
export function parsePaymentResponse(searchParams: URLSearchParams): CashfreePaymentResponse {
  return {
    orderId: searchParams.get('orderId') || '',
    orderStatus: searchParams.get('orderStatus') || '',
    paymentSessionId: searchParams.get('paymentSessionId') || '',
    referenceId: searchParams.get('referenceId') || '',
    txMsg: searchParams.get('txMsg') || '',
    txTime: searchParams.get('txTime') || '',
  };
}

/**
 * Check if Cashfree is configured
 */
export function isCashfreeConfigured(): boolean {
  return Boolean(CASHFREE_CONFIG.appId && CASHFREE_CONFIG.mode);
}

/**
 * Get payment method display name
 */
export function getPaymentMethodName(method: string): string {
  const methodNames: Record<string, string> = {
    'upi': 'UPI',
    'card': 'Credit/Debit Card',
    'nb': 'Net Banking',
    'wallet': 'Wallet',
    'paylater': 'Pay Later',
    'emi': 'EMI',
  };
  return methodNames[method.toLowerCase()] || method;
}

export default {
  initializeCashfree,
  generateOrderId,
  generateSubscriptionId,
  createCashfreeOrder,
  createCashfreeSubscription,
  openCashfreeCheckout,
  redirectToCashfreeCheckout,
  verifyPaymentSignature,
  getOrderStatus,
  getSubscriptionStatus,
  cancelSubscription,
  processRefund,
  getCashfreePlanId,
  formatCashfreeAmount,
  parsePaymentResponse,
  isCashfreeConfigured,
  getPaymentMethodName,
  CASHFREE_PLANS,
};
