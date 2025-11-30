import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      enrollments: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          service_name: string;
          service_price: number;
          status: string;
          order_id: string;
          transaction_id: string | null;
          payment_method: string | null;
          promo_code: string | null;
          discount_amount: number | null;
          final_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          phone: string;
          service_name: string;
          service_price: number;
          status?: string;
          order_id: string;
          transaction_id?: string | null;
          payment_method?: string | null;
          promo_code?: string | null;
          discount_amount?: number | null;
          final_amount: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string;
          service_name?: string;
          service_price?: number;
          status?: string;
          order_id?: string;
          transaction_id?: string | null;
          payment_method?: string | null;
          promo_code?: string | null;
          discount_amount?: number | null;
          final_amount?: number;
          created_at?: string;
        };
      };
      user_courses: {
        Row: {
          id: string;
          user_id: string;
          course_name: string;
          enrollment_id: string;
          access_granted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_name: string;
          enrollment_id: string;
          access_granted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_name?: string;
          enrollment_id?: string;
          access_granted?: boolean;
          created_at?: string;
        };
      };
    };
  };
};
