import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import "./App.css";

interface AppContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType>({
    theme: "light",
    setTheme: () => {},
});

const AppProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<string>(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme ? storedTheme : "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <AppContext.Provider value={{ theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/home/create" element={<CreatePage />} />
                </Routes>
            </AppProvider>
        </BrowserRouter>
    );
};

export default App;
