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

const Nav = styled.nav`
    display: flex;
    gap: 20px;
`;

const LoggedButtons = ({isLogged}) => {
    if (isLogged){
        return (
            <NavLink to="/users">Usuários</NavLink>
        )
    }
}

const LogButton = ( {isLogged}) => {
    if (!isLogged){
        return (
            <NavLink 
            to="/login"
            className={({isActive}) => isActive ? "active-link" : null}>
                Login
            </NavLink>
        )
    }else{
        return (
            <NavLink 
                to="/logout"
                className={({isActive}) => isActive ? "active-link" : null}
            >
                Logout
            </NavLink>
        )
    }
}

export default function Navbar( {isLogged} ) {
    return (
        <Header>
            <Link to="/">Home</Link>
            <Nav>
                <LoggedButtons isLogged={isLogged} />
                <LogButton isLogged={isLogged} />
            </Nav>
        </Header>
    )
}