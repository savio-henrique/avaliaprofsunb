import axios from "axios";
import React, { useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
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

const Edit = ({ users }) => {
  const ref = useRef();
  const param = useParams()
  console.log(param.id)
  const edit = users.find(user => user.matricula === param.id)
  
  useEffect(()=> {
    const user = ref.current;

    if (edit){
      user.matricula.value = edit.matricula
      user.nome.value = edit.nome
      user.sobrenome.value = edit.sobrenome
      user.email.value = edit.email
      user.curso.value = edit.curso
    }
  }
    ,[edit]);  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.matricula.value ||
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.email.value ||
      !user.curso.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }


    await axios
      .put(`http://localhost:3333/user/${user.matricula.value}`,{
          matricula :user.matricula.value,
          nome:user.nome.value,
          sobrenome:user.sobrenome.value,
          email:user.email.value,
          curso:user.curso.value,
          senha:edit.senha,
          foto:edit.foto,
          status: true
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    user.matricula.value = "";
    user.nome.value = "";
    user.sobrenome.value = "";
    user.email.value = "";
    user.curso.value = "";
    user.senha.value = "";
    user.foto.value = "";
  };

  return (
    <>
      
      <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
          <Label>Matricula</Label>
          <Input name="matricula" />
        </InputArea>
        <InputArea>
          <Label>Nome</Label>
          <Input name="nome" />
        </InputArea>
        <InputArea>
          <Label>Sobrenome</Label>
          <Input name="sobrenome" />
        </InputArea>
        <InputArea>
          <Label>E-mail</Label>
          <Input name="email" type="email" />
        </InputArea>
        <InputArea>
          <Label>Curso</Label>
          <Input name="curso" />
        </InputArea>
        <InputArea>
          <Label>Foto</Label>
          <Input name="foto" type="file" />
        </InputArea>
        <Button type="submit">SALVAR</Button>
      </FormContainer>
    </>
  );
};

export default Edit;