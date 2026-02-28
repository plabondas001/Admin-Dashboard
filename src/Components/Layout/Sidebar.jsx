
const Sidebar = () => {
  return (
    <div className="transition duration-300 ease-in-out bg-white  backdrop-blur-xl border-r border-slate-100/50 dark:border-slate-300/50 flex flex-col relative z-10">
      {/* logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-300/50">
        <div className="flex items-center space-x-3">
          <div className="w-20 h-10 bg-purple-300 dark:bg-purple-300 flex items-center justify-center shadow-lg">
            {/* <Zap className="w-6 h-6 text-white"></Zap> */}
            <img className="p-1" src="/public/logo-DaOXiO9r.png" alt=""/>
          </div>


          {/* Conditional Rendering */}
          <div>
            <h1 className="text-xl font-bold text-white dark:text-black">Sarker Shop</h1>
            <p className="text-xs text-white dark:text-black">Admin Panel</p>
          </div>

        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-black dark:border-white">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800 dark:bg-slate-50">
            <img className="w-10 h-10 rounded-full ring-2 ring-blue-600" src="#" alt="user"/>
            <div className="flex-1 min-w-0">
            <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white dark:text-black truncate">Sarker Shop</p>
            <p className="text-xs text-white dark:text-black">Administrator</p>
            </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default Sidebar;
