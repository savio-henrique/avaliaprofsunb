import React from "react";
import { Navigate } from "react-router-dom";

export default function Logout({setLogin, setAdmin}) {
    setLogin(false);
    setAdmin(false);
    return <Navigate to="/" />
}