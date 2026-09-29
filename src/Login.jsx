import { useContext, useState } from "react";
import api from "./api";
import { Context } from "./Context";
import { useNavigate, Link } from "react-router-dom";
import { DotLoader } from "react-spinners";
import "./Login.css";
export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setNewChat, setPrompt, setReply } = useContext(Context);
  const [userError, setUserError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await api.post("/login", { email, password });
      console.log(user.data);
      localStorage.setItem("token", user.data.token);
      setUser(user.data.user);
      setLoading(false);
      setNewChat(true);
      setPrompt("");
      setReply(null);
      navigate("/chat");
    } catch (err) {
      setUserError(err.response.data.error);
      setLoading(false);
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 login-page">
      <div className="flex flex-col w-full max-w-md login-bg border border-gray-200 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-center title mb-2">Info Agent</h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome back! Please login to continue
        </p>

        {userError && (
          <p className="text-center !text-red-500 font-medium mb-3">
            {userError}
          </p>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            required
            className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition duration-200 outline-none"
          />

          <input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition duration-200 outline-none"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <DotLoader loading={loading} color="#ffffff" size={26} />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center  mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 !text-blue-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
