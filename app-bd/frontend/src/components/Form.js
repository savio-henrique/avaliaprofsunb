import axios from "axios";
import React, { useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

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

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.matricula.value = onEdit.matricula;
      user.nome.value = onEdit.nome;
      user.sobrenome.value = onEdit.sobrenome;
      user.email.value = onEdit.email;
      user.curso.value = onEdit.curso;
    }
  }, [onEdit]);

  const fileToHex = file => new Promise((resolve,reject) => {
    var fr = new FileReader();
    fr.addEventListener('load', function() {
        var u = new Uint8Array(this.result),
            a = new Array(u.length),
            i = u.length;
        while (i--) // map to hex
            a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16);
        u = null; // free memory
        console.log(a); // work with this
        resolve(a.toString().replaceAll(',',''))
    });
    fr.readAsArrayBuffer(file);
  }) 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    
    if (
      !user.matricula.value ||
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.email.value ||
      !user.curso.value ||
      !user.senha.value ||
      !user.foto.value ||
      !user.status.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    var foto = await fileToHex(user.foto.files[0])
    console.log(foto)

    if (onEdit) {
      await axios
        .put("http://localhost:3333/user/" + onEdit.id, {
            matricula :user.matricula.value,
            nome:user.nome.value,
            sobrenome:user.sobrenome.value,
            email:user.email.value,
            curso:user.curso.value,
            senha:user.senha.value,
            foto:foto,
            status:user.status.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3333/user", {
            matricula :user.matricula.value,
            nome:user.nome.value,
            sobrenome:user.sobrenome.value,
            email:user.email.value,
            curso:user.curso.value,
            senha:user.senha.value,
            status:user.status.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.matricula.value = "";
    user.nome.value = "";
    user.sobrenome.value = "";
    user.email.value = "";
    user.curso.value = "";
    user.senha.value = "";
    user.foto.value = "";
    user.status.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
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
        <Label>Senha</Label>
        <Input name="senha" />
      </InputArea>
      <InputArea>
        <Label>Foto</Label>
        <Input name="foto" type="file" />
      </InputArea>
      <InputArea>
        <Label>Status</Label>
        <Input name="status" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;