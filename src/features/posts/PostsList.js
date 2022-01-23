import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'
import { selectAllPosts, fetchPosts } from './postsSlice'

import { Spinner } from '../../components/Spinner'

const postExcerpt = ({post}) => {
    return (
        <article
            className="post-excerpt"
            key={post.id}
        >
            <h3>{ post.title }</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">
                {post.content.substring(0,100)}
            </p>
            <ReactionButtons 
                post={post}
            />
            <Link 
                to={`/posts/${post.id}`}
                className="button muted-button"
            >
                View Post
            </Link>
        </article>
    )
}

const PostsList = () => {
    // coming from store > postsSlice => initialState
    const posts = useSelector(selectAllPosts)

    const dispatch =  useDispatch()
    // getting the status from global state
    const postStatus = useSelector(state => state.posts.status)
    // gettitn the error from global state
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    },[postStatus, dispatch])


    let content
    if (postStatus === 'loading') {
        content = <Spinner text="loading..." />
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    } else if (postStatus === 'failed') {
        content = <div>Error</div>
    }


    const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map((post) => {
        
    return (
            <article
                className="post-excerpt"
                key={post.id}
            >
                <h3>{post.title}</h3>

                <div>
                    <PostAuthor userId={post.user}/>
                    <p>{post.date}</p>
                    <TimeAgo timestamp={post.date}/>
                </div>

                <p
                    className="post-content"
                >
                    {post.content}
                </p>

                <ReactionButtons post={post} />

                <Link to={`/posts/${post.id}`} className="button muted-button">
                    View Post
                </Link>
            </article>
        )
    })

    return (
        <section
            className="posts-list"
        >
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList