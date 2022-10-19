import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import Swal from 'sweetalert2';
import { __addComments } from '../../redux/modules/commentListSlice';

const AddCommentForm = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const initialstate = {
        content: "",
        id: 0,
        todoId: +id,
    }

    const [comment, setComment] = useState(initialstate);

    const onSubmitComment = (e) => {
        e.preventDefault();
        if (comment.content === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '빈칸을 입력해주세요!😥',
            })
        }
        if (comment.content.trim() === "") return;
        dispatch(__addComments({ ...comment, id: Date.now() }))
        setComment(initialstate)
    }


    return (
        <CommentInputBox>
            <input type="text" value={comment.content} placeholder='댓글을 작성해주세요!' onChange={(e) => setComment({ ...comment, content: e.target.value })}></input>
            <button onClick={onSubmitComment}>추가하기</button>
        </CommentInputBox>
    )
}

export default AddCommentForm

const CommentInputBox = styled.form`
    display:flex;
    justify-content: space-between;
    align-items: center;
    
    input{
        width:70%;
        height:30px;
        border: none;
        border-bottom: 2px solid #FDC676;
        font-size: 16px;
        padding-bottom: 5px;
    }
    button{
        background-color: #FDC676;
        min-width: 30px;
        min-height:25px;
        width: 23%;
        height: 5%;
        border-radius: 5px;
        border: none;
        &:hover{
        background-color: #f7be67;
    }
    }
`