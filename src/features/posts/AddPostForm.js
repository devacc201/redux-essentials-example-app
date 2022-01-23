import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'

const AddPostForm = () => {
    // component state
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    // handle the changes from inputs
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const dispatch = useDispatch()
    // Users / author logic
    const users = useSelector(state => state.users)

    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    
    const onSavePostClicked = async () => {
        if ( canSave ) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({title,content,user: userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

        
    }


    const userOptions = users.map(user => {
        return (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    )
    })

    return (
        <section>
            <h2>Add a new Post</h2>
            <form>
                <label
                    htmlFor="postTitle"
                >Post Title</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label
                    htmlFor="postContent"
                >Post Content</label>
                <input 
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />

                <label
                    htmlFor="postAuthor"
                >
                    Author:                    
                </label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                        {userOptions}
                </select>

                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm