import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();

    return (
        <header className="fixed top-0 left-0 w-full bg-[#080B12]/95 backdrop-blur-xl shadow-lg shadow-black/20 z-40 border-b border-[#1E293B]">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-wrap justify-between items-center gap-4">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#38BDF8] transition-all duration-300 hover:text-[#7DD3FC]"
                    >
                        Nexora
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-wrap items-center gap-2 sm:gap-4">

                        {/* Home */}
                        <Link
                            to="/"
                            className="px-2 py-2 text-sm sm:text-base text-[#9AA4B2] hover:text-[#38BDF8] transition-all duration-300"
                        >
                            Home
                        </Link>

                        {/* Cart */}
                        {user && (
                            <Link
                                to="/cart"
                                className="relative group flex items-center px-2 py-2 text-sm sm:text-base text-[#9AA4B2] hover:text-[#38BDF8] transition-all duration-300"
                            >
                                <ShoppingCart
                                    className="inline-block mr-1.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                                    size={19}
                                />

                                <span className="hidden sm:inline">
                                    Cart
                                </span>

                                {cart.length > 0 && (
                                    <span
                                        className="absolute -top-1 -right-2 min-w-[19px] h-[19px] px-1 flex items-center justify-center bg-[#38BDF8] text-[#080B12] font-bold rounded-full text-[11px] transition-transform duration-300 group-hover:scale-110"
                                    >
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Admin Dashboard */}
                        {isAdmin && (
                            <Link
                                to="/secret-dashboard"
                                className="flex items-center gap-1.5 bg-[#121824] hover:bg-[#182131] border border-[#1E293B] hover:border-[#38BDF8]/40 text-[#38BDF8] px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <Lock size={17} />

                                <span className="hidden sm:inline">
                                    Dashboard
                                </span>
                            </Link>
                        )}

                        {/* Logged In */}
                        {user ? (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 bg-[#121824] hover:bg-[#182131] border border-[#1E293B] hover:border-[#38BDF8]/30 text-[#F5F7FA] py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <LogOut size={17} />

                                <span className="hidden sm:inline">
                                    Log Out
                                </span>
                            </button>
                        ) : (
                            <>
                                {/* Sign Up */}
                                <Link
                                    to="/signup"
                                    className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#080B12] font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10"
                                >
                                    <UserPlus size={17} />

                                    <span>
                                        Sign Up
                                    </span>
                                </Link>

                                {/* Login */}
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 bg-[#121824] hover:bg-[#182131] border border-[#1E293B] hover:border-[#38BDF8]/40 text-[#F5F7FA] py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <LogIn size={17} />

                                    <span>
                                        Log In
                                    </span>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;