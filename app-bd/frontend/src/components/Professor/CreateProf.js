import axios from "axios";
import React, { useRef, useState} from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import defaultImage from "./../../images/User-Profile-PNG.png"

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

const CreateProf = ({getProfs}) => {
  const ref = useRef();
  const [signed,setSigned] = useState(false)

  const fileToHex = file => new Promise((resolve,reject) => {
    var fr = new FileReader();
    fr.addEventListener('load', function() {
        var u = new Uint8Array(this.result),
            a = new Array(u.length),
            i = u.length;
        while (i--) // map to hex
            a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16);
        u = null; // free memory
        resolve(a.toString().replaceAll(',',''))
    });
    fr.readAsArrayBuffer(file);
  }) 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    
    var image = await axios.get(defaultImage,{responseType: 'blob'}).then((response)=>{
        var image = new File([response.data],'defaultImage') 
        return image
    })

    if (
      !user.matricula.value ||
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.departamento.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    
    
    var foto = (user.foto.value) ? await fileToHex(user.foto.files[0]) : await fileToHex(image)

    await axios
    .post("http://localhost:3333/professor", {
        matricula :user.matricula.value,
        nome:user.nome.value,
        sobrenome:user.sobrenome.value,
        departamento:user.departamento.value,
        foto:foto,
        status: true
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

    user.matricula.value = "";
    user.nome.value = "";
    user.sobrenome.value = "";
    user.email.value = "";
    user.email_conf.value = "";
    user.curso.value = "";
    user.senha.value = "";
    user.senha_conf.value = "";
    user.foto.value = "";
    getProfs();
  };
  if(signed){
    return (
        <Navigate to="/" />
    )
  }

  return (
    <>
        <FormContainer ref={ref} onSubmit={handleSubmit}>
        <Section>
            <InputArea>
                <Label>Matricula</Label>
                <Input name="matricula" />
            </InputArea>
            <InputArea>
                <Label>Departamento</Label>
                <Input name="departamento" />
            </InputArea>
        </Section>
        <Section>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Sobrenome</Label>
                <Input name="sobrenome" />
            </InputArea>
        </Section>
        <Section>
            <InputArea>
                <Label>Foto</Label>
                <Input name="foto" type="file" />
            </InputArea>
        </Section>
        
        <Button type="submit">CADASTRAR</Button>
        </FormContainer>
       <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default CreateProf;