import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { __deleteComments, __editComments } from '../../redux/modules/commentListSlice'
import Button from '../../elem/button'


import styled from 'styled-components'
import Swal from 'sweetalert2'
import { FcCheckmark, FcCancel, FcEditImage, FcFullTrash, FcIphone } from "react-icons/fc";

const Comment = ({ comment }) => {

    const dispatch = useDispatch()

    const [isEdit, setIsEdit] = useState(false)
    const [editComment, setEditComment] = useState({
        content: comment.content
    })

    const onCommentEdit = (e) => {
        e.preventDefault()
        if (editComment.content === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '모두 입력해주세요!😥',
            })
        }
        // if (editComment.content.trim() === "") return;
        dispatch(__editComments({ ...comment, ...editComment }))
        setIsEdit(false)

    }

    const onCommentDelete = () => {
        dispatch(__deleteComments(comment.id))
    }

    function displayedAt(createdAt) {
        console.log(createdAt)
        const milliSeconds = new Date() - createdAt
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        return `${Math.floor(years)}년 전`
    }

    return (
        <CommentBox>
            <FcIphone style={{ fontSize: "35px" }} className='btnIcon' />
            {!isEdit ? <TextBox><p>{comment.content}</p><p>{displayedAt(comment.id)}</p></TextBox> :
                <FormBox>
                    <input type="text" value={editComment.content} onChange={(e) => { setEditComment({ ...editComment, content: e.target.value }) }} />
                    <Button id="inpBox" size="size3" onClick={onCommentEdit}><FcCheckmark className='btnIcon' /></Button>
                </FormBox>}
            <Button size="size3" onClick={() => setIsEdit(prev => !prev)}>{isEdit ? <FcCancel className='btnIcon' /> : <FcEditImage className='btnIcon' />}</Button>
            {!isEdit ? <Button size="size3" onClick={(e) => {
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
                        onCommentDelete()
                        Swal.fire(
                            '삭제 완료!',
                            '댓글이 삭제 되었어요!',
                            'success'
                        )
                    }
                })
            }

            }
            ><FcFullTrash className='btnIcon' /></Button> : null}
        </CommentBox>
    )
}

export default Comment

const CommentBox = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    margin-bottom: 10px;

    .btnIcon {
        font-size:20px;
    }
    
`
const TextBox = styled.div`
    /* background-color: orange; */
    display:flex;
    justify-content:space-between;
    margin-right: 20px;
    max-width:250px;
    width:100%;
    height:15px;
    
    font-size: 15px;
    padding-bottom: 20px;
   
    border: none;
    border-bottom: 1px solid #FDC676;

`
const FormBox = styled.form`
    display: flex;
    align-items: center;
    
    input{
        max-width:354px;
        width:255px;
        height:23px;
        font-size: 15px;
        padding-bottom: 2px;
        border: none;
        border-bottom: 1px solid #FDC676;
        border-right: 1px solid #FDC676;
    }
    #inpBox{
        margin-left: 25px;
        width: 54px;
        @media (max-width: 480px) {
            width:30px;
    }
    }
`