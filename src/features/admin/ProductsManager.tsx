import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, X } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ImageDropZone } from '../../components/common/ImageDropZone';
import { useData } from '../../context/DataContext';
import type { Product } from '../../context/DataContext';

export const ProductsManager = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        inStock: true
    });

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            image: '',
            inStock: true
        });
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            inStock: product.inStock
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            name: formData.name,
            price: formData.price,
            description: formData.description,
            image: formData.image,
            inStock: formData.inStock
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-white">Products Management</h1>
                    <p className="text-gray-400 text-sm">Manage your store products and inventory</p>
                </div>
                <Button variant="primary" onClick={handleAddProduct}>
                    <Plus size={18} className="mr-2" />
                    Add New Product
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] p-4 rounded-xl border border-gold/10 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-dark/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-gold focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gold/10 text-gold text-left text-xs uppercase tracking-wider">
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-dark flex flex-shrink-0 flex items-center justify-center text-gold border border-gold/20 overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package size={20} />
                                                )}
                                            </div>
                                            <span className="font-medium text-white line-clamp-2">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 truncate max-w-[200px]">{product.description}</td>
                                    <td className="p-4 font-medium text-white">{product.price}</td>
                                    <td className="p-4">
                                        {product.inStock ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500 whitespace-nowrap">
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-500 whitespace-nowrap">
                                                Out of Stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No products found matching your search.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-[#1a1a1a] border border-gold/20 rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 my-8">
                        <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#1a1a1a] z-10 rounded-t-xl">
                            <h2 className="text-xl font-serif text-white">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                    placeholder="e.g. Premium Beard Oil"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Price</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                        placeholder="e.g. 24.99 TND"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Stock Status</label>
                                    <select
                                        value={formData.inStock ? 'true' : 'false'}
                                        onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                                        className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                    >
                                        <option value="true">In Stock</option>
                                        <option value="false">Out of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <ImageDropZone
                                label="Product Image"
                                value={formData.image}
                                onChange={(dataUrl) => setFormData({ ...formData, image: dataUrl })}
                                maxSizeMB={5}
                            />

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none h-24 resize-none"
                                    placeholder="Product description..."
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-6 md:mt-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
