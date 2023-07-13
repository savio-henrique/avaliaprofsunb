import React from "react";
// import styled from "styled-components";
import { Link, NavLink } from "react-router-dom"


export default function Main() {
    return (
        <div>
            <h1> Sistema de Gerenciamento de Mensagens</h1>
            <NavLink to="/users">
                Usuários
            </NavLink>
        </div>
    )
}