"use client";

import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BeamsBackground } from "@/components/ui/BeamBg";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaReady, setIsCaptchaReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCaptchaReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return <div className="text-white p-8">Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateUsernameFromEmail = (email: string) => {
    const base = email.split('@')[0];
    const domain = email.split('@')[1];
    const cleanBase = base.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${cleanBase}-${randomSuffix}-${domain.slice(0, 2)}`;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {

      const username = generateUsernameFromEmail(emailAddress);
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (error: any) {
      console.error("Sign-up error:", error);
      const message =
        error.errors?.[0]?.message || "Failed to sign up. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });
      console.log("Verification result:", completeSignup);

      if (completeSignup.status === "complete") {
        await setActive({ session: completeSignup.createdSessionId });
        router.push("/");
      } else {
        setError("Verification failed. Code may be invalid or expired.");
      }
    } catch (error: any) {
      const message =
        error.errors?.[0]?.message || "Failed to verify email. Try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-950 text-white">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative p-12">
          <BeamsBackground
            heading="Verify Your Email"
            subheading={`We've sent a 6-digit code to ${emailAddress}`}
          />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold font-secondary">
                Verify Email
              </h1>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Enter the code sent to your email
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    className="block w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg shadow-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-lg text-center tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                  ) : (
                    <>
                      Verify Email
                      <FiArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPendingVerification(false);
                    setError("");
                  }}
                  className="w-full text-center text-sm text-gray-400 hover:text-gray-200 transition"
                >
                  Back to sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-950">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <BeamsBackground
          heading="Welcome to ConvoAI Studio"
          subheading="Create your account to explore a new dimension of futuristic podcasts!"
        />
      </div>

      <div className="w-full py-20 lg:w-1/2 bg-gray-950 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2 font-secondary">
              Create Account
            </h1>
            <p className="text-gray-400">Fill in your details to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="relative">
              <div id="clerk-captcha"></div>
              {!isCaptchaReady && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center rounded-lg">
                  <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
                  <FiUser className="text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-800 rounded-lg shadow-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-800 rounded-lg shadow-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-lg shadow-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm transition"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-300" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters with a number and symbol
              </p>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-600 rounded bg-gray-800 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-950 text-gray-400">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full py-2 px-4 border border-gray-800 rounded-lg bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition">
                GitHub
              </button>
              <button className="w-full py-2 px-4 border border-gray-800 rounded-lg bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition">
                Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
