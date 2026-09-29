import './ChatWindow.css'
import Chat from './Chat.jsx'
import Navbar from './Navbar.jsx'
import Action from './Action.jsx';
import AiModel from './AiModel.jsx';
import { Context } from './Context.jsx';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ArrowUp } from "lucide-react";

export default function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, setPrevChats, currThreadId,setNewChat, setLoading, currModel, setError, logout, open, setOpen, currModelBehave, setCurrModelBehave} = useContext(Context);
    const modelLists = ["Informative", "Funny", "Sarcastic", "Friendly", "Creative"];
    const menuRef = useRef(null);

    const getReply = async() => {
        if (!prompt) return;
        setError("")
        setLoading(true);
        setNewChat(false);
        try {
            const res =await axios.post(
                "/chat",
                {
                    threadId: currThreadId,
                    message: prompt,
                    aiModel: currModel,
                    aiModelBehave: currModelBehave
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            if(res.data.error) {
                setReply("Error occured!")
                setError(res.data.error)
            } else {
                setReply(res.data.reply);
            }
            
        }catch(err) {
            console.log(err);
            setError("Something went wrong!")
        }
        setLoading(false);
    }
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, 
                    {
                        role: "user",
                        content: prompt
                    },
                    {
                        role: "assistant",
                        content: reply
                    }
                ]
            ))
        }
        setPrompt("");
    }, [reply]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);
    return (
        <div className='chatWindow w-full relative flex flex-col items-center justify-between'>
            <Navbar/> 
            <div className='w-full mt-2 flex-1 overflow-y-auto scrollable-dark grow min-h-0 px-1 pb-24 sm:pb-4'>
                <Chat></Chat>
            </div>
            <div className="w-full flex justify-center md:p-4 p-1">
                <AiModel/>
                <div className="user-input flex items-center border w-full lg:w-2/3 rounded-xl mb-2">
                    <input type="text" placeholder="Ask anything" className="bg-transparent py-4 mx-4 w-full text-white placeholder-gray-400 focus:outline-none" value={prompt} onChange={(el) => setPrompt(el.target.value)} onKeyDown={(el) => el.key === "Enter"? getReply() : ""}/>
                    <button onClick={getReply} className="px-4 mr-1 py-2 send-btn rounded-lg transition ease-in-out"><ArrowUp size = {25}/></button>
                </div>
            </div>
            {
                logout && <Action></Action>
            }
            {
                open && 
                <ul className="absolute bottom-20 left-4 mx-4 mt-2 w-55 z-10 bg-black text-gray-900 rounded-lg shadow-lg border border-gray-200" ref={menuRef}>
                    <p className='text-lg p-1 text-center !text-gray-400 border border-white/20 !font-sans'>Choose model behaviour</p>
                    {
                        modelLists.map((model, idx) => (<li className={ currModelBehave === model ?'px-4 py-2 rounded active-model-behave cursor-pointer rounded-lg' : 'px-4 py-2 rounded hover:bg-gray-700 cursor-pointer rounded-lg'} key={idx} onClick={() => {
                            setCurrModelBehave(model)
                            setOpen(false)
                        }}>{model}</li>))
                    }
                    <li className='px-4 py-2 rounded hover:bg-gray-700 cursor-pointer rounded-lg' onClick={() => {
                            setCurrModelBehave("")
                            setOpen(false)
                        }}>None</li>
                </ul>
            }
        </div>
    )
}