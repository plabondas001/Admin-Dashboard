import React, { useState } from "react";
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from "lucide-react";
import Breadcrumb from "../Components/Layout/Breadcrumb";
import mockMessages from "../data/messages.json";

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState(mockMessages[0]);
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="h-[calc(100vh-64px)] p-0 sm:px-6 sm:py-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Breadcrumb title="Messages" paths={["Home", "Messages"]} />

            <div className="flex-1 mt-6 flex overflow-hidden bg-[#071229] rounded-2xl border border-slate-800 shadow-2xl">
                {/* Sidebar */}
                <div className="w-full md:w-80 border-r border-slate-800 flex flex-col">
                    <div className="p-4 border-b border-slate-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full bg-[#0b1a2a] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {mockMessages.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full flex items-center gap-3 p-4 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 ${selectedChat?.id === chat.id ? 'bg-blue-600/10 border-l-4 border-l-blue-600' : ''}`}
                            >
                                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-xl object-cover" />
                                <div className="flex-1 text-left overflow-hidden">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-bold text-white truncate">{chat.name}</h4>
                                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate">{chat.lastMessage}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                        {chat.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="hidden md:flex flex-1 flex-col bg-[#0b1326]">
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#071229]">
                                <div className="flex items-center gap-3">
                                    <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-xl object-cover" />
                                    <div>
                                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">{selectedChat.name}</h3>
                                        <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold uppercase">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            Online
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <button className="hover:text-blue-500 transition-colors"><Phone className="w-5 h-5" /></button>
                                    <button className="hover:text-blue-500 transition-colors"><Video className="w-5 h-5" /></button>
                                    <button className="hover:text-blue-500 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                                {selectedChat.messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl p-3 shadow-lg ${msg.sender === 'me'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-[#071229] border border-slate-800 text-slate-200 rounded-tl-none'
                                            }`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <span className={`text-[10px] block mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-slate-500'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 bg-[#071229] border-t border-slate-800">
                                <form
                                    className="flex items-center gap-3 bg-[#0b1a2a] border border-slate-700 rounded-2xl px-4 py-2"
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <button type="button" className="text-slate-400 hover:text-blue-500"><Smile className="w-5 h-5" /></button>
                                    <button type="button" className="text-slate-400 hover:text-blue-500"><Paperclip className="w-5 h-5" /></button>
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-transparent border-none text-sm text-slate-200 focus:outline-none"
                                    />
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-50 p-6 text-center">
                            <div className="w-20 h-20 bg-slate-800 flex items-center justify-center rounded-3xl mb-4">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Your Inbox</h3>
                            <p>Select a contact to start messaging.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
