import axios from "axios";
import React, { useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from "buffer";

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

const Image = styled.img`
  max-height: 200px;
`;

const EditProf = ({ profs }) => {
  const ref = useRef();
  const param = useParams()
  const [image, setImage] = useState(null)
  const edit = profs.find(user => user.matricula == param.id)
  
  useEffect(()=> {
    const user = ref.current;

    if (edit){
      user.matricula.value = edit.matricula
      user.nome.value = edit.nome
      user.sobrenome.value = edit.sobrenome
      user.departamento.value = edit.departamento
      
      async function getImage(){
        var img = new Buffer.from(edit.foto.data,'binary').toString('base64')
  
        var file = await dataURLtoFile('data:text/plain;base64,' + img,'hexstring.txt').text()
        var text = new Buffer.from(file,'hex').toString('base64')
        setImage('data:image/png;base64,' + text)
      }
      
      getImage()
    }
  },[edit,setImage]);  

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[arr.length - 1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.matricula.value ||
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.departamento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }


    await axios
      .put(`http://localhost:3333/professor/${user.matricula.value}`,{
          matricula :user.matricula.value,
          nome:user.nome.value,
          sobrenome:user.sobrenome.value,
          departamento:user.departamento.value,
          foto:edit.foto,
          status: true
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    user.matricula.value = "";
    user.nome.value = "";
    user.sobrenome.value = "";
    user.departamento.value = "";
    user.foto.value = "";
  };

  return (
    <>
      
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <Image src={image} />
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
          <Label>Departamento</Label>
          <Input name="departamento" />
        </InputArea>
        <InputArea>
          <Label>Foto</Label>
          <Input name="foto" type="file" />
        </InputArea>
        <Button type="submit">SALVAR</Button>
      </FormContainer>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};

export default EditProf;