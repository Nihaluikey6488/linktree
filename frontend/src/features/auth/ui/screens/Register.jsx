import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    requestHandleRegisterSubmit,
    navigate,
  } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register to get started
        </p>

        <form
          onSubmit={handleSubmit(requestHandleRegisterSubmit)}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "Please accept Terms & Conditions",
                })}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                I agree to the Terms & Conditions
              </span>
            </label>

            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.terms.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;