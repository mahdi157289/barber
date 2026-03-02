import React from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
    name: string;
    price: string;
    description: string;
    image: string;
    inStock: boolean;
    delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    price,
    description,
    image,
    inStock,
}) => {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group bg-dark border border-gray-800 rounded-xl overflow-hidden hover:border-gold transition-colors duration-300 h-full flex flex-col"
        >
            <div className="relative h-80 overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />

                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${inStock ? 'bg-gold text-dark' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                <div className="absolute bottom-4 left-4">
                    <span className="text-2xl font-bold text-gold">{price}</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{name}</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">{description}</p>

                <button
                    disabled={!inStock}
                    className={`w-full py-3 rounded text-sm font-bold tracking-widest uppercase transition-all duration-300 
            ${inStock
                            ? 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-dark'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-800'
                        }`}
                >
                    {inStock ? 'Buy Now' : 'Out of Stock'}
                </button>
            </div>
        </motion.div>
    );
};
