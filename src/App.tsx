import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import TradingMasteryPage from './pages/TradingMasteryPage';
import CopyTradesPage from './pages/CopyTradesPage';
import IndicatorPage from './pages/IndicatorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <AuthProvider>
      <div className="bg-[#0A1628] min-h-screen">
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <HomePage />
              </>
            }
          />
          <Route
            path="/trading-mastery"
            element={
              <>
                <Navigation />
                <TradingMasteryPage />
              </>
            }
          />
          <Route
            path="/copy-trades"
            element={
              <>
                <Navigation />
                <CopyTradesPage />
              </>
            }
          />
          <Route
            path="/indicator"
            element={
              <>
                <Navigation />
                <IndicatorPage />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
