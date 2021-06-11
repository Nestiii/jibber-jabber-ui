import React, {useEffect, useState} from 'react';
import './Home.scss';
import {NeuInput} from '../common/Input/Input';
import {NeuTextBox} from '../common/TextBox/TextBox';
import {NeuButton} from '../common/Button/Button';
import {Post} from '../common/Post/Post';
import axios from 'axios';
import {url} from '../../constants';
import {withRouter} from 'react-router';

interface PostProps {
    createdBy: string,
    createdTime: string,
    content: string,
    id: number
}


const Home = () => {

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [toDelete, setToDelete] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getPosts = () => {
        axios.get(url + 'post/get-all')
            .then((res: { data: { posts: PostProps[] } }) => {
                setPosts([...res.data.posts])
                setLoading(false)
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    const createPost = () => {
        setLoading(true)
        axios.post(url + 'post/create', {content: content, createdBy: author})
            .then(() => {
                getPosts()
                setContent('')
                setAuthor('')
            })
    }

    const deletePost = () => {
        axios.delete(url + 'post/delete/' + toDelete).then(() => getPosts())
    }

    return (
        <div className={'home'}>
            {
                showDeleteModal &&
                <div className={'modal-container'}>
                    <div className={'modal'}>
                        <div className={'modal-text'}>Are you sure you want to delete this post?</div>
                        <div className={'modal-buttons'}>
                            <NeuButton
                                label={'Cancel'}
                                // @ts-ignore
                                onClick={() => setShowDeleteModal(false)}
                            />
                            <NeuButton
                                label={'Delete'}
                                // @ts-ignore
                                onClick={() => {
                                    deletePost()
                                    setShowDeleteModal(false)
                                }}
                            />
                        </div>
                    </div>
                </div>
            }
            <div className={'left-panel'}>
                <div className={'create-post'}>Create post</div>
                <NeuInput
                    placeholder={'Created by'}
                    onChange={(e) => setAuthor(e.target.value)}
                    maxLength={20}
                    value={author}
                />
                <NeuTextBox
                    placeholder={'Write your Post here'}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={140}
                    value={content}
                />
                <NeuButton
                    label={'Create'}
                    loading={loading}
                    disabled={!author || !content}
                    onClick={() => createPost()}
                />
            </div>
            <div className={'right-panel'}>
                <div className={'latest-posts'}>Latest posts</div>
                <div className={'posts-container'}>
                    {posts.map(post =>
                        <Post
                            key={post.id}
                            content={post.content}
                            date={new Date(post.createdTime).toDateString()}
                            author={post.createdBy}
                            onDelete={() => {
                                setToDelete(post.id)
                                setShowDeleteModal(true)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);