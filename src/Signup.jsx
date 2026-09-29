import { useContext, useState } from "react";
import axios from 'axios'
import { Context } from "./Context";
import { useNavigate, Link } from "react-router-dom";
import { DotLoader } from 'react-spinners'
import "./Signup.css"

export default function Signup() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [username, setUsername] =  useState("");
    const [password, setPassword] =  useState("");
    const { setUser, setNewChat, setPrompt, setReply }= useContext(Context);
    const [ userError, setUserError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const user = await axios.post("/signup", {email, username, password});
            localStorage.setItem("token", user.data.token)
            localStorage.setItem("user", JSON.stringify(user.data.user))
            setUser(user.data.user);
            setLoading(false)
            setNewChat(true);
            setPrompt("");
            setReply(null);
            navigate("/");
        }catch(err) {
            setUserError(err.response.data.error);
            setLoading(false)
            navigate("/signup");
        }
        
    }
    return (
        <div className="flex flex-col w-full min-h-screen justify-center items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 signup-page">
            <div className="flex flex-col w-full max-w-md bg-white/80  border border-gray-200 p-8 rounded-2xl shadow-2xl signup-bg">
    
                <h2 className="title font-bold text-lg text-center mb-5 text-gray-800">Get Started With Info Agent</h2>
                <p className="text-center text-xl mb-2">Signup</p>
                {userError && (
                    <p className="text-center !text-red-500 font-medium mb-3">{userError}</p>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(event) => setEmail(event.target.value)}
                        className="p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition duration-200 outline-none"
                        required
                    />
      
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(event) => setUsername(event.target.value)}
                        className="p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition duration-200 outline-none"
                        required
                    />
      
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition duration-200 outline-none"
                        required
                    />
      
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center"
                    >
                        {loading ? 
                            <DotLoader loading={loading} color="#ffffff" size={26} />
                            : 
                            "Signup"
                        }
                    </button>
                </form>
                <p className="text-center  mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 !text-blue-400 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
