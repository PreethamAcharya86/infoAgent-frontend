import './Navbar.css'
import { Context } from './Context';
import { useState, useContext, useEffect, useRef } from "react";

export default function Navbar() {
    const { openSideBar, setOpenSideBar, currModel, setCurrModel, error } = useContext(Context);
    const [open, setOpen] = useState(false);
    const models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.1-8b-instant", "groq/compound-mini"]
    const menuRef = useRef(null);

    const getModel = (e) => {
        const modelName = e.target.getAttribute("name");
        setCurrModel(modelName);
    }

  // Close dropdown when clicking outside
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
        <>
        <div className='navbar w-full flex justify-between'>
            <div className='grow flex'>
                {
                    !openSideBar &&
                    <button className='flex md:hidden p-2 rounded-lg m-1 hover:bg-[#212121]' onClick={() => setOpenSideBar(!openSideBar)}>
                        <i className="fa-solid text-2xl fa-bars self-center"></i>
                    </button>
                }
                <h1 className='title !text-lg my-auto md:!text-3xl ml-2'>Info Agent</h1>
            </div>
            
            <div className="models relative text-center" ref={menuRef}>
                <button 
                    onClick={() => setOpen((prev) => !prev)}
                    className="model flex text-start justify-between p-2 gap-2 my-1 mr-1 rounded-lg hover:bg-[#212121] transition">
                        {currModel}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                </button>
                {open && (
                    <ul className="absolute right-0 mx-4 mt-2 w-48 z-10 bg-black text-gray-900 rounded-lg shadow-lg border border-gray-200">
                        {
                            models.map((model, idx) => (
                                currModel !== model && 
                                <li className="px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer" name= {model} onClick={getModel} key={idx}>{model}</li>
                            ))
                        }
                    </ul>
                )}
            </div>
        </div>
        {
            error && 
            <div className='bg-black w-full h-10 rounded-lg border border-red-500 flex items-center justify-center'>
                <p className='!text-red-500'>{error}</p>
            </div>
        }
        </>
    )
}