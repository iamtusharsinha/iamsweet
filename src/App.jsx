import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Intake from './pages/Intake';
import Plan from './pages/Plan';
import Browse from './pages/Browse';
import Resources from './pages/Resources';
import Meals from './pages/Meals';
import Videos from './pages/Videos';
import DiabetesChat from './pages/DiabetesChat';
import OpenSource from './pages/OpenSource';
import CareCompanion from './pages/CareCompanion';
import HSAStore from './pages/HSAStore';
import Telehealth from './pages/Telehealth';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intake" element={<Intake />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/chat" element={<DiabetesChat />} />
      <Route path="/opensource" element={<OpenSource />} />
      <Route path="/care" element={<CareCompanion />} />
      <Route path="/store" element={<HSAStore />} />
      <Route path="/telehealth" element={<Telehealth />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App