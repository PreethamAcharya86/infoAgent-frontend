import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import Login from "./Login";
import Signup from "./Signup";
import LandingPage from "./LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import { Context } from "./Context";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allThreads, setAllThreads] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [currModel, setCurrModel] = useState("openai/gpt-oss-20b");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [logout, setLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const [currModelBehave, setCurrModelBehave] = useState("");

  // Passing values
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
    loading,
    setLoading,
    allThreads,
    setAllThreads,
    openSideBar,
    setOpenSideBar,
    currModel,
    setCurrModel,
    user,
    setUser,
    error,
    setError,
    logout,
    setLogout,
    open,
    setOpen,
    currModelBehave,
    setCurrModelBehave,
  };

  return (
    <div className="main min-h-[100svh]">
      <BrowserRouter>
        <Context.Provider value={providerValues}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <ChatWindow />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
