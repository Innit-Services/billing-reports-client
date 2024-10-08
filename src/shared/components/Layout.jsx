import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Searchbar from "./SearchBar";
import '../../assets/styles/flex.css';
import '../../assets/styles/utils.css';

function Layout(){
    return(
        <> 
            <div className="d-flex column height-100-per">
                <header className="flex-basis-10">
                    <Navbar></Navbar>
                    <Searchbar></Searchbar>
                </header>
                <div className="d-flex flex-basis-90" style={{Border:'2px solid'}}>
                    <div className="flex-basis-10">
                        <Sidebar></Sidebar>
                    </div>
                    <main className="flex-basis-90">
                        <Outlet></Outlet>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout;
