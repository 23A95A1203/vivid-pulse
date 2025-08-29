import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// The Firebase configuration is now hardcoded to a public, functional project.
// This ensures the application can run without a valid API key from the environment.
const firebaseConfig = {
  apiKey: "AIzaSyD6WpvH0KpFeF1copaFCuZ7JQjq2MJ0n6U",
  authDomain: "vivid-pulse.firebaseapp.com",
  projectId: "vivid-pulse",
  storageBucket: "vivid-pulse.firebasestorage.app",
  messagingSenderId: "664379763879",
  appId: "1:664379763879:web:3f577b1425142c78847f82",
  measurementId: "G-79G2NSVJ34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Authenticate user anonymously to access Firestore
  const authenticateUser = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.error("Anonymous authentication failed:", err);
      // Handle the error without crashing the app
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await authenticateUser();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        fullName: name,
        email: email,
        createdAt: new Date(),
      });

      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      console.log('User registered and data saved to Firestore.');
    } catch (err) {
      console.error('Registration failed:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please try logging in or use a different email.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please use at least 6 characters.');
          break;
        default:
          setError('Registration failed. Please check your network connection and try again.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-2 border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">Register</h1>
        <hr className="my-4 border-t-2 border-gray-200" />
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="form-group space-y-2">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              id="Name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group space-y-2">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              id="Email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group space-y-2">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              id="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">Registration successful!</p>}
          <div className="text-center">
            <p className="text-sm text-gray-600">Already have an account? <NavLink to="/login" className="text-gray-800 underline hover:text-gray-900">Login</NavLink></p>
            <button
              type="submit"
              className={`w-full mt-4 px-4 py-2 font-semibold text-white bg-gray-800 rounded-md shadow-sm transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;