import React from "react";
import { Navigate } from "react-router-dom";

export default function Logout({setLogin}) {
    setLogin(false);
    return <Navigate to="/" />
}