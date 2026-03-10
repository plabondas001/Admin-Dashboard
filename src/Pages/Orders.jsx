import React, { useState, useMemo } from 'react';
import FilterBar from '../Components/FilterBar/FilterBar';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const mockOrders = Array.from({ length: 36 }).map((_, i) => ({
    id: `#${4980 + i}`,
    client: ['Miron Mahmud','Tahmina Bonny','Labonno Khan','Sheikh Adabali','Johara Khatun','Kurulus Osman'][i%6],
    product: `${(i%5)+1} item`,
    amount: (50 + i).toFixed(2),
    payment: ['bkash','nagad','paypal','payoneer','cash on delivery'][i%5],
    paymentStatus: ['Paid','Pending','Refunded','Unpaid'][i%4],
    status: ['Pending','Shipped','Cancelled','Recieved'][i%4],
    date: '15/06/2022 14:02'
}));

const StatusBadge = ({ status }) => {
    const map = {
        Pending: 'bg-pink-500 text-white',
        Shipped: 'bg-blue-400 text-white',
        Cancelled: 'bg-red-400 text-white',
        Recieved: 'bg-green-400 text-white',
    };
    return <span className={`px-2 py-0.5 rounded text-xs ${map[status] || 'bg-slate-600'}`}>{status}</span>;
};

const PaymentBadge = ({ ps }) => {
    const map = {
        Paid: 'bg-green-500 text-white',
        Pending: 'bg-yellow-500 text-black',
        Refunded: 'bg-purple-500 text-white',
        Unpaid: 'bg-red-500 text-white',
    };
    return <span className={`px-2 py-0.5 rounded text-xs ${map[ps] || 'bg-slate-600'}`}>{ps}</span>;
};

const Pagination = ({ page, setPage, total }) => {
    if (total <= 1) return null;
    const pages = [];
    for (let i=1;i<=total;i++) pages.push(i);
    const start = Math.max(1, page - 2);
    const end = Math.min(total, page + 2);
    return (
        <div className="flex items-center space-x-2">
            <button onClick={() => setPage((p)=>Math.max(1,p-1))} className="px-2 py-1 bg-slate-700 rounded">‹</button>
            {start>1 && <button onClick={()=>setPage(1)} className="px-2 py-1 bg-slate-700 rounded">1</button>}
            {start>2 && <span className="px-2">…</span>}
            {pages.slice(start-1,end).map(p=> (
                <button key={p} onClick={()=>setPage(p)} className={`px-3 py-1 rounded ${p===page? 'bg-blue-500 text-white' : 'bg-slate-700'}`}>{p}</button>
            ))}
            {end<total-1 && <span className="px-2">…</span>}
            {end<total && <button onClick={()=>setPage(total)} className="px-2 py-1 bg-slate-700 rounded">{total}</button>}
            <button onClick={() => setPage((p)=>Math.min(total,p+1))} className="px-2 py-1 bg-slate-700 rounded">›</button>
        </div>
    );
};

const Orders = () => {
    const [showBy, setShowBy] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);

    const filtered = useMemo(()=>{
        let data = mockOrders;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(o => o.id.toLowerCase().includes(q) || o.client.toLowerCase().includes(q));
        }
        if (statusFilter && statusFilter !== 'All') data = data.filter(o=>o.status===statusFilter);
        return data;
    },[searchQuery,statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / showBy));
    const visible = filtered.slice((page-1)*showBy, page*showBy);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Order List</h2>

            <div className="mb-4">
                <FilterBar
                    showBy={showBy}
                    onShowByChange={(n)=>{ setShowBy(n); setPage(1); }}
                    rating={0}
                    onRatingChange={()=>{}}
                    category={'All'}
                    onCategoryChange={()=>{}}
                    brand={'All'}
                    onBrandChange={()=>{}}
                    searchQuery={searchQuery}
                    setSearchQuery={(v)=>{ setSearchQuery(v); setPage(1); }}
                    showOptions={[12,24,48]}
                    categories={[]}
                    brands={[]}
                />
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-sm">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="text-white bg-[#0b3a61]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">UID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Payment Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-slate-700">
                        {visible.map(o=> (
                            <tr key={o.id} className="hover:bg-slate-800 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-slate-100">{o.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{o.client}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{o.product}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">${o.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{o.payment}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><PaymentBadge ps={o.paymentStatus} /></td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={o.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{o.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <button className="text-purple-400"><EyeIcon className="h-5 w-5" /></button>
                                        <button className="text-green-400"><PencilIcon className="h-5 w-5" /></button>
                                        <button className="text-red-400"><TrashIcon className="h-5 w-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-300">showing {visible.length} of {filtered.length} results</div>
                <Pagination page={page} setPage={setPage} total={totalPages} />
            </div>
        </div>
    );
};

export default Orders;
