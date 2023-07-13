import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom"

const Header = styled.header`
    width: 100%;
    max-width: 100 %vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 00px;
`;

export default function Navbar() {
    return (
        <Header>
            <Link to="/">Home</Link>
            <nav>
                <NavLink 
                    to="/login"
                    className={({isActive}) => isActive ? "active-link" : null}
                >
                    Login
                </NavLink>
            </nav>
        </Header>
    )
}