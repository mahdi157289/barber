import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ProductCard } from '../../components/common/ProductCard';
import { useData } from '../../context/DataContext';

export const Products = () => {
    const { products } = useData();
    const trackRef = useRef<HTMLDivElement>(null);
    const animFrameRef = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Drag state
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const scrollStartLeft = useRef(0);

    // Auto-scroll speed (px per frame)
    const SPEED = 0.6;

    const autoScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        if (!isHovered && !isDragging.current) {
            track.scrollLeft += SPEED;
            // Loop: when we reach the halfway point (clone start), reset silently
            if (track.scrollLeft >= track.scrollWidth / 2) {
                track.scrollLeft = 0;
            }
        }
        animFrameRef.current = requestAnimationFrame(autoScroll);
    }, [isHovered]);

    useEffect(() => {
        animFrameRef.current = requestAnimationFrame(autoScroll);
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [autoScroll]);

    // Arrow scroll
    const scrollBy = (dir: 'left' | 'right') => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
    };

    // Drag handlers
    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        scrollStartLeft.current = trackRef.current?.scrollLeft ?? 0;
        if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !trackRef.current) return;
        const delta = e.clientX - dragStartX.current;
        trackRef.current.scrollLeft = scrollStartLeft.current - delta;
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = 'grab';
    };

    // Touch drag handlers
    const onTouchStart = (e: React.TouchEvent) => {
        dragStartX.current = e.touches[0].clientX;
        scrollStartLeft.current = trackRef.current?.scrollLeft ?? 0;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!trackRef.current) return;
        const delta = e.touches[0].clientX - dragStartX.current;
        trackRef.current.scrollLeft = scrollStartLeft.current - delta;
    };

    // Duplicate products for seamless loop
    const loopedProducts = products.length > 0 ? [...products, ...products] : [];

    return (
        <section
            id="products"
            className="py-24 bg-dark relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                isDragging.current = false;
                if (trackRef.current) trackRef.current.style.cursor = 'grab';
            }}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                <div className="container mx-auto px-6">
                    <SectionTitle subtitle="PREMIUM GROOMING" title="OUR PRODUCTS" />
                </div>

                {/* Carousel Wrapper */}
                <div className="relative mt-12">
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollBy('left')}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-dark border border-gold/40 flex items-center justify-center text-gold shadow-xl transition-all duration-300
              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollBy('right')}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-dark border border-gold/40 flex items-center justify-center text-gold shadow-xl transition-all duration-300
              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
                    >
                        <ChevronRight size={22} />
                    </button>

                    {/* Scrollable Track */}
                    <div
                        ref={trackRef}
                        className="products-track flex gap-6 overflow-x-auto pb-4 select-none"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            cursor: 'grab',
                            paddingLeft: '6rem',
                            paddingRight: '6rem',
                        }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                    >
                        {loopedProducts.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className="flex-shrink-0 w-80"
                                style={{ pointerEvents: isDragging.current ? 'none' : 'auto' }}
                            >
                                <ProductCard
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                    image={product.image}
                                    inStock={product.inStock}
                                    delay={0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hide scrollbar cross-browser */}
            <style>{`.products-track::-webkit-scrollbar { display: none; }`}</style>
        </section>
    );
};
