import './Chat.css'
import { Context } from './Context.jsx';
import { useContext, useState, useRef, useEffect } from 'react';
import { HashLoader } from 'react-spinners'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from "remark-gfm";
import 'highlight.js/styles/github-dark.css';

export default function Chat() {
    const {newChat, prevChats, reply, user, loading, currModelBehave} = useContext(Context);
    const [latestReply, setlatestReply] = useState(null);
    const [isHovered, setIsHovered] = useState(null); // state for hover
    const [copiedId, setCopiedId] = useState(null)
    const messagesEndRef = useRef(null);

    const handleCopy= (message, idx) => {
        navigator.clipboard.writeText(message);
        setCopiedId(idx);
        setTimeout(() => {
            setCopiedId(null)
        }, 2000)
  }
    

    useEffect(() => {
        if(reply === null) {
            setlatestReply(null);
            return
        }
        if(!prevChats?.length) return ;
        const content = reply.split(" ");
        let idx = 0;
        const interval = setInterval(() => {
            setlatestReply(content.slice(0, idx+1).join(" "));
            idx++                                 
            if(idx >= content.length) clearInterval(interval)
        }, 30);
    return () => clearInterval(interval);
    },[prevChats, reply])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [prevChats, loading]);

    return (
        <div className='mx-8 h-full text-center flex flex-col'>
            {currModelBehave && <p className='bg-black z-50 border border-blue-200 text-sm !text-gray-400 rounded px-1 py-0.9 absolute top-13 right-2'>{currModelBehave} Mode</p>}
            
            {newChat ? <div className='w-full self-center my-auto'>
                {
                    user && <h1 className='text-3xl font-bold text-white tracking-wide'>Hello {user.username}! Ready To Chat?</h1>
                } 
            </div>: null}
            <div className='chats'>
                {
                    prevChats?.slice(0, -1).map((chat, idx) => 
                        <div className={chat.role === "user" ? "userInput w-full flex justify-end text-end px-2 py-4" : "assistantReply w-full flex right-0 text-start px-2 py-2"} key={idx}>
                            {
                                chat.role === "user" ? 
                                <div className='flex max-w-2/3 flex-col items-end relative pt-2 pb-4' 
                                    onMouseEnter={() => setIsHovered(idx)}
                                    onMouseLeave={() => setIsHovered(null)} >
                                    <div className=' border rounded-xl prompt-div mb-2 text-center px-3 py-2'>
                                    <p className='prompt'>{chat.content}</p>
                                    </div>
                                    {isHovered === idx && (
                                    <button
                                        onClick={() => handleCopy(chat.content, idx)}
                                            className={`absolute mt-1 bottom-0 right-0 justify-end flex items-center text-sm p-1 rounded-xl hover:bg-gray-700 transition-opacity duration-300 ${
                                            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                                        }`}>
                                        {
                                            copiedId !== idx ? <i className="fa-regular fa-copy"></i>: <i className="fa-solid fa-copy "></i>
                                        } 
                                    </button>      
                                    )}

                                </div>
                                 :
                                <div className="assistantReply w-full prose text-start px-2 py-2 relative break-words max-w-full overflow-x-auto" 
                                    onMouseEnter={() => setIsHovered(idx)}
                                    onMouseLeave={() => setIsHovered(null)}>
                                    <ReactMarkdown
                                        rehypePlugins={[rehypeHighlight]}
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ node, ...props }) => <p className="mb-6 mt-4" {...props} />,
                                            ol: ({ node, ...props }) => (
                                                <ol className="list-decimal ml-6 mb-4 space-y-1" {...props} />
                                            ),
                                            ul: ({ node, ...props }) => (
                                                <ul className="list-disc ml-6 mb-4 space-y-1" {...props} />
                                            ),
                                            td: ({ node, ...props }) => (
                                                <td className="pb-4 px-2" {...props} /> 
                                            ),

                                            li: ({ node, ...props }) => <li className="mb-4" {...props} />,
                                            code: ({ node, inline, className, children, ...props }) => (
                                                <code
                                                    className={`${className} whitespace-pre-wrap break-words`}
                                                     {...props}
                                                         >
                                                    {children}
                                                </code>
                                            ),
                                    }}>
                                        {chat.content}
                                    </ReactMarkdown>
                                    <button
                                        onClick={() => handleCopy(chat.content, idx)}
                                            className="absolute mt-2 bottom-0 left-0 justify-start flex items-center text-sm  transition-opacity duration-300 opacity-100 p-1 rounded-xl hover:bg-gray-700">
                                        {
                                            copiedId !== idx ? <i className="fa-regular fa-copy"></i>: <i className="fa-solid fa-copy "></i>
                                        }                                      
                                    </button>    
                                </div>
                            }
                        </div>  
                    )
                }
                {
                    prevChats.length > 0 && 
                    (
                        latestReply !== null ? 
                        <div className="assistantReply w-full relative text-start px-2 py-2 break-words max-w-full overflow-x-auto"
                            onMouseEnter={() => setIsHovered("latest")}
                            onMouseLeave={() => setIsHovered(null)}>
                            <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-6 mt-4" {...props} />,
                                    ol: ({ node, ...props }) => (
                                        <ol className="list-decimal ml-6 mb-4 space-y-1" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="list-disc ml-6 mb-4 space-y-1" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="pb-4 px-2" {...props} /> 
                                    ),
                                    li: ({ node, ...props }) => <li className="mb-4" {...props} />,
                                    code: ({ node, inline, className, children, ...props }) => (
                                        <code
                                            className={`${className} whitespace-pre-wrap break-words`}
                                            {...props}
                                            >
                                                {children}
                                        </code>
                                    ),
                            }}>
                                {latestReply}
                            </ReactMarkdown>
                            <button
                                onClick={() => handleCopy(latestReply, "reply")}
                                className= "absolute mt-2 bottom-0 left-0 justify-start flex items-center text-sm  transition-opacity duration-300 p-1 rounded-xl hover:bg-gray-700">
                                {
                                    copiedId !== "reply" ? <i className="fa-regular fa-copy"></i>: <i className="fa-solid fa-copy "></i>
                                }
                            </button>   
                        </div>
                        :
                        <div className="assistantReply w-full prose text-start px-2 py-2 relative break-words max-w-full overflow-x-auto"
                            onMouseEnter={() => setIsHovered("latest")}
                            onMouseLeave={() => setIsHovered(null)}>
                            <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-6 mt-4" {...props} />,
                                    ol: ({ node, ...props }) => (
                                        <ol className="list-decimal ml-6 mb-4 space-y-1" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="list-disc ml-6 mb-4 space-y-1" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="pb-4 px-2" {...props} /> 
                                    ),
                                    li: ({ node, ...props }) => <li className="mb-4" {...props} />,
                                    code: ({ node, inline, className, children, ...props }) => (
                                        <code
                                            className={`${className} whitespace-pre-wrap w-full break-words`}
                                            {...props}
                                            >
                                                {children}
                                        </code>
                                    ),
                            }}>
                                {prevChats[prevChats.length-1].content}
                            </ReactMarkdown>
                            <button
                                onClick={() => handleCopy(prevChats[prevChats.length-1].content,"latest")}
                                className= "absolute mt-2 bottom-0 p-1 rounded-xl hover:bg-gray-700 left-0 justify-start flex items-center text-sm  transition-opacity duration-300">
                                {
                                    copiedId !== "latest" ? <i className="fa-regular fa-copy"></i>: <i className="fa-solid fa-copy "></i>
                                }
                            </button>  
                        </div>
                    )
                }

                <HashLoader className='flex-1 mt-10' loading = {loading} color="#ffffff" size={25}/>
                <div ref={messagesEndRef} />
            </div> 
        </div>
    )
}