import axios from "axios";
import React, { useRef, useState} from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const Section = styled.section`
    display: flex;
    gap: 10px
`

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

const CreateDepto = ({getDepto}) => {
  const ref = useRef();
  const [signed,setSigned] = useState(false)

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
    .post("http://localhost:3333/department", {
        matricula :user.codigo.value,
        nome:user.nome.value,
    })
    .then(({ data }) => {
        if(data){
            toast.success('Cadastro realizado!')
            setSigned(true)
        } else{
            toast.error('Cadastro não foi realizado!')
        }
    })
    .catch(({ data }) => toast.error(data));

    user.codigo.value = "";
    user.nome.value = "";
    getDepto();
  };
  if(signed){
    return (
        <Navigate to="/departments" />
    )
  }

  return (
    <>
        <FormContainer ref={ref} onSubmit={handleSubmit}>
        <Section>
            <InputArea>
                <Label>Codigo</Label>
                <Input name="codigo" />
            </InputArea>
        </Section>
        <Section>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
        </Section>  
        <Button type="submit">CADASTRAR</Button>
        </FormContainer>
       <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default CreateDepto;