import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

const AddPostForm = () => {
    // component state
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    // handle the changes from inputs
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const dispatch = useDispatch()
    // Users / author logic
    const users = useSelector(state => state.users)

    console.log(users)
    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = () => {
        if ( title && content ) {
            dispatch(
                postAdded(
                    title,
                    content,
                    userId
                )
            )
        }

        setTitle('')
        setContent('')
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

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