import React, {useEffect, useState} from 'react';
import './Home.scss';
import {NeuTextBox} from '../../common/TextBox/TextBox';
import {NeuButton} from '../../common/Button/Button';
import {Post} from '../../common/Post/Post';
import axios from 'axios';
import {getConfig, getUsername, url} from '../../../utils';
import {withRouter} from 'react-router';
import {NeuInput} from '../../common/Input/Input';

interface PostProps {
    reducedUserDto: {username: string},
    createdTime: string,
    content: string,
    id: number
}

const Home = () => {

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [content, setContent] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getPosts = () => {
        axios.get(url + 'post/get-all', getConfig())
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
        axios.post(url + 'post/create', {content: content}, getConfig())
            .then(() => {
                getPosts()
                setContent('')
            })
    }

    const deletePost = () => {
        axios.delete(url + 'post/delete/' + toDelete, getConfig())
            .then(() => {
                getPosts()
                setShowDeleteModal(false)
                setToDelete(-1)
            })
    }

    const username = getUsername()

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
                                onClick={() => setShowDeleteModal(false)}
                            />
                            <NeuButton
                                label={'Delete'}
                                onClick={() => deletePost()}
                            />
                        </div>
                    </div>
                </div>
            }
            <div className={'left-panel'}>
                <div className={'create-post'}>Create post</div>
                <NeuTextBox
                    placeholder={'Write your Post here'}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={140}
                    value={content}
                />
                <NeuButton
                    label={'Create'}
                    loading={loading}
                    disabled={!content}
                    onClick={() => createPost()}
                />
                <div className={'create-post find-users'}>Find users</div>
                <NeuInput
                    placeholder={'Enter username'}
                    onChange={(e) => setUserSearch(e.target.value)}
                    maxLength={140}
                    value={userSearch}
                />
                <NeuButton
                    label={'Search'}
                    loading={searchLoading}
                    disabled={!userSearch}
                    onClick={() => null}
                />
            </div>
            <div className={'right-panel'}>
                <div className={'latest-posts'}>Latest posts</div>
                <div className={'posts-container'}>
                    {posts.map(post =>
                        <Post
                            key={post.id}
                            username={username}
                            content={post.content}
                            date={new Date(post.createdTime).toDateString()}
                            author={post.reducedUserDto.username}
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