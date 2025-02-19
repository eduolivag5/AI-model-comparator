import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { motion } from "framer-motion";

export default function App() {
    const location = useLocation();

    return (
        <div className="h-[100dvh] flex flex-col">
            <NavBar />
            <div className="flex-1 p-4 md:px-0 md:py-6 w-full max-w-6xl mx-auto flex overflow-auto">
                <motion.div
                    key={location.pathname} // Clave única para animación en cada cambio de ruta
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
}
