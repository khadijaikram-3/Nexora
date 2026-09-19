import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

const categories = [
    { href: "/audio", name: "Audio", imageUrl: "/audio.jpg" },
    { href: "/gaming", name: "Gaming", imageUrl: "/gaming.jpg" },
    { href: "/entertainment", name: "Entertainment", imageUrl: "/entertainment.jpg" },
    { href: "/mobile-accessories", name: "Mobile Accessories", imageUrl: "/mobile.jpg" },
    { href: "/smart-tech", name: "Smart Tech", imageUrl: "/smarttech.jpg" },
    { href: "/cameras-creator", name: "Cameras & Creator", imageUrl: "/camera.jpg" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <div className="relative min-h-screen bg-[#080B12] text-[#F5F7FA] overflow-hidden">

            {/* Subtle background atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

                {/* Hero / Intro */}
                <section className="text-center mb-14 animate-[fadeIn_0.7s_ease-out]">

                    <p className="text-sm sm:text-base font-medium tracking-[0.25em] uppercase text-[#38BDF8] mb-4">
                        Welcome to Nexora
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F7FA] mb-5">
                        Technology for the
                        <span className="text-[#38BDF8]"> way you live.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9AA4B2] leading-relaxed">
                        Discover carefully selected tech, accessories, and everyday
                        essentials designed to keep you connected, productive, and ready.
                    </p>

                </section>

                {/* Categories */}
                <section>

                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <p className="text-sm font-medium text-[#38BDF8] mb-1">
                                Explore
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F7FA]">
                                Shop by category
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {categories.map((category, index) => (
                            <div
                                key={category.name}
                                className="animate-[fadeIn_0.6s_ease-out_both]"
                                style={{
                                    animationDelay: `${index * 80}ms`,
                                }}
                            >
                                <CategoryItem category={category} />
                            </div>
                        ))}
                    </div>

                </section>

                {/* Featured Products */}
                {!isLoading && products.length > 0 && (
                    <section className="mt-16">

                        <div className="mb-8">
                            <p className="text-sm font-medium text-[#38BDF8] mb-1">
                                Featured
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F7FA]">
                                Popular right now
                            </h2>

                            <p className="text-[#64748B] mt-2">
                                A selection of products worth taking a closer look at.
                            </p>
                        </div>

                        <FeaturedProducts featuredProducts={products} />

                    </section>
                )}

            </div>
        </div>
    );
};

export default HomePage;