import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getTodos } from "../redux/modules/todosSlice";

import Layout from "../components/Layout";
import Card from "../components/Card";
import Header from "../components/Header";

import styled from "styled-components";
const Main = () => {
  const dispatch = useDispatch();

  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    // window.location.reload()
  }, [])

  useEffect(() => {
    dispatch(__getTodos());
    console.log('hello')
  }, [dispatch]);


  console.log(todos);
  return (
    <Layout>
      <Header />
      <Stodos>
        {todos.length === 0 ?
          <Stack>
            <img className="phoneImage" alt="르탄이1" src="img/르탄이1.png" />
            <h1>현재는 아무것도 없네요!</h1>
          </Stack>
          : <>{todos?.map((todo) => (
            <Card key={todo.id} todo={todo} />
          ))}</>}
      </Stodos>
    </Layout>
  );
};

export default Main;

const Stodos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  background-color: white;

  min-width: 300px;
  min-height: 695px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding-top: 15px;

  box-shadow: 3px 5px 5px 1px gray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    
  }
  &::-webkit-scrollbar-thumb {
    background-color: #FDC676;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #FFE9AD;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  @media (max-width: 480px) {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

`;

const Stack = styled.div`
    display:flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    
    width: 300px;
    height: 325px;
    margin: 80px auto;
    flex-direction: column;

    img{
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
    }
`
