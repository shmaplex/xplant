"use client";

import { FiLogIn } from "react-icons/fi";

export default function NotLoggedIn() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-future-lime/20">
            <FiLogIn className="text-future-lime text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Not Logged In
          </h2>
          <p className="mt-2 text-spore-grey dark:text-gray-400">
            Please log in to view your profile and access your account.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-future-lime to-lime-400 text-black rounded-xl font-semibold hover:brightness-110 transition-all shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
