import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AdminRequired({isAdmin}) {
    if (!isAdmin){
        return <Navigate to="/" />
    }
    return (
        <Outlet />
    )
}