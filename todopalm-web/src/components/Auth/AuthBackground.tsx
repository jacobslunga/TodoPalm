"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { Eye, EyeOff } from "react-feather";

interface AuthBackgroundProps {}

const AuthModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const isValidSignup = () => {
    return (
      isValidEmail(email) &&
      isValidPassword(password) &&
      password === confirmedPassword &&
      name.length > 0
    );
  };

  const isValidLogin = () => {
    return isValidEmail(email) && isValidPassword(password);
  };

  const handleSignin = () => {
    signIn("credentials", {
      email,
      password,
      name,
      callbackUrl: "/categories",
    });
  };

  const handleGoogleSignin = () => {
    signIn("google", {
      callbackUrl: "/categories",
    });
  };

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom backdrop-blur-sm transition-all duration-200 sm:modal-middle rounded-lg shadow-lg"
      open
    >
      <div className="modal-box transition-all duration-200 bg-white dark:bg-[#1B1C1D] border dark:border-[rgba(255,255,255,0.1)]">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-4">
          Welcome to TodoPalm 🌴
        </h2>
        <p className="text-[rgba(0,0,0,0.5)] mb-6 dark:text-[rgba(255,255,255,0.5)]">
          TodoPalm is a simple todo app that helps you keep track of your tasks
          and get things done.
        </p>

        <div className="space-y-4">
          {!showLogin && (
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-xs font-medium text-black dark:text-white mb-1"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border text-sm dark:border-[rgba(255,255,255,0.1)] bg-gray-50 outline-none rounded-lg dark:bg-dark_bg dark:text-white"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-xs font-medium text-black dark:text-white mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border text-sm dark:border-[rgba(255,255,255,0.1)] bg-gray-50 outline-none rounded-lg dark:bg-dark_bg dark:text-white"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-xs font-medium text-black dark:text-white mb-1"
            >
              Password
            </label>
            <div className="p-2 border flex flex-row items-center justify-between dark:border-[rgba(255,255,255,0.1)] bg-gray-50 rounded-lg dark:bg-dark_bg dark:text-white">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm bg-transparent outline-none w-full"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs outline-none"
              >
                {showPassword ? (
                  <Eye className="text-black dark:text-white" size={20} />
                ) : (
                  <EyeOff
                    className="text-gray-400 dark:text-gray-500"
                    size={20}
                  />
                )}
              </button>
            </div>
          </div>

          {!showLogin && (
            <div className="flex flex-col">
              <label
                htmlFor="confirmedPassword"
                className="text-xs font-medium text-black dark:text-white mb-1"
              >
                Confirm Password
              </label>
              <div className="p-2 border flex flex-row items-center justify-between dark:border-[rgba(255,255,255,0.1)] bg-gray-50 rounded-lg dark:bg-dark_bg dark:text-white">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmedPassword"
                  placeholder="Confirm Password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  className="text-sm bg-transparent outline-none w-full"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs outline-none"
                >
                  {showPassword ? (
                    <Eye className="text-black dark:text-white" size={20} />
                  ) : (
                    <EyeOff
                      className="text-gray-400 dark:text-gray-500"
                      size={20}
                    />
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="flex w-full flex-col items-center justify-center mt-4">
            {showLogin ? (
              <button
                disabled={!isValidLogin()}
                onClick={handleSignin}
                className="bg-primary border dark:border-[rgba(255,255,255,0.1)] cursor-pointer disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[rgba(0,0,0,0.2)] disabled:dark:text-[rgba(255,255,255,0.2)] w-full hover:opacity-80 transition-opacity duration-200 text-white font-medium py-2 px-4 rounded-full"
              >
                Login
              </button>
            ) : (
              <button
                disabled={!isValidSignup()}
                onClick={handleSignin}
                className="bg-primary border dark:border-[rgba(255,255,255,0.1)] cursor-pointer disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[rgba(0,0,0,0.2)] disabled:dark:text-[rgba(255,255,255,0.2)] w-full hover:opacity-80 transition-opacity duration-200 text-white font-medium py-2 px-4 rounded-full"
              >
                Register
              </button>
            )}

            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex border items-center w-full justify-center mt-5 text-black font-medium text-sm bg-white p-2 rounded-full hover:opacity-60 transition-opacity duration-200"
            >
              <img
                src="/icons8-google-480.png"
                alt="Google Icon"
                className="h-6 w-6 mr-2"
              />
              Sign in with Google
            </button>

            {showLogin ? (
              <button
                type="button"
                onClick={() => {
                  setConfirmedPassword("");
                  setName("");
                  setEmail("");
                  setPassword("");
                  setShowLogin(false);
                }}
                className="text-xs font-normal hover:underline text-black dark:text-white mt-2"
              >
                Don't have an account? Register
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setConfirmedPassword("");
                  setName("");
                  setEmail("");
                  setPassword("");
                  setShowLogin(true);
                }}
                className="text-xs font-normal hover:underline text-black dark:text-white mt-2"
              >
                Already have an account? Login
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

const AuthBackground: FC<AuthBackgroundProps> = ({}) => {
  return (
    <div className="flex flex-row bg-gradient-radial bg-[rgba(247,248,243,0.4)] dark:bg-[rgba(19,20,21,0.7)] items-center justify-center z-50 w-full h-full fixed top-0 left-0">
      <AuthModal />
    </div>
  );
};

export default AuthBackground;
