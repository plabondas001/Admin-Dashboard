
import { useState } from "react"
import Header from "./Components/Layout/Header"
import Sidebar from "./Components/Layout/Sidebar"
import Dashboard from "./Pages/Dashboard"
import Analytics from "./Pages/Analytics"
import Overview from "./Pages/Overview"
import Insights from "./Pages/Insights"
import Users from "./Pages/Users"
import AllUsers from "./Pages/AllUsers"
import Roles from "./Pages/Roles"
import Activity from "./Pages/Activity"
import Ecommerce from "./Pages/Ecommerce"
import Products from "./Pages/Products"
import Orders from "./Pages/Orders"
import Customers from "./Pages/Customers"
import Inventory from "./Pages/Inventory"
import Transactions from "./Pages/Transactions"
import Messages from "./Pages/Messages"
import Calendar from "./Pages/Calendar"
import Reports from "./Pages/Reports"
import Settings from "./Pages/Settings"

function App() {

    const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
    const [currentpage, setCurrentPage] = useState("dashboard")

    return (
        <div className="min-h-screen bg-[#071229] transition-all duration-500 text-slate-200">
            <div className="flex flex-col h-screen">
                {/* Header spans full width */}
                <Header SidebarCollapsed={sideBarCollapsed} onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)} />

                {/* Below header: sidebar + content */}
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar collapsed={sideBarCollapsed} onToggle={() => setSideBarCollapsed(!sideBarCollapsed)} currentPage={currentpage} onPageChange={setCurrentPage} />
                    <div className="flex-1 flex flex-col overflow-hidden border-l border-slate-800">
                        <div className="flex-1 overflow-auto">
                            {/* Map page id to component */}
                            {(() => {
                                const pages = {
                                    dashboard: Dashboard,
                                    analytics: Analytics,
                                    overview: Overview,
                                    insights: Insights,
                                    users: Users,
                                    "all-users": AllUsers,
                                    roles: Roles,
                                    activity: Activity,
                                    ecommerce: Ecommerce,
                                    products: Products,
                                    orders: Orders,
                                    customers: Customers,
                                    inventory: Inventory,
                                    transactions: Transactions,
                                    messages: Messages,
                                    calendar: Calendar,
                                    reports: Reports,
                                    settings: Settings,
                                };

                                const Page = pages[currentpage] || (() => <div className="p-6 text-slate-300">Page: {currentpage}</div>);
                                return <Page />;
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App
