import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Main from "./components/Main";
import Layout from "./components/Layout";
import Login from "./components/Login";
import AuthRequired from "./components/AuthRequired";
import Signup from "./components/Signup";

function App() {
  const [login, setLogin] = useState(false)

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Main />}/>
          <Route path="login" element={<Login setLogin={setLogin}/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route element={<AuthRequired isLogged={login}/>}>
            <Route path="users" element={<Users />}/>
          </Route>
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;