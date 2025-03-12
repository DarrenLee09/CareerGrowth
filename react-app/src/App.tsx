import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import PageTransition from './components/PageTransition';
import PageSkeleton from './components/PageSkeleton';
import ToastProvider from './components/Toast/ToastContext';
import FadeInSection from './components/FadeInSection';
import './App.css';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Jobs = React.lazy(() => import('./pages/Jobs'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));

function App() {
  const { theme } = useTheme();

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
            <meta name="theme-color" content={theme === 'dark' ? '#1a202c' : '#ffffff'} />
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
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={
                      <PageTransition>
                        <FadeInSection>
                          <Home />
                        </FadeInSection>
                      </PageTransition>
                    } />
                    <Route path="/profile" element={
                      <PageTransition>
                        <FadeInSection>
                          <Profile />
                        </FadeInSection>
                      </PageTransition>
                    } />
                    <Route path="/resume" element={
                      <PageTransition>
                        <FadeInSection>
                          <Resume />
                        </FadeInSection>
                      </PageTransition>
                    } />
                    <Route path="/jobs" element={
                      <PageTransition>
                        <FadeInSection>
                          <Jobs />
                        </FadeInSection>
                      </PageTransition>
                    } />
                    <Route path="/login" element={
                      <PageTransition>
                        <FadeInSection>
                          <Login />
                        </FadeInSection>
                      </PageTransition>
                    } />
                    <Route path="/register" element={
                      <PageTransition>
                        <FadeInSection>
                          <Register />
                        </FadeInSection>
                      </PageTransition>
                    } />
                  </Routes>
                </AnimatePresence>
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
