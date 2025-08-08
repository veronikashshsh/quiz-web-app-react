'use client';
 import { useState } from 'react';
import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

   const SignUp = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Redirect to dashboard after successful registration
   
      const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
        if (password.length < 6) {
          setError('Password must be at least 6 characters long.');
          return;
        }

        setError(''); // Reset error state
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(userCredential.user, {
            displayName: name,
          });
          alert('User created successfully');
          //redirect to dasboard 
          navigate(`/dashboard/${name}`);
        }
         catch (err) {
          setError('Error creating user: ' + err.message);
        }
      };

    return (
  <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
  {/* Left side - image, half width on md+ screens */}
  <div className="hidden md:block md:w-1/2">
    <img
      src="/register.jpg" // use correct public path or import accordingly
      alt="Register illustration"
      className="object-cover w-full h-full"
    />
  </div>

  {/* Right side - form, full width on small screens, half on md+ */}
  <div className="w-full md:w-1/2 flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Register your Account
      </h2>

      {/* Your form start */}
      <form onSubmit={handleCreateUser} className="space-y-4">
        {/* Name input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100 transition"
            required
          />
        </div>

        {/* Email input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100 transition"
            required
          />
        </div>

        {/* Password input */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100 transition"
            required
          />
        </div>

        {/* Confirm Password input */}
        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100 transition"
            required
          />
        </div>

        {/* Terms and Conditions checkbox */}
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="mr-2 h-4 w-4 accent-blue-600"
            required
          />
          <label htmlFor="terms" className="text-gray-700 dark:text-gray-300 text-sm">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</div>
);
    };

    export default SignUp;