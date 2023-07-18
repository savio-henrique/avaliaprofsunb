import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

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

const Users = ({users, getUsers , isAdmin}) => {
 
  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Grid users={users} getUsers={getUsers} isAdmin={isAdmin} />
      </Container>
    </>
  );
}

export default Users;