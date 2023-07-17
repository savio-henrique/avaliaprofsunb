import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


import Users from "./components/User/Users";
import Main from "./components/Main";
import Layout from "./components/Layout";
import Login from "./components/Login";
import AuthRequired from "./components/AuthRequired";
import Signup from "./components/User/Signup";
import Logout from "./components/Logout";
import Edit from "./components/User/Edit";

function App() {
  const [login, setLogin] = useState(false)
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3333/users");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLogged={login}/>}>

          <Route index element={<Main isLogged={login} />}/>
          <Route path="login" element={<Login setLogin={setLogin} isLogged={login} />}/>
          <Route path="signup" element={<Signup/>}/>
          <Route element={<AuthRequired isLogged={login}/>}>
            <Route path="users" element={<Users users={users} getUsers={getUsers}/>}/>
            <Route path="user/:id" element={<Edit users={users}/>} />
          </Route>
          <Route path="logout" element={<Logout setLogin={setLogin}/>} />
        </Route>
        
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;