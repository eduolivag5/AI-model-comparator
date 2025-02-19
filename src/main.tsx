import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Models from "./pages/Models";

// 📌 Definir el router con App como layout padre
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // 📌 Layout que contiene el NavBar y el Outlet
        children: [
            { path: "", element: <Home /> },
            { path: "models", element: <Models /> },
            { path: "help", element: <Help /> },
            { path: "settings", element: <Settings /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

function AnimatedRoutes() {

    return (
        <AnimatePresence mode="wait">
            <RouterProvider router={router} />
        </AnimatePresence>
    );
}

// 📌 Renderizar la app con RouterProvider
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <HeroUIProvider>
                <AnimatedRoutes />
            </HeroUIProvider>
        </QueryClientProvider>
    </StrictMode>
);
