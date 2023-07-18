import axios from "axios";
import React, { useEffect, useRef} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

const EditDepto = ({ depto }) => {
  const ref = useRef();
  const param = useParams()
  const edit = depto.find(user => user.codigo == param.id)
  
  useEffect(()=> {
    const user = ref.current;

    if (edit){
      user.codigo.value = edit.codigo
      user.nome.value = edit.nome
    }
  },[edit]);  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.codigo.value ||
      !user.nome.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }


    await axios
      .put(`http://localhost:3333/department/${user.codigo.value}`,{
          matricula :user.codigo.value,
          nome:user.nome.value
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    user.codigo.value = "";
    user.nome.value = "";
  };

  return (
    <>
      
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <InputArea>
          <Label>Codigo</Label>
          <Input name="codigo" />
        </InputArea>
        <InputArea>
          <Label>Nome</Label>
          <Input name="nome" />
        </InputArea>
        <Button type="submit">SALVAR</Button>
      </FormContainer>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default EditDepto;