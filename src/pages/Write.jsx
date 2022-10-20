import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { __addTodos } from '../redux/modules/todosSlice'
import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Layout from '../components/Layout'
import Button from '../elem/button'
import useInput from "../hooks/useInput";

import styled from 'styled-components'
import Swal from 'sweetalert2'

const Write = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialstate = {
        username: "",
        title: "",
        body: "",
    }
    const { inputs: write, onChange, reset } = useInput(initialstate);

    // const [write, setWrite] = useState(initialstate);
    //   const onChangeHandler = (e) => {
    //     const { name, value } = e.target;
    //     setWrite({ ...write, [name]: value });
    //   };
    //   console.log("wt", write);

    const onSubmit = (e) => {
        e.preventDefault();
        if (write.username === "" || write.title === "" || write.body === "") { //바디나 타이틀에 빈칸이 있을때
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '모두 입력해주세요!😥',
            })
        }
        if (write.username.trim() === "" || write.title.trim() === "" || write.body.trim() === "") return;
        // dispatch(onSubmitTodo({ ...todo, id: Date.now() }))
        dispatch(__addTodos({ ...write, id: Date.now() }))
        reset();
        // window.history.back()
        navigate("/");
    }



    return (
        <>
            <Layout>
                <Header />
                <AddForm>
                    <input type="text" name='username' value={write.username} onChange={onChange} placeholder='작성자' />
                    <input type="text" name='title' value={write.title} onChange={onChange} placeholder='제목을 입력해주세요!' />
                    <textarea type="text" name='body' id="inputBody" cols="30" rows="10" value={write.body} onChange={onChange} placeholder='내용을 입력해주세요!' />
                    <Button size="size1" onClick={onSubmit}>추가하기</Button >
                </AddForm>
            </Layout>
        </>


    )
}

export default Write


const AddForm = styled.form`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    min-height: 695px;
    width: 100%;
    height: 100%;
    margin: auto;
    gap: 20px;
    padding: 20px 20px 30px 20px;
    box-shadow: 3px 5px 5px 1px gray;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /* border: 2px solid gray; */
    input{
        
        width: 100%;
        height: 5vh;
        padding: 10px;
        margin-top:30px;
        border: none;
        border-bottom: 2px solid #FDC676;
        font-size: 20px;
        
        
    }
    textarea{
        width: 100%;
        min-height: 167px;
        height: 40vh;
        padding: 10px;
        margin-top: 30px;
        border: none;
        border-bottom: 2px solid #FDC676;
        font-size: 16px;
    }

    @media (max-width: 480px) {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}
`