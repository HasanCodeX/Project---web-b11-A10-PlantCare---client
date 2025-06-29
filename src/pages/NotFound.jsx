

import { Link } from "react-router-dom";
import Switch from "../Components/DarkModeSidebar";

const NotFound = () => {
  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-12
      bg-gradient-to-br from-green-50 via-white to-green-100
      dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
      transition-colors duration-300"
    >
      {/* Left Text */}
      <div className="w-full md:w-1/2 max-w-md text-center md:text-left space-y-6">
        <h1 className="text-7xl font-extrabold text-green-700 dark:text-emerald-400">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-green-900 dark:text-emerald-300">
          Oops! Page not found.
        </h2>
        <p className="text-green-800 dark:text-emerald-300 leading-relaxed">
          The page you’re looking for doesn’t exist, is growing elsewhere, or might have been pruned.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-3xl bg-green-700 hover:bg-green-800 text-white font-semibold
          dark:bg-emerald-500 dark:hover:bg-emerald-600 transition"
        >
          Go Back Home
        </Link>

        <div className="mt-4">
          <Switch />
        </div>
      </div>

      {/* Right Illustration */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/C3jBhrv7/404-Error-bro.png"
          alt="404 Illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default NotFound;
