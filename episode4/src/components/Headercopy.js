import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "./useonlinestatus";
import { useSelector } from "react-redux"; 
import { HomeIcon, CartIcon, SunIcon, MoonIcon } from "./Icons";



function Header() {
     const [btnname,setbtnname]=useState("login");
     const onlinestatus=useOnlineStatus();
     const [theme,setTheme]=useState(() => {
         try {
             const stored = localStorage.getItem('theme');
             if (stored) return stored;
         } catch (e) {}
         return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
     });

     useEffect(() => {
         const root = document.documentElement;
         if (theme === 'dark') {
             root.classList.add('dark');
         } else {
             root.classList.remove('dark');
         }
         try { localStorage.setItem('theme', theme); } catch(e){}
     }, [theme]);

    const cart=useSelector((store)=>store.cart);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-lg shadow-slate-200 dark:shadow-slate-800 mb-2">
            

            <div className="flex items-center gap-2">
                <img src="https://penji.co/wp-content/uploads/2022/08/10.-mr.-d-food-logo.jpg.webp" alt="logo" className="w-[120px] " />
                <h1 className="brand-title">Mr. food</h1>
            </div>

            <nav className=" bg-gray-400 rounded-md">
                <button
                    className="md:hidden p-2 mr-2 rounded bg-gray-200 dark:bg-slate-700"
                    onClick={() => setMenuOpen((s) => !s)}
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>

                <ul className={`p-4 items-center gap-2 ${menuOpen ? 'flex flex-col md:flex md:flex-row' : 'hidden md:flex'}`}>
                    <li className=" px-3 flex items-center gap-2 text-sm">
                        <span>{onlinestatus ? "✅" : "❌"}</span>
                        <span className="hidden sm:inline">Online</span>
                    </li>
                    <li className=" px-3 flex items-center gap-2">
                         <HomeIcon className="w-4 h-4" /> <Link to="/">Home</Link></li>
                    <li className=" px-3 flex items-center gap-2">
                        <Link to="/about">About</Link></li>
                    <li className=" px-3 flex items-center gap-2">
                        <Link to="/contact">Contact</Link></li>
                    <li className=" px-3 flex items-center gap-2">
                        <Link to="/grocery">Grocery</Link></li>
                    <li className=" px-3 flex items-center gap-2">
                        <Link to="/cart"> <CartIcon className="w-4 h-4" /> Cart({cart.items.length})</Link></li>
                </ul>
            </nav>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                    className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-sm flex items-center gap-2"
                >
                    {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />} 
                    <span className="sr-only">Toggle theme</span>
                </button>
            </div>
                <div className="flex  p-4 px-4 pl-4 bg-blue-500 rounded-lg">
                <button className="login-btn" onClick={() => {
                    if (btnname === "logout") {
                        setbtnname("login");
                    } else {
                        setbtnname("logout");
                    }
                }}>{btnname}</button>
            </div>
        </header>
    );
}
export default Header;
//only export one thing
//for multiple exports use named exports
//for importing named exports use curly braces
//import {x,y} from "module"