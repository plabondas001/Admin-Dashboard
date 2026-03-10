import React, { useState } from 'react';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import FilterBar from '../Components/FilterBar/FilterBar';

// Mock product data
const mockProducts = [
    {
        id: 'P001',
        image: 'https://via.placeholder.com/50?text=Prod1',
        name: 'Wireless Headphones',
        description: 'High-quality noise-cancelling headphones',
        category: 'Electronics',
        brand: 'Sony',
        oldPrice: 299.99,
        newPrice: 249.99,
        stock: 150,
        rating: 4.5,
        reviews: 120,
        orders: 85,
        sales: 21249.15,
    },
    {
        id: 'P002',
        image: 'https://via.placeholder.com/50?text=Prod2',
        name: 'Smartphone',
        description: 'Latest model with advanced camera',
        category: 'Mobile',
        brand: 'Apple',
        oldPrice: 999.99,
        newPrice: 899.99,
        stock: 80,
        rating: 4.7,
        reviews: 200,
        orders: 150,
        sales: 134998.5,
    },
    {
        id: 'P003',
        image: 'https://via.placeholder.com/50?text=Prod3',
        name: 'Laptop',
        description: 'Powerful laptop for gaming and work',
        category: 'Computers',
        brand: 'Dell',
        oldPrice: 1299.99,
        newPrice: 1099.99,
        stock: 45,
        rating: 4.2,
        reviews: 90,
        orders: 60,
        sales: 65999.4,
    },
    {
        id: 'P004',
        image: 'https://via.placeholder.com/50?text=Prod4',
        name: 'Smart Watch',
        description: 'Fitness tracking and notifications',
        category: 'Wearables',
        brand: 'Fitbit',
        oldPrice: 199.99,
        newPrice: 149.99,
        stock: 200,
        rating: 4.0,
        reviews: 150,
        orders: 110,
        sales: 16498.9,
    },
    {
        id: 'P005',
        image: 'https://via.placeholder.com/50?text=Prod5',
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with deep bass',
        category: 'Audio',
        brand: 'JBL',
        oldPrice: 99.99,
        newPrice: 79.99,
        stock: 300,
        rating: 4.6,
        reviews: 180,
        orders: 140,
        sales: 11198.6,
    },
];

const Products = () => {
    const [products, setProducts] = useState(mockProducts);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [showBy, setShowBy] = useState(10);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortColumn === column && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortColumn(column);
        setSortDirection(direction);

        const sortedProducts = [...products].sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            // Normalize undefined/null
            if (valA === undefined || valA === null) valA = '';
            if (valB === undefined || valB === null) valB = '';

            // If either value is a string, compare as string (case-insensitive)
            if (typeof valA === 'string' || typeof valB === 'string') {
                const sA = String(valA).toLowerCase();
                const sB = String(valB).toLowerCase();
                if (sA < sB) return direction === 'asc' ? -1 : 1;
                if (sA > sB) return direction === 'asc' ? 1 : -1;
                return 0;
            }

            // Otherwise compare numbers
            const nA = Number(valA);
            const nB = Number(valB);
            if (isNaN(nA) || isNaN(nB)) {
                // Fallback to string compare if values aren't numeric
                const sA = String(valA).toLowerCase();
                const sB = String(valB).toLowerCase();
                if (sA < sB) return direction === 'asc' ? -1 : 1;
                if (sA > sB) return direction === 'asc' ? 1 : -1;
                return 0;
            }

            return direction === 'asc' ? nA - nB : nB - nA;
        });

        setProducts(sortedProducts);
    };

    const getSortIcon = (column) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const categories = [...new Set(mockProducts.map(p => p.category))];
    const brands = [...new Set(mockProducts.map(p => p.brand))];

    // Compute filteredProducts from current products and filters
    const filteredProducts = products.filter((p) => {
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            const matchesSearch = String(p.name).toLowerCase().includes(q) ||
                String(p.category).toLowerCase().includes(q) ||
                String(p.brand).toLowerCase().includes(q) ||
                String(p.id).toLowerCase().includes(q) ||
                String(p.description).toLowerCase().includes(q);
            if (!matchesSearch) return false;
        }

        if (ratingFilter && p.rating < ratingFilter) return false;
        if (categoryFilter && categoryFilter !== 'All' && p.category !== categoryFilter) return false;
        if (brandFilter && brandFilter !== 'All' && p.brand !== brandFilter) return false;
        return true;
    });

    // apply showBy limit
    const visibleProducts = filteredProducts.slice(0, showBy);

    return (
        <div className="rounded-lg shadow-md bg-transparent p-6" style={{ backgroundImage: 'linear-gradient(90deg,var(--bg-start),var(--bg-mid),var(--bg-end))' }}>
            {/* Top Filter Section (use shared FilterBar) */}
            <div className="mb-6">
                <FilterBar
                    showBy={showBy}
                    onShowByChange={(n) => setShowBy(n)}
                    rating={ratingFilter}
                    onRatingChange={(r) => setRatingFilter(r)}
                    category={categoryFilter}
                    onCategoryChange={(c) => setCategoryFilter(c)}
                    brand={brandFilter}
                    onBrandChange={(b) => setBrandFilter(b)}
                    searchQuery={searchQuery}
                    setSearchQuery={(v) => setSearchQuery(v)}
                    showOptions={[10, 20, 50, 100]}
                    categories={categories}
                    brands={brands}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-sm">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="text-white sticky top-0 z-10" style={{ backgroundColor: 'var(--accent-strong-start)' }}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                <input type="checkbox" className="rounded" />
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'id' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('id')}
                            >
                                UID {getSortIcon('id')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'name' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('name')}
                            >
                                Product {getSortIcon('name')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'category' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('category')}
                            >
                                Category {getSortIcon('category')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'brand' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('brand')}
                            >
                                Brand {getSortIcon('brand')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'newPrice' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('newPrice')}
                            >
                                Price {getSortIcon('newPrice')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'stock' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('stock')}
                            >
                                Stock {getSortIcon('stock')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'rating' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('rating')}
                            >
                                Rating {getSortIcon('rating')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'orders' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('orders')}
                            >
                                Orders {getSortIcon('orders')}
                            </th>
                            <th
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${sortColumn === 'sales' ? 'bg-slate-900/20' : ''}`}
                                onClick={() => handleSort('sales')}
                            >
                                Sales {getSortIcon('sales')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-slate-700">
                        {visibleProducts && visibleProducts.length > 0 ? (
                            visibleProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-100">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-10 w-10 rounded-md object-cover"
                                            />
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-slate-100">{product.name}</h3>
                                                <p className="text-sm text-slate-300">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{product.brand}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="line-through text-slate-300 mr-2">${product.oldPrice.toFixed(2)}</span>
                                        <span className="text-red-400">${product.newPrice.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        <span className="text-yellow-400">★</span> {product.rating} ({product.reviews} reviews)
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{product.orders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">${product.sales.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="text-purple-400 hover:text-purple-200">
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            <button className="text-green-400 hover:text-green-200">
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button className="text-red-400 hover:text-red-200">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={11} className="px-6 py-6 text-center text-slate-300">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
