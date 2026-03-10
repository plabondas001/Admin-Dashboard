import React, { useState, useMemo } from 'react';
import FilterBar from '../Components/FilterBar/FilterBar';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Breadcrumb from '../Components/Layout/Breadcrumb';

const mockCustomers = Array.from({ length: 28 }).map((_, i) => ({
    id: `C-${1000 + i}`,
    name: ['Arafat Hossain','Sadia Akter','Nur Islam','Mina Rahman','Rafi Ahmed','Taslima Banu'][i%6],
    email: `user${i}@example.com`,
    phone: `017${10000000 + i}`,
    role: ['Customer','VIP','Wholesale'][i%3],
    status: ['Active','Inactive','Banned'][i%3],
    orders: (i%12) + 1,
    joined: `2023-0${(i%9)+1}-15`
}));

const StatusBadge = ({ status }) => {
    const map = { Active: 'bg-green-500 text-white', Inactive: 'bg-yellow-500 text-white', Banned: 'bg-red-500 text-white' };
    return <span className={`px-2 py-0.5 rounded text-xs ${map[status] || 'bg-slate-600'}`}>{status}</span>;
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

const Customers = () => {
    const [showBy, setShowBy] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);

    const filtered = useMemo(()=>{
        let data = mockCustomers;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
        }
        if (statusFilter && statusFilter !== 'All') data = data.filter(c=>c.status===statusFilter);
        return data;
    },[searchQuery,statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / showBy));
    const visible = filtered.slice((page-1)*showBy, page*showBy);

    return (
        <div className="p-6">
            <Breadcrumb title="Customers" paths={["Home", "Dashboard", "Customers"]} />
            <div className="my-4">
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
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Orders</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Joined</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-slate-700">
                        {visible.map(c=> (
                            <tr key={c.id} className="hover:bg-slate-800 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-slate-100">{c.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{c.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{c.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{c.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{c.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={c.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{c.orders}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-300">{c.joined}</td>
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

export default Customers;
