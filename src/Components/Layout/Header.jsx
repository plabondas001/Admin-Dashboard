import {
    Bell,
    ChevronDown,
    Filter,
    Menu,
    Plus,
    Search,
    Settings,
    Sun,
    Moon,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

const Header = ({ SidebarCollapsed, onToggleSidebar }) => {
    const [theme, setTheme] = useState(() => {
        try {
            const t = localStorage.getItem("theme");
            if (t) return t;
            return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        } catch (e) {
            return "light";
        }
    });

    useEffect(() => {
        try {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("theme", theme);
        } catch (e) { }
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
        <div className="shadow-lg backdrop-blur-xl border-b border-slate-800 px-6 py-4" style={{ backgroundImage: 'linear-gradient(90deg,var(--bg-start),var(--bg-mid),var(--bg-end))' }}>
            <div className="flex items-center justify-between">
                {/* Left section - logo attached to header */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-transparent flex items-center justify-center">
                            <img src="/logo-DaOXiO9r.png" alt="logo" className="w-9 h-9 object-contain" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-slate-100 uppercase">Sarker Shop</h1>
                        </div>
                    </div>

                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg cursor-pointer text-slate-200 hover:bg-slate-800 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5"></Menu>
                    </button>

                    <div className="hidden md:block">
                        <h1 className="text-2xl font-bold text-slate-100">
                            Dashboard
                        </h1>
                        <p className="text-sm text-slate-300">Welcome back, Alex! here's what's happening today</p>
                    </div>
                </div>

                {/* Center */}
                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></Search>
                        <input
                            className="w-full pl-10  pr-4 py-2.5 bg-[#0b1a2a] border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#214b6b] transition-all"
                            type="text"
                            placeholder="Search Anything"
                        />
                        <button className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-200 dark:text-black hover:text-slate-600 dark:hover:text-black">
                            <Filter></Filter>
                        </button>
                    </div>
                </div>

                {/* Right */}

                <div className="flex items-center space-x-3">
                    {/* Quic Action */}
                    <button className="hidden cursor-pointer lg:flex items-center space-x-2 py-2 px-4 text-slate-100 rounded-xl hover:shadow-lg transition-all" style={{ backgroundImage: 'linear-gradient(90deg,var(--accent-strong-start),var(--accent-strong-end))' }}>
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">New</span>
                    </button>

                    {/* Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 cursor-pointer rounded-xl text-slate-200 hover:bg-slate-800 transition-colors flex items-center justify-center"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    {/* Notification */}
                    <button className="relative p-2.5 cursor-pointer rounded-xl text-slate-200 hover:bg-slate-800 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 w-5 h-5 bg-red-500 text-slate-100 text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* Setting */}
                    <button className="p-2.5 cursor-pointer rounded-xl text-slate-200 hover:bg-slate-800 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>

                    {/* User Profile */}

                    <div className="flex items-center space-x-3 pl-3 border-l border-slate-700 dark:border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-slate-700 ring-2 ring-[#184a6a] flex items-center justify-center text-slate-200">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="hidden md:block">
                            <p className="text-md font-bold text-slate-100">
                                Plabon Das
                            </p>
                            <p className="text-xs text-slate-300">
                                Administrator
                            </p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-200"></ChevronDown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
