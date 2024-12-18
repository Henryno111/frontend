import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected, handleConnect, handleDisconnect } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/actions', label: 'Admin Actions' },
    { path: '/users', label: 'User Management' }
  ];

  const handleConnectClick = () => {
    if (isConnected) {
      handleDisconnect();
    } else {
      handleConnect();
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Container */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-2">
              <img
                className="h-8 w-auto sm:h-10 md:h-12 transition-all duration-300"
                src="/StacksAdmin.jpg"
                alt="StacksAdmin"
              />
              {/* Show text logo on larger screens */}
              <span className="hidden sm:block text-white font-bold text-lg md:text-xl lg:text-2xl">
                StacksAdmin
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative group 
                  ${isActive(item.path)
                    ? 'text-white'
                    : 'text-gray-200 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Animated background */}
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-white/10 backdrop-blur-sm'
                      : 'bg-transparent group-hover:bg-white/5'
                  }`}
                />
                {/* Animated underline */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 
                    ${isActive(item.path)
                      ? 'w-full bg-gradient-to-r from-pink-500 to-violet-500'
                      : 'w-0 group-hover:w-full bg-gradient-to-r from-pink-400 to-violet-400'
                    }`}
                />
              </button>
            ))}

            {/* Connect Wallet Button */}
            <button
              onClick={handleConnectClick}
              className={`
                px-6 py-2 rounded-lg font-medium
                transition-all duration-300
                transform hover:scale-105
                flex items-center gap-2
                ${isConnected
                  ? 'bg-green-400/20 text-green-300 border border-green-400/30 hover:bg-green-400/30'
                  : 'bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600'
                }
                backdrop-blur-sm shadow-lg hover:shadow-xl
              `}
            >
              <Wallet className="w-4 h-4" />
              <span className="whitespace-nowrap">
                {isConnected ? 'Connected' : 'Connect Wallet'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 border-t border-white/10' 
            : 'max-h-0 opacity-0'
        } overflow-hidden bg-gradient-to-b from-purple-900/95 to-violet-900/95 backdrop-blur-lg`}
      >
        <div className="px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 
                ${isActive(item.path)
                  ? 'bg-white/10 text-white'
                  : 'text-gray-200 hover:bg-white/5 hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleConnectClick}
            className={`
              w-full px-4 py-3 rounded-lg
              transition-all duration-200
              flex items-center gap-2
              ${isConnected
                ? 'bg-green-400/20 text-green-300'
                : 'bg-gradient-to-r from-pink-500 to-violet-500 text-white'
              }
            `}
          >
            <Wallet className="w-4 h-4" />
            <span>{isConnected ? 'Connected' : 'Connect Wallet'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;