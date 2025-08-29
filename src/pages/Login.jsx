import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Initialize Firebase only if it hasn't been initialized already
const firebaseConfig = {
  apiKey: "AIzaSyD6WpvH0KpFeF1copaFCuZ7JQjq2MJ0n6U",
  authDomain: "vivid-pulse.firebaseapp.com",
  projectId: "vivid-pulse",
  storageBucket: "vivid-pulse.firebasestorage.app",
  messagingSenderId: "664379763879",
  appId: "1:664379763879:web:3f577b1425142c78847f82",
  measurementId: "G-79G2NSVJ34"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setEmail('');
      setPassword('');
      console.log('User logged in successfully!');
    } catch (err) {
      console.error('Login failed:', err);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email. Please register first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        default:
          setError('Login failed. Please check your network connection and try again.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-2xl border-2 border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-900">Log In</h1>
        <hr className="my-6 border-t-2 border-gray-200" />
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="Email" className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
              id="Email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label htmlFor="Password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
              id="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-2 text-center font-medium">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2 text-center font-medium">Login successful!</p>}
          <div className="text-center">
            <p className="text-sm text-gray-600">Don't have an account? <NavLink to="/register" className="text-gray-800 font-semibold underline hover:text-gray-900">Register here</NavLink></p>
            <button
              type="submit"
              className={`w-full mt-6 px-6 py-3 font-bold text-lg text-white bg-gray-900 rounded-lg shadow-lg transition-colors duration-300 transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;