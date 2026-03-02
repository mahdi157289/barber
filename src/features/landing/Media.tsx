import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const CrossfadePanel: React.FC<{ image1: string; image2: string; label?: string; delay?: number }> = ({
    image1,
    image2,
    label,
    delay = 0,
}) => {
    const [showFirst, setShowFirst] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirst((prev) => !prev);
        }, 4000);

        // Apply initial delay
        const timeout = setTimeout(() => {
            setShowFirst(false);
        }, 2000 + delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [delay]);

    if (!image1 && !image2) {
        return (
            <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden bg-dark/50 border border-white/5 flex items-center justify-center">
                <p className="text-gray-600 text-sm">No images configured</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden group">
            {/* Image 1 */}
            {image1 && (
                <img
                    src={image1.startsWith('data:') ? image1 : `${image1}&auto=format&fit=crop&w=800&q=80`}
                    alt={label || 'Media'}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out"
                    style={{
                        opacity: showFirst ? 1 : 0,
                        filter: showFirst ? 'blur(0px)' : 'blur(12px)',
                    }}
                />
            )}

            {/* Image 2 */}
            {image2 && (
                <img
                    src={image2.startsWith('data:') ? image2 : `${image2}&auto=format&fit=crop&w=800&q=80`}
                    alt={label || 'Media'}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out"
                    style={{
                        opacity: showFirst ? 0 : 1,
                        filter: showFirst ? 'blur(12px)' : 'blur(0px)',
                    }}
                />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Label */}
            {label && (
                <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white font-serif text-lg drop-shadow-lg">{label}</span>
                </div>
            )}

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
        </div>
    );
};

export const Media = () => {
    const { mediaPanels } = useData();

    // Don't render section if both panels have no images
    const hasAnyImages = mediaPanels.some(p => p.image1 || p.image2);
    if (!hasAnyImages) return null;

    return (
        <section className="py-20 bg-darker relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-[128px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium">Showcase</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">
                        Our <span className="text-gold">Media</span>
                    </h2>
                    <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
                </motion.div>

                <div className="flex flex-col gap-12 w-full">
                    {mediaPanels.map((panel, index) => (
                        <motion.div
                            key={panel.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <CrossfadePanel
                                image1={panel.image1}
                                image2={panel.image2}
                                label={panel.label}
                                delay={index * 1000}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
