import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import PageTransition from './components/PageTransition';
import PageSkeleton from './components/PageSkeleton';
import ToastProvider from './components/Toast/ToastContext';
import './App.css';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Jobs = React.lazy(() => import('./pages/Jobs'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

// Wrap routes with AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/profile" element={
          <PageTransition>
            <Profile />
          </PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition>
            <Resume />
          </PageTransition>
        } />
        <Route path="/jobs" element={
          <PageTransition>
            <Jobs />
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <Login />
          </PageTransition>
        } />
        <Route path="/register" element={
          <PageTransition>
            <Register />
          </PageTransition>
        } />
        <Route path="/privacy-policy" element={
          <PageTransition>
            <PrivacyPolicy />
          </PageTransition>
        } />
        <Route path="/terms-of-service" element={
          <PageTransition>
            <TermsOfService />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const { theme } = useTheme();

  // Force light theme for now to avoid dark mode issues
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, []);

  return (
    <ToastProvider>
      <Router>
        <div className={`App ${theme}`}>
          <Helmet>
            <title>CareerBoost - AI-Powered Career Development for Students</title>
            <meta name="description" content="CareerBoost helps students improve their resumes with AI assistance and matches them with relevant job opportunities." />
            <meta name="keywords" content="student jobs, resume builder, AI resume, career development, job matching" />
            <meta property="og:title" content="CareerBoost - AI-Powered Career Development for Students" />
            <meta property="og:description" content="CareerBoost helps students improve their resumes with AI assistance and matches them with relevant job opportunities." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://careerboost.com" />
            <meta property="og:image" content="https://careerboost.com/og-image.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="CareerBoost - AI-Powered Career Development for Students" />
            <meta name="twitter:description" content="CareerBoost helps students improve their resumes with AI assistance and matches them with relevant job opportunities." />
            <meta name="twitter:image" content="https://careerboost.com/twitter-image.jpg" />
            <link rel="canonical" href="https://careerboost.com" />
            <meta name="theme-color" content="#ffffff" />
          </Helmet>

          <a href="#main-content" className="skip-to-main-content">
            Skip to main content
          </a>

          <ErrorBoundary>
            <header>
              <Navbar />
            </header>
          </ErrorBoundary>

          <main id="main-content" tabIndex={-1}>
            <ErrorBoundary>
              <Suspense fallback={<PageSkeleton />}>
                <AnimatedRoutes />
              </Suspense>
            </ErrorBoundary>
          </main>

          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
