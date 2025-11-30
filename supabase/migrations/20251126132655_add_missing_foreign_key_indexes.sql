/*
  # Add Missing Foreign Key Indexes

  ## Overview
  Adds indexes for foreign key columns that were missing covering indexes.
  This is critical for query performance, especially for JOIN operations and CASCADE deletes.

  ## Changes
  1. Add index for enrollments.user_id (foreign key to auth.users)
  2. Add index for user_courses.enrollment_id (foreign key to enrollments)
  3. Add index for user_sessions.user_id (foreign key to auth.users)

  ## Performance Impact
  - Dramatically improves JOIN query performance
  - Speeds up CASCADE delete operations
  - Prevents full table scans when querying by foreign key

  ## Note on "Unused" Indexes
  The warnings about unused indexes on subscriptions, invoices, downloads, and activations
  tables are expected during development. These indexes are essential for production workloads:
  - User lookups (user_id indexes)
  - Stripe webhook processing (stripe_id indexes)
  - License validation (license_key indexes)
  - Platform analytics (platform indexes)
  - Status filtering (status indexes)
  
  These should NOT be removed as they will be critical once the app has real traffic.
*/

-- ============================================================================
-- ADD MISSING FOREIGN KEY INDEXES
-- ============================================================================

-- Index for enrollments.user_id foreign key
-- This FK references auth.users and is used in JOINs and user enrollment queries
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id 
  ON enrollments(user_id);

-- Index for user_courses.enrollment_id foreign key  
-- This FK references enrollments and is used in JOINs between courses and enrollments
CREATE INDEX IF NOT EXISTS idx_user_courses_enrollment_id
  ON user_courses(enrollment_id);

-- Index for user_sessions.user_id foreign key
-- This FK references auth.users and is used in session lookup queries
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id
  ON user_sessions(user_id);

-- Also add an index on user_sessions.expires_at for cleanup queries
-- This will be useful for the session cleanup process
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at
  ON user_sessions(expires_at);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After this migration:
-- ✓ All foreign keys have covering indexes
-- ✓ JOIN operations will be significantly faster
-- ✓ CASCADE operations will be optimized
-- ✓ No more unindexed foreign key warnings
