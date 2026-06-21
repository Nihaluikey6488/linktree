import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const {
    requestHandleLoginSubmit,
    register,
    handleSubmit,
    errors,
    navigate,
  } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form
          onSubmit={handleSubmit(requestHandleLoginSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;