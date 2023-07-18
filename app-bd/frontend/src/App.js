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
import Professors from "./components/Professor/Professors";
import CreateProf from "./components/Professor/CreateProf";
import AdminRequired from "./components/AdminRequired";
import EditProf from "./components/Professor/Edit";
import Departments from "./components/Departamento/Grid";
import EditDepto from "./components/Departamento/Edit";
import CreateDepto from "./components/Departamento/Create";

function App() {
  const [login, setLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [professors,setProfs] = useState([]);
  const [departments,setDepartment] = useState([])

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3333/users");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getDepto = async () => {
    try {
      const res = await axios.get("http://localhost:3333/departments");
      setDepartment(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getProfs = async () => {
    try {
      const res = await axios.get("http://localhost:3333/professors");
      setProfs(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getProfs();
    getDepto();
  }, [setUsers,setProfs,setDepartment]);

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLogged={login}/>}>

          <Route index element={<Main isLogged={login} />}/>
          <Route path="login" element={<Login setLogin={setLogin} isLogged={login} setAdmin={setAdmin} />}/>
          <Route path="signup" element={<Signup getUsers={getUsers}/>}/>

          <Route element={<AuthRequired isLogged={login}/>}>
            <Route path="users" element={<Users users={users} getUsers={getUsers} isAdmin={isAdmin}/>}/>
            <Route path="user/:id" element={<Edit users={users}/>} />
            
            <Route path="professors" element={<Professors professors={professors} getProfs={getProfs} isAdmin={isAdmin}/>}/>
            <Route path="departments" element={<Departments departments={departments} getDepto={getDepto} isAdmin={isAdmin}/>}/>
            <Route element={<AdminRequired isAdmin={isAdmin}/>}>
              <Route path="professor/create" element={<CreateProf getProfs={getProfs}/>}/>
              <Route path="professor/:id" element={<EditProf profs={professors}/>}/>

              <Route path="department/create" element={<CreateDepto getDepto={getDepto}/>}/>
              <Route path="department/:id" element={<EditDepto depto={departments}/>}/>
            </Route>
            
          </Route>
          <Route path="logout" element={<Logout setLogin={setLogin} setAdmin={setAdmin}/>} />
        </Route>
        
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;