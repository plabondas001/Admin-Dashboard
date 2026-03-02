import React from "react";

const Dashboard = () => {
    return (
        <main className="p-6">
            <div className="rounded-xl bg-[#071229] p-6 shadow-md">
                <h2 className="text-2xl font-bold text-slate-100">Dashboard</h2>
                <p className="mt-2 text-slate-300">Overview and quick stats will appear here.</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-r from-[#13b58b] to-[#0ea5a8] rounded-lg text-slate-100">
                        <p className="text-sm opacity-90">Revenue</p>
                        <p className="text-xl font-semibold mt-2">$12,430</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-lg text-slate-100">
                        <p className="text-sm opacity-90">Orders</p>
                        <p className="text-xl font-semibold mt-2">1,204</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] rounded-lg text-slate-100">
                        <p className="text-sm opacity-90">Customers</p>
                        <p className="text-xl font-semibold mt-2">8,342</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
