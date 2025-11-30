import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  Edit,
  Save,
  X,
  Shield,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setEnrollments(data);
    };

    fetchEnrollments();
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: formData.fullName },
      });

      if (updateError) throw updateError;

      setSuccess('Profile updated successfully');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628]">
      <nav className="bg-[#0A1628]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FF88] flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-white font-bold text-xl group-hover:text-[#00FF88] transition-colors">
                RealitiGrowth
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-white/80 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">My Profile</h1>
          <p className="text-white/60 text-lg mb-12">Manage your account settings and information</p>
        </motion.div>

        {success && (
          <motion.div
            className="bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-4 mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-5 h-5 text-[#00FF88]" />
            <p className="text-[#00FF88]">{success}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="lg:col-span-2 bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Personal Information</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 text-[#00FF88] hover:underline"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        fullName: user?.user_metadata?.full_name || '',
                        email: user?.email || '',
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white/60 text-sm mb-2">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF88]/50 transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 text-white">
                    <User className="w-5 h-5 text-white/40" />
                    <span className="text-lg">{user?.user_metadata?.full_name || 'Not set'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Email Address</label>
                <div className="flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-white/40" />
                  <span className="text-lg">{user?.email}</span>
                  {user?.email_confirmed_at && (
                    <span className="flex items-center gap-1 text-xs text-[#00FF88] bg-[#00FF88]/10 px-2 py-1 rounded">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Member Since</label>
                <div className="flex items-center gap-3 text-white">
                  <Calendar className="w-5 h-5 text-white/40" />
                  <span className="text-lg">
                    {user?.created_at ? formatDate(user.created_at) : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Account Security</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#00FF88] mt-1" />
                <div>
                  <p className="text-white font-semibold mb-1">Password</p>
                  <p className="text-white/60 text-sm mb-2">Last updated recently</p>
                  <Link
                    to="/forgot-password"
                    className="text-[#00FF88] hover:underline text-sm"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Enrollment History</h2>
          {enrollments.length === 0 ? (
            <p className="text-white/60">No enrollments yet</p>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {enrollment.service_name}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {formatDate(enrollment.created_at)}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-[#00FF88]/20 text-[#00FF88] text-sm rounded-full">
                      {enrollment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Order ID:</span>
                    <span className="text-white font-mono">{enrollment.order_id}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-white/60">Amount Paid:</span>
                    <span className="text-white font-bold">
                      ₹{enrollment.final_amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
