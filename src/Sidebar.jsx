import { useState, useContext, useEffect, useRef } from "react";
import { Context } from "./Context";
import { ClipLoader } from "react-spinners";
import { v1 as uuidv1 } from "uuid";
import api from "./api";
import "./Sidebar.css";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    setPrevChats,
    setPrompt,
    setReply,
    setNewChat,
    currThreadId,
    setCurrThreadId,
    openSideBar,
    setOpenSideBar,
    setError,
    user,
    setUser,
    setLogout,
  } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [delId, setDelId] = useState("");
  const menuRef = useRef(null);

  const getAllTheads = async () => {
    try {
      const response = await api.get("/allChats", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setAllThreads(response.data.threads);
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    setError("");
  };
  const getChat = async (chatId) => {
    setCurrThreadId(chatId);
    setError("");
    try {
      const response = await api.get(`/chat/${chatId}`);
      const res = response.data;
      if (res.error) {
        setNewChat(true);
        setError(res.error);
      } else {
        setNewChat(false);
        setPrevChats(res.messages);
        setReply(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const delThread = async (chatId) => {
    setLoading(true);
    try {
      setDelId(chatId);
      const res = await api.delete(`/chat/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== chatId),
      );
      if (chatId === currThreadId) {
        createNewChat();
      }
      if (res.error) {
        setError(res.error);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getOpenSideBar = () => {
    setOpenSideBar(!openSideBar);
  };
  const userLogout = () => {
    setLogout(true);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSideBar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    getAllTheads();
  }, [currThreadId]);

  return (
    <section
      className={
        !openSideBar
          ? "sidebar-main hidden md:flex h-full justify-between flex-col"
          : "sidebar-main flex h-full overlay-div justify-between flex-col"
      }
      ref={menuRef}
    >
      <div className="w-full flex justify-between mb-2">
        <button
          className="newChat-btn flex w-full justify-between mt-2 mx-2 hover:bg-gray-700 px-4 py-2 transition duration-300 ease-in-out rounded"
          onClick={createNewChat}
        >
          <span>New chat</span>
          <i className="fa-solid mt-1 fa-pen-to-square text-white"></i>
        </button>
        {openSideBar && (
          <button
            className="flex md:hidden p-2 text-2xl my-1 rounded-lg "
            onClick={getOpenSideBar}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
      <div className="grow mt-4 overflow-y-auto scrollable-dark">
        {allThreads && allThreads.length > 0 && (
          <ul className="thread-container">
            {allThreads.map((thread, idx) => (
              <li
                onClick={() => getChat(thread.threadId)}
                className={
                  currThreadId === thread.threadId
                    ? "active-thread thread flex justify-between border-white mb-1"
                    : "thread flex justify-between mb-1 border-white"
                }
                key={idx}
              >
                {thread.title.split(" ").slice(0, 3).join(" ")}
                <button
                  className="p-0.5 del-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    delThread(thread.threadId);
                  }}
                >
                  {loading && thread.threadId === delId ? (
                    <div className="flex items-center justify-center">
                      <ClipLoader loading={loading} color="#ffffff" size={24} />
                    </div>
                  ) : (
                    <i className="fa-solid del-icon fa-trash"></i>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex m-1 mt-2 mb-1 p-2 justify-between rounded-lg user-div items-center">
        <i className="fa-solid text-2xl fa-circle-user mr-1"></i>
        {user && <p className="grow text-sm">{user.username}</p>}
        <div className="p-1 logout-icon" onClick={userLogout}>
          <i className="fa-solid text-center fa-right-from-bracket"></i>
        </div>
      </div>
    </section>
  );
}
