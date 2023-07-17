import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired({isLogged}) {
    if (!isLogged){
        return <Navigate to="/login" />
    }
    return (
        <Outlet />
    )
}