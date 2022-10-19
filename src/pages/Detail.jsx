import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import AddCommentForm from '../features/comments/AddCommentForm'
import CommentList from '../features/comments/CommentList'
import Button from '../elem/button'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __deleteTodos, __editTodos, __getTodos } from '../redux/modules/todosSlice';

/** CSS */
import styled from 'styled-components'
import { FcFullTrash, FcSettings, FcCancel } from "react-icons/fc";
import Swal from 'sweetalert2'


const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const { id } = useParams()
    const { todos } = useSelector((state) => state.todos)
    const todo = todos.find((todo) => todo.id === +id)

    const [isEdit, setIsEdit] = useState(false)

    const [editTodo, setEditTodo] = useState({
        title: todo?.title,
        body: todo?.body
    })


    useEffect(() => {
        dispatch(__getTodos())
    }, [dispatch])

    const onEditHandler = (e) => {
        e.preventDefault()
        if (editTodo.title === "" || editTodo.body === "") { //바디나 타이틀에 빈칸이 있을때
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '모두 입력해주세요!😥',
            })
        }
        if (editTodo.title.trim() === "" || editTodo.body.trim() === "") return;
        dispatch(__editTodos({ ...todo, ...editTodo }))
        setIsEdit(false)
    }

    const onDeleteHandler = (e) => {

        e.stopPropagation();
        Swal.fire({
            title: '삭제할까요?',
            text: '댓글을 삭제 하겠시겠어요?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(__deleteTodos(todo.id))
                Swal.fire(
                    '삭제 완료!',
                    '댓글이 삭제 되었어요!',
                    'success'
                )
                setTimeout(() => {
                    navigate("/")
                }, 200);

            }
        })

    }



    return (
        <>
            <Layout>
                <Header />
                <DetailBox>
                    <BtnBox>
                        <div>User Name: {todo?.username} </div>
                        <div>
                            <Button size="size2" onClick={() => setIsEdit(prev => !prev)}>{isEdit ? <FcCancel className='btnIcon' /> : <FcSettings className='btnIcon' />}</Button>
                            <Button size="size2" onClick={onDeleteHandler}><FcFullTrash className='btnIcon' /></Button>
                        </div>
                    </BtnBox>

                    {!isEdit ?
                        <TextBox>
                            <h1>{todo?.title}</h1>
                            <p>{todo?.body}</p>
                        </TextBox> : null}

                    {isEdit ?
                        <FormBox>
                            <input type="text" value={editTodo.title} onChange={(e) => { setEditTodo({ ...editTodo, title: e.target.value }) }} />
                            <textarea type="text" value={editTodo.body} onChange={(e) => { setEditTodo({ ...editTodo, body: e.target.value }) }} />
                            <button onClick={onEditHandler}>저장</button>
                        </FormBox> : null}
                    <h3>Reply🧡</h3>
                    <br />
                    <AddCommentForm />
                    <CommentWrap>
                        <br />

                        <CommentList />
                    </CommentWrap>
                </DetailBox>

            </Layout>
        </>
    )
}

export default Detail

const DetailBox = styled.div`
    background-color: white;
    min-width: 300px;
    min-height: 695px;
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 20px 20px 20px 20px;
    box-shadow: 3px 5px 5px 1px gray;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    @media (max-width: 480px) {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}
`

const BtnBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btnIcon {
        font-size:20px;
    }
`

const TextBox = styled.div`
    /* background-color: gray; */
    height: 200px;
    margin: 20px auto;
    h1{
        font-size: 28px;
        margin-bottom: 50px;
    }
    p{
        font-size:20px;
    }
`

const CommentWrap = styled.div`
    height:310px;
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
`

const FormBox = styled.form`
    display:flex;
    flex-direction: column;
    margin-top: 20px;
    input{
        font-size:28px;
        height:35px;
        padding-left: 5px;
        padding-bottom: 5px;
        border: none;
        border-bottom: 2px solid #FDC676;
        border-right: 2px solid #FDC676;
        margin-bottom: 35px;
        

    }
    textarea{
        height:100px;
        font-size:20px;
        padding: 8px;
        border: none;
        border-bottom: 2px solid #FDC676;
        border-right: 2px solid #FDC676;
    }
    button{
        background-color: #FDC676;
        min-width: 30px;
        min-height:30px;
        width: 13%;
        height: 10%;
        border-radius: 5px;
        border: none;
        margin: 10px auto;
        &:hover{
        background-color: #f7be67;
    }
    }
`