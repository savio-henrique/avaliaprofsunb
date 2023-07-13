import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Login = ({ setLogin}) => {
  const ref = useRef();
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.matricula.value = onEdit.matricula;
      user.senha.value = onEdit.senha;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    
    if (
      !user.matricula.value ||
      !user.senha.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (onEdit) {
        await axios
        .post("http://localhost:3333/auth/",{
            matricula :user.matricula.value,
            senha:user.senha.value
        })
        .then(({ data }) => {
            console.log(data)
            toast.success(data)
        })
        .catch(({ data }) => toast.error(data));
        setLogin(true)
    }

    user.matricula.value = "";
    user.senha.value = "";
    setOnEdit(null);
    };

  return (
    <>
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Matricula</Label>
                <Input name="matricula" />
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name="senha" />
            </InputArea>
            <Button type="submit">LOGIN</Button>
            <NavLink to="/signup"><Button>Sign In</Button></NavLink>
        </FormContainer>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default Login;