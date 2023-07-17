import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout( {isLogged}) {
    return (
        <div>
            <Navbar isLogged={isLogged}/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}