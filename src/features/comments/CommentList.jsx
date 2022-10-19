import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { __getComments } from '../../redux/modules/commentListSlice'

import Comment from '../comments/Comment'
import styled from 'styled-components'

const CommentList = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { comments } = useSelector(state => state.commentList)
    console.log("cm", comments)
    console.log("id", id)


    useEffect(() => {
        dispatch(__getComments())
    }, [dispatch])





    return (
        <CommentWrap>
            {comments.map((comment) => comment.todoId === Number(id) ? <Comment key={comment.id} comment={comment}>댓글</Comment> : "")}
        </CommentWrap>
    )
}

export default CommentList

const CommentWrap = styled.div`
    height:300px;
`