import {
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      { id: "overview", label: "Overview" },
      { id: "reports", label: "Reports" },
      { id: "insights", label: "Insights" },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    count: "2.4k",
    submenu: [
      { id: "all-users", label: "All-Users" },
      { id: "roles", label: "Roles & Permissions" },
      { id: "activity", label: "User Activity" },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-Commerce",
    submenu: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
      { id: "customers", label: "Customers" },
    ],
  },
  {
    id: "inventory",
    icon: Package,
    label: "Inventory",
    count: "847",
  },
  {
    id: "transactions",
    icon: CreditCard,
    label: "Transactions",
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    badge: "12",
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar",
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
  },
];

const Sidebar = ({ collapsed, onToggle, currentPage, onPageChange }) => {
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

  const toggleExpanded = (itemid) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
      newExpanded.add(itemid);
    }

    setExpandedItems(newExpanded);
  };

  return (
    <div
      className={`${collapsed ? "w-20" : "w-72"} transition duration-300 ease-in-out bg-white  backdrop-blur-xl border-r border-slate-100/50 dark:border-slate-300/50 flex flex-col relative z-10`}
    >
      {/* logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-300/50">
        <div className="flex items-center space-x-3">
          <div className="w-15 h-10 bg-gradient-to-r from-blue-300 to-purple-600 dark:bg-gradient-to-r from-blue-300 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            {/* <Zap className="w-6 h-6 text-white"></Zap> */}
            <img className="p-2" src="/public/logo-DaOXiO9r.png" alt="" />
          </div>

          {/* Conditional Rendering */}
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white dark:text-black">
                Sarker Shop
              </h1>
              <p className="text-xs text-white dark:text-black">Admin Panel</p>
            </div>
          )}
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.id);
                  } else {
                    onPageChange(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  currentPage === item.id || item.active
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-white dark:text-black hover:bg-gray-300 dark:hover:bg-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />

                  {/* conditional Rendering */}
                  <>
                    {!collapsed && (
                      <span className="font-medium ml-2">{item.label}</span>
                    )}

                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full ">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="px-2 py-1 text-xs bg-black dark:bg-gray-200 dark:text-black rounded-full">
                        {item.count}
                      </span>
                    )}
                  </>
                </div>

                {!collapsed && item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform`}
                  ></ChevronDown>
                )}
              </button>

              {/* Sub Menus */}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-2 mt-2 space-y-1">
                  {item.submenu.map((subitem) => {
                    return (
                      <button className="w-full text-left p-2 text-sm text-black dark:text-black hover:bg-gray-200 rounded-lg transition-all">
                        {subitem.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-black dark:border-white">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800 dark:bg-slate-50">
            <img
              className="w-10 h-10 rounded-full ring-2 ring-blue-600"
              src="#"
              alt="user"
            />
            <div className="flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white dark:text-black truncate">
                  Sarker Shop
                </p>
                <p className="text-xs text-white dark:text-black">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
