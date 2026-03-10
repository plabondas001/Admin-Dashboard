import {
    CarTaxiFront,
    CircleDollarSign,
    CircleUserRound,
    ShoppingCart,
    Star,
    User,
} from "lucide-react";
import React from "react";
import Breadcrumb from "../Components/Layout/Breadcrumb";

const Dashboard = () => {
    return (
        <main className="p-6">
            <Breadcrumb title="Dashboard" paths={["Home", "Dashboard", "Ecommerce"]} />

            <div className="rounded-xl bg-[#071229] p-3 shadow-md">

                <div className=" grid grid-cols-1 space-y-2 md:grid-cols-4 gap-2">
                    <div className="p-2 bg-gradient-to-r from-[#13b58b] to-[#0ea5a8] rounded-lg text-slate-100">
                        <p className="text-lg font-semibold">Total Revenue</p>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold mt-2">$12,430</p>
                            <CircleDollarSign
                                className="bg-[#096e55] text-[#0effc3] opacity-80 px-1 rounded-md"
                                size={35}
                            />
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                            <p className="bg-[#187d44] inline-block py-1 px-2 rounded-md font-bold">
                                + 95%
                            </p>
                            <p className="font-bold opacity-70">Last Month</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-lg text-slate-100">
                        <p className="text-lg font-semibold">Total Orders</p>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold mt-2">1,204</p>
                            <ShoppingCart
                                className="bg-[#340876] text-[#e9d8ec] opacity-80 px-1 rounded-md"
                                size={35}
                            />
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                            <p className="bg-[#7c07d5] inline-block py-1 px-2 rounded-md font-bold">
                                + 96%
                            </p>
                            <p className="font-bold opacity-70">Last Month</p>
                        </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] rounded-lg text-slate-100">
                        <p className="text-lg font-semibold">Total Customers</p>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold mt-2">8,342</p>
                            <CircleUserRound
                                className="bg-[#06518f] text-[#0adaff] opacity-80 px-1 rounded-md"
                                size={35}
                            />
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                            <p className="bg-[#0f44a7] inline-block py-1 px-2 rounded-md font-bold">
                                + 90%
                            </p>
                            <p className="font-bold opacity-70">Last Month</p>
                        </div>
                    </div>
                    <div className="p-4 h-38 bg-gradient-to-r from-[#f09205] to-[#b7ae55] rounded-lg text-slate-100">
                        <p className="text-lg font-semibold">Total Reviews</p>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold mt-2">8,342</p>
                            <Star
                                className="bg-[#9d6d07] text-[#453d04] opacity-80 px-1 rounded-md"
                                size={35}
                            />
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                            <p className="bg-[#886c09] inline-block py-1 px-2 rounded-md font-bold">
                                + 98%
                            </p>
                            <p className="font-bold opacity-70">Last Month</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
