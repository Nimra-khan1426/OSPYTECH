"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { auth } from "@/lib/firebase";

// Only 3 social login logos from CDN
const SOCIAL_LOGOS = {
  google: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  facebook: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
};

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ''
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    setIsLogin(tab !== 'signup');
  }, [searchParams]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  const handleTabChange = (tab) => {
    setIsLogin(tab === 'login');
    setShowForgotPassword(false);
    router.replace(`/auth?tab=${tab}`);
  };

  // Input handlers
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({ email: e.target.value });
  };

  // Validation functions
  const validateLogin = () => {
    if (!loginData.email.trim()) { showNotification('Email is required', 'error'); return false; }
    if (!loginData.password) { showNotification('Password is required', 'error'); return false; }
    return true;
  };

  const validateSignup = () => {
    if (!signupData.fullName.trim()) { showNotification('Full name is required', 'error'); return false; }
    if (!signupData.email.trim()) { showNotification('Email is required', 'error'); return false; }
    if (!signupData.password) { showNotification('Password is required', 'error'); return false; }
    if (signupData.password.length < 6) { showNotification('Password must be at least 6 characters', 'error'); return false; }
    if (signupData.password !== signupData.confirmPassword) { showNotification('Passwords do not match', 'error'); return false; }
    if (!signupData.acceptTerms) { showNotification('Please accept terms and conditions', 'error'); return false; }
    return true;
  };

  // Firebase Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;

      showNotification('Login successful!');
      localStorage.setItem('authToken', await user.getIdToken());
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName }));

      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (error) {
      console.error(error);
      showNotification(error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Firebase Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
const user = userCredential.user;

// Optionally update displayName
await updateProfile(user, { displayName: signupData.fullName });

      showNotification('Account created successfully!');
      localStorage.setItem('authToken', await user.getIdToken());
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email, name: signupData.fullName }));

      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (error) {
      console.error(error);
      showNotification(error.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Firebase Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordData.email) { showNotification('Email is required', 'error'); return; }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotPasswordData.email);
      showNotification('Password reset link sent to your email!');
      setShowForgotPassword(false);
    } catch (error) {
      console.error(error);
      showNotification(error.message || 'Failed to send reset link', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Social logins
  const handleSocialLogin = async (provider) => {
    if (provider === 'google') {
      const googleProvider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        showNotification('Google login successful!');
        localStorage.setItem('authToken', await user.getIdToken());
        localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email, name: user.displayName }));

        setTimeout(() => router.push('/dashboard'), 1000);
      } catch (error) {
        console.error(error);
        showNotification(error.message || 'Google login failed', 'error');
      }
    } else {
      // GitHub / Facebook remain demo
      showNotification(`Redirecting to ${provider} login...`);
      localStorage.setItem('authToken', `${provider}-token-789`);
      localStorage.setItem('user', JSON.stringify({ id: '3', name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`, email: `user@${provider}.com`, role: 'user' }));
      setTimeout(() => router.push('/dashboard'), 1000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', paddingTop: '80px', background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)' }}>
      {/* Custom Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '12px 20px',
          borderRadius: '8px',
          background: notification.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'slideIn 0.3s ease-out',
          maxWidth: '350px'
        }}>
          {notification.message}
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            style={{
              marginLeft: '15px',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
          <style jsx>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
      
      {/* Main Container - SMALLER CARD WITH HALF-CIRCLE INSIDE */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(5, 150, 104, 0.18)',
        height: 'auto',
        marginTop: '-70px',
        padding: '20px',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Half-Circle Animation INSIDE THE CARD */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: '#cfe8cf9b',
          transition: 'all 1s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 1,
          pointerEvents: 'none',
          ...(isLogin 
            ? { top: '55%', right: '-35%' }
            : { top: '-40%', right: '55%' }
          )
        }} />
        
        {/* Forms Section Only */}
        <div style={{ 
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 2,
          transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isLogin ? 'translateX(-110px)' : 'translateX(110px)',
          willChange: 'transform'
        }}>
          
          {showForgotPassword ? (
            // Forgot Password Form
            <div style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{ maxWidth: '280px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ 
                  fontSize: '22px',
                  fontWeight: 'bold', 
                  color: '#111827',
                  marginBottom: '6px'
                }}>
                  Reset Password
                </h2>
                <p style={{ 
                  color: '#6b7280',
                  marginBottom: '20px',
                  fontSize: '13px'
                }}>
                  Enter your email to receive a reset link
                </p>
                
                <form onSubmit={handleForgotPassword}>
                  <div style={{ marginBottom: '14px' }}>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter your email"
                      value={forgotPasswordData.email}
                      onChange={handleForgotPasswordChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#f9fafb',
                        border: '1px solid #d1d5db',
                        borderRadius: '10px',
                        fontSize: '13px',
                        color: '#111827',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: loading ? '#0a0b0b' : '#090909',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      marginBottom: '16px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => !loading && (e.target.style.background = '#000000')}
                    onMouseLeave={(e) => !loading && (e.target.style.background = '#000000')}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
                
                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => setShowForgotPassword(false)}
                    style={{ 
                      color: '#016712', 
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginTop: '8px'
                    }}
                  >
                    ← Back to Login
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Login/Signup Forms WITH 3 SMALL SOCIAL LOGOS
            <div style={{ 
              display: 'flex',
              width: '200%',
              height: '100%',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isLogin ? 'translateX(0)' : 'translateX(-50%)'
            }}>
              
              {/* Login Form WITH 3 SMALL LOGOS */}
              <div style={{ 
                width: '50%',
                paddingRight: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{ maxWidth: '280px', margin: '0 auto', width: '100%' }}>
                  <h2 style={{ 
                    fontSize: '22px',
                    fontWeight: 'bold', 
                    color: '#111827',
                    marginBottom: '6px'
                  }}>
                    Welcome Back!
                  </h2>
                  <p style={{ 
                    color: '#6b7280',
                    marginBottom: '20px',
                    fontSize: '13px'
                  }}>
                    Login to your account
                  </p>
                  
                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '14px' }}>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: '#f9fafb',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          marginBottom: '14px',
                          fontSize: '13px',
                          color: '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: '#f9fafb',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          fontSize: '13px',
                          color: '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      fontSize: '12px'
                    }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>
                        <input 
                          type="checkbox" 
                          name="rememberMe"
                          checked={loginData.rememberMe}
                          onChange={handleLoginChange}
                          style={{ 
                            marginRight: '6px',
                            width: '14px',
                            height: '14px'
                          }} 
                        />
                        Remember me
                      </label>
                      <button 
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        style={{ 
                          color: '#016712', 
                          fontWeight: '500',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: loading ? '#070707' : '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginBottom: '16px',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => !loading && (e.target.style.background = '#000000')}
                      onMouseLeave={(e) => !loading && (e.target.style.background = '#000000')}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                  
                  {/* 3 SMALL SOCIAL LOGIN LOGOS */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      textAlign: 'center',
                      marginBottom: '12px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      Or continue with
                    </div>
                    
                    {/* 3 Small Social Login Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      gap: '10px',
                      marginBottom: '12px'
                    }}>
                      {/* Google - SMALL */}
                      <button 
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        style={{
                          width: '36px',
                          height: '36px',
                          padding: '0',
                          background: '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#4285F4';
                          e.target.style.boxShadow = '0 2px 6px rgba(66, 133, 244, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <img 
                          src={SOCIAL_LOGOS.google} 
                          alt="Google" 
                          style={{ 
                            width: '18px', 
                            height: '18px'
                          }} 
                        />
                      </button>
                      
                      {/* Facebook - SMALL */}
                      <button 
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        style={{
                          width: '36px',
                          height: '36px',
                          padding: '0',
                          background: '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#1877F2';
                          e.target.style.boxShadow = '0 2px 6px rgba(24, 119, 242, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <img 
                          src={SOCIAL_LOGOS.facebook} 
                          alt="Facebook" 
                          style={{ 
                            width: '18px', 
                            height: '18px'
                          }} 
                        />
                      </button>
                      
                      {/* GitHub - SMALL */}
                      <button 
                        type="button"
                        onClick={() => handleSocialLogin('github')}
                        style={{
                          width: '36px',
                          height: '36px',
                          padding: '0',
                          background: '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#333333';
                          e.target.style.boxShadow = '0 2px 6px rgba(51, 51, 51, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <img 
                          src={SOCIAL_LOGOS.github} 
                          alt="GitHub" 
                          style={{ 
                            width: '18px', 
                            height: '18px'
                          }} 
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>
                      Don't have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => handleTabChange('signup')}
                        style={{ 
                          color: '#016712', 
                          fontWeight: '600',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Sign up here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Signup Form */}
              <div style={{ 
                width: '50%',
                paddingLeft: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{ maxWidth: '280px', margin: '0 auto', width: '100%' }}>
                  <h2 style={{ 
                    fontSize: '22px',
                    fontWeight: 'bold', 
                    color: '#111827',
                    marginBottom: '6px'
                  }}>
                    Join OspyTech
                  </h2>
                  <p style={{ 
                    color: '#6b7280',
                    marginBottom: '20px',
                    fontSize: '13px'
                  }}>
                    Create your account
                  </p>
                  
                  <form onSubmit={handleSignup}>
                    <div style={{ marginBottom: '14px' }}>
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="Full name"
                        value={signupData.fullName}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: '#f9fafb',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          marginBottom: '14px',
                          fontSize: '13px',
                          color: '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: '#f9fafb',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          marginBottom: '14px',
                          fontSize: '13px',
                          color: '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Create password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: '#f9fafb',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          marginBottom: '14px',
                          fontSize: '13px',
                          color: '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: '#f9fafb',
                          border: '1px solid #d1d5db',
                          borderRadius: '10px',
                          fontSize: '13px',
                          color: '#111827',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '16px',
                      fontSize: '11px'
                    }}>
                      <input 
                        type="checkbox" 
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={signupData.acceptTerms}
                        onChange={handleSignupChange}
                        style={{ 
                          marginRight: '6px',
                          width: '12px',
                          height: '12px',
                          marginTop: '2px'
                        }} 
                      />
                      <label htmlFor="acceptTerms" style={{ color: '#4b5563' }}>
                        I agree to the <a href="#" style={{ color: '#016712' }}>Terms</a> and <a href="#" style={{ color: '#016712' }}>Privacy Policy</a>
                      </label>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: loading ? '#000000' : '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginBottom: '16px',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => !loading && (e.target.style.background = '#000000')}
                      onMouseLeave={(e) => !loading && (e.target.style.background = '#000000')}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>
                  
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>
                      Already have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => handleTabChange('login')}
                        style={{ 
                          color: '#016712', 
                          fontWeight: '600',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Form Toggle Dots (Hide for forgot password) */}
          {!showForgotPassword && (
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              zIndex: 3
            }}>
              <button
                onClick={() => handleTabChange('login')}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: isLogin ? '#016712' : '#d1d5db',
                  transition: 'all 0.3s'
                }}
              />
              <button
                onClick={() => handleTabChange('signup')}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: !isLogin ? '#060606' : '#000000',
                  transition: 'all 0.3s'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}