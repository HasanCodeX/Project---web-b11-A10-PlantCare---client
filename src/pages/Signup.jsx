import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../context/firebase/firebase.config";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isDark = document.documentElement.classList.contains("dark");
  const swalStyle = {
    background: isDark ? "#18181b" : "#fff",
    color: isDark ? "#4ade80" : "#166534",
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      const msg = "Password must contain uppercase, lowercase, and be at least 6 characters.";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: msg,
        background: swalStyle.background,
        color: swalStyle.color,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        background: swalStyle.background,
        color: swalStyle.color,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({
        icon: "success",
        title: "Signed up with Google!",
        background: swalStyle.background,
        color: swalStyle.color,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Google Signup Failed",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-10
        bg-gradient-to-br from-green-50 via-white to-green-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        transition-colors duration-300"
    >
      {/* Signup Form */}
      <form
        onSubmit={handleSignup}
        className="w-full md:w-1/2 max-w-md bg-white dark:bg-zinc-900 shadow-md dark:shadow-green-800/30 p-10 rounded-3xl space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-green-700 dark:text-emerald-400">
          Register
        </h2>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-5 py-3 border border-green-700 rounded-xl
            dark:bg-zinc-800 dark:border-emerald-400 dark:text-emerald-300
            focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Profile Image URL"
          className="w-full px-5 py-3 border border-green-700 rounded-xl
            dark:bg-zinc-800 dark:border-emerald-400 dark:text-emerald-300
            focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3 border border-green-700 rounded-xl
            dark:bg-zinc-800 dark:border-emerald-400 dark:text-emerald-300
            focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-5 py-3 border border-green-700 rounded-xl
              dark:bg-zinc-800 dark:border-emerald-400 dark:text-emerald-300
              focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-700 dark:text-emerald-400"
            title={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-3xl transition"
        >
          Sign Up
        </button>

        <div className="divider dark:before:bg-emerald-400 dark:after:bg-emerald-400 text-green-700 dark:text-emerald-400">
          OR
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border-2 border-green-700 text-green-700 dark:text-emerald-400
            hover:bg-green-700 hover:text-white rounded-3xl py-3 font-semibold transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-green-700 dark:text-emerald-400 text-sm mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold hover:underline text-green-700 dark:text-emerald-400"
          >
            Login
          </a>
        </p>
      </form>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/678SMLSZ/Sign-up-bro.png" // 👈 Replace with your own image if needed
          alt="Signup illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Signup;
