import React, {useEffect, useState} from 'react';
import './App.scss';
import {NeuButton} from './components/common/Button/Button';
import {Post} from './components/post/Post';
import {NeuInput} from './components/common/Input/Input';
import {NeuTextBox} from './components/common/TextBox/TextBox';
import axios from 'axios';

interface PostProps {
    createdBy: string,
    createdTime: string,
    content: string,
    id: number
}

const url = 'http://localhost:8080/'

const App = () => {

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [toDelete, setToDelete] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getPosts = () => {
        axios.get(url + 'post/get-all')
            .then((res: {data: {posts: PostProps[]}}) => {
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
        <div className={'body'}>
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
            <div className={'app-header'}>
                Jibber Jabber
            </div>
            <div className={'app-body'}>
                <div className={'left-panel'}>
                    <div className={'create-post'}>Create post</div>
                    <NeuInput
                        placeholder={'Created by'}
                        onChange={(e) => setAuthor(e.target.value)}
                        maxLength={20}
                        value={author}
                    />
                    <NeuTextBox
                        placeholder={'Write your post here'}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={140}
                        value={content}
                    />
                    <NeuButton
                        label={'Create'}
                        loading={loading}
                        disabled={!author || !content}
                        // @ts-ignore
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
        </div>
    );
}

export default App;
