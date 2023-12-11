import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', data);
      if (res.status !== 200) {
        throw new Error('Login failed');
      }
      const resData = res.data;
      setLoading(false);
      localStorage.setItem('token', resData.token);
      localStorage.setItem('user', JSON.stringify(resData.user));
      onClose();
      // window.location.reload();
      navigate('/marketplace');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto ">
      <div className="w-full ">
        <div className="p-2">
          <div className="flex flex-col items-center justify-center w-full gap-y-2">
            <h1 className="flex items-center gap-2 pb-2 text-3xl font-semibold text-gray-800 ">
              🎓
              <span>College Street</span>
            </h1>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-left text-gray-800 ">
            Welcome to College Street! 👋🏻
          </h2>
          <p className="w-full mb-8 text-sm text-gray-500 dark:text-gray-400">
            Please sign-in to your account and start the adventure
          </p>
          <form className="space-y-8">
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
                autoComplete="username"
                className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#9155FD]"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                {' '}
                Password{' '}
              </label>

              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-[#9155FD]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 z-10 grid w-10 text-gray-500 end-0 place-content-center"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
              {error && (
                <div className="text-red-500">{error}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !data.email || !data.password}
              onClick={(e) => handleSubmit(e)}
              className="bg-[#9155FD] w-full p-2 rounded-xl hover:shadow-lg hover:bg-[#7e3af2] transition duration-300 "
            >
              {loading ? (
                <span className="relative flex items-center justify-center text-base font-semibold text-white ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </span>
              ) : (
                <span className="relative text-base font-semibold text-white ">
                  Login
                </span>
              )}
            </button>
            <div className="w-full pt-2 border-t border-black ">
              <button
                className="justify-end float-right pb-4 -mr-2"
                type="reset"
                onClick={() => {
                  // TODO: navigate to forgot password page
                }}
              >
                <span className="text-sm text-primary hover:text-[#9155FD]">
                  Forgot password ?
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
