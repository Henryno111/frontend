// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AdminActions from './pages/AdminActions';
import UserManagement from './pages/UserManagement';
import Footer from './components/Footer';
import { Connect } from '@stacks/connect-react';
// import { APP_NAME, APP_ICON } from './config/constants';
import { UserSession, AppConfig } from '@stacks/connect';
import { StacksAuthProvider } from './context/StackAuthContext';
// import { useStacksAuth } from './context/StackAuthContext';
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

function App() {
  return (
    <StacksAuthProvider>
    <Connect
      authOptions={{
        appDetails: {
          name: 'Stacks Admin',
          icon: '/StacksAdmin.jpg',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >

    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/actions" element={<AdminActions />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </Connect>
    </StacksAuthProvider>

  );
}

export default App;