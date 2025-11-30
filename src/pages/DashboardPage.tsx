import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  Video,
  Award,
  LogOut,
  User,
  Clock,
  CheckCircle,
  Play,
  Lock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface UserCourse {
  id: string;
  course_name: string;
  access_granted: boolean;
  created_at: string;
}

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setCourses(data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const availableCourses = [
    {
      id: 'trading-mastery',
      name: 'A-Z Stock, Forex & Crypto Mastering Program',
      description: 'Complete trading mastery program covering stocks, forex, and cryptocurrency',
      lessons: 120,
      duration: '40 hours',
      icon: TrendingUp,
    },
    {
      id: 'copy-trades',
      name: 'Copy Trades Service',
      description: 'Get access to our professional trading signals and copy trades',
      lessons: 0,
      duration: 'Ongoing',
      icon: BookOpen,
    },
    {
      id: 'indicator',
      name: 'Premium Trading Indicator',
      description: 'Advanced trading indicator with real-time signals',
      lessons: 0,
      duration: 'Lifetime',
      icon: Video,
    },
  ];

  const hasCourseAccess = (courseName: string) => {
    return courses.some((c) => c.course_name === courseName && c.access_granted);
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
                to="/profile"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{user?.user_metadata?.full_name || user?.email}</span>
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Welcome Back, {user?.user_metadata?.full_name || 'Student'}!
          </h1>
          <p className="text-white/60 text-lg mb-12">Continue your trading journey</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-[#00FF88] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60">Loading your courses...</p>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <motion.div
            className="bg-[#1A2942]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white/40" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">No Courses Yet</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Browse our programs and start your trading journey today!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-[#00FF88]/30 transition-all"
            >
              Browse Courses
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course, index) => {
                  const hasAccess = hasCourseAccess(course.name);
                  const Icon = course.icon;

                  return (
                    <motion.div
                      key={course.id}
                      className={`bg-[#1A2942]/80 backdrop-blur-xl border rounded-2xl p-6 ${
                        hasAccess
                          ? 'border-[#00FF88]/30 hover:border-[#00FF88]/50'
                          : 'border-white/10 opacity-60'
                      } transition-all`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            hasAccess
                              ? 'bg-gradient-to-br from-[#0066FF] to-[#00FF88]'
                              : 'bg-white/5'
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {hasAccess ? (
                          <CheckCircle className="w-6 h-6 text-[#00FF88]" />
                        ) : (
                          <Lock className="w-6 h-6 text-white/40" />
                        )}
                      </div>

                      <h3 className="text-white font-bold text-lg mb-2">{course.name}</h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{course.description}</p>

                      {course.lessons > 0 && (
                        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      )}

                      {hasAccess ? (
                        <button className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FF88]/30 transition-all flex items-center justify-center gap-2">
                          <Play className="w-5 h-5" />
                          Start Learning
                        </button>
                      ) : (
                        <Link
                          to="/"
                          className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          Enroll Now
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/20 rounded-2xl p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <Award className="w-12 h-12 text-[#00FF88] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Continue Your Journey</h3>
                  <p className="text-white/70 mb-4">
                    Keep learning and practicing to master the markets. Our comprehensive programs are designed
                    to take you from beginner to expert.
                  </p>
                  {courses.length < availableCourses.length && (
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-[#00FF88] hover:underline font-semibold"
                    >
                      Explore More Courses
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
