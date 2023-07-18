import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const TagName = ({isAdmin}) => {
    if (isAdmin){
      return (
        <>
          <Th></Th>
          <Th></Th>
        </>
      )
    }else{
      return
    }
  }
  
  const AdminLevel = ({isAdmin, handleDelete, handleEdit, item}) =>{
    if (isAdmin){
      return (
        <>
          <Td alignCenter width="5%">
            <FaEdit onClick={() => handleEdit(item)} />
          </Td>
          <Td alignCenter width="5%">
            <FaTrash onClick={() => handleDelete(item.matricula)} />
          </Td>
        </>
      )
    }else{
      return
    }
  
  }

const CreateButton = ({isAdmin}) => {
    if (isAdmin){
        return <NavLink to="/professor/create"><Button>Create</Button></NavLink>
    }
} 

const Professors = ({ professors , getProfs, isAdmin}) => {
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/professor/${item.matricula}`)
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3333/professor/" + id)
      .then(({ data }) => {
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

      getProfs();
  };

  return (
    <Container>
        <Title>PROFESSORES</Title>
        <Table>
        <Thead>
            <Tr>
            <Th>Matricula</Th>
            <Th>Nome</Th>
            <Th onlyWeb>Departamento</Th>
            <TagName isAdmin={isAdmin} />
            </Tr>
        </Thead>
        <Tbody>
            {professors.map((item, i) => (
            <Tr key={i}>
                <Td width="30%">{item.matricula}</Td>
                <Td width="30%">{item.nome +" "+ item.sobrenome}</Td>
                <Td width="30%" onlyWeb>
                {item.departamento}
                </Td>
                <AdminLevel isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} item={item} />
            </Tr>
            ))}
        </Tbody>
        </Table>
        <CreateButton isAdmin={isAdmin}/>
    </Container>
  );
};

export default Professors;