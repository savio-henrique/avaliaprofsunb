import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Navbar from "./Navbar"

export default function AuthRequired({isLogged}) {
    if (!isLogged){
        return <Navigate to="/login" />
    }
    return (
        <Outlet />
    )
}