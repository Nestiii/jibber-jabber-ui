import React, {useEffect, useState} from 'react';
import './Home.scss';
import {NeuTextBox} from '../../common/TextBox/TextBox';
import {NeuButton} from '../../common/Button/Button';
import {Post} from '../../common/Post/Post';
import axios from 'axios';
import {getConfig, getUsername, url} from '../../../utils';
import {useHistory, withRouter} from 'react-router';
import {NeuInput} from '../../common/Input/Input';

interface PostProps {
    reducedUserDto: { username: string, id: string },
    createdTime: string,
    content: string,
    id: number,
    likes: number,
    dislikes: number
}

interface UserProps {
    email: string,
    firstName: string,
    followersCount: number,
    followingCount: number,
    id: string,
    lastName: string,
    username: string,
    following: boolean,
}

const Home = () => {

    const history = useHistory()
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [users, setUsers] = useState<UserProps[]>([]);
    const [content, setContent] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getPosts = () => {
        axios.get(url + 'post/get-all', getConfig())
            .then((res: { data: { posts: PostProps[] } }) => {
                setPosts([...res.data.posts])
                setLoading(false)
            })
    }

    const getUsers = () => {
        axios.get(url + 'users/get-users', getConfig())
            .then((res: { data: { users: UserProps[] } }) => {
                setUsers([...res.data.users])
            })
    }

    useEffect(() => {
        getUsers()
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

    const follow = (username: string) => {
        axios.post(url + 'users/follow/' + username, {}, getConfig())
            .then(() => {
                getPosts()
                getUsers()
            })
    }

    const unfollow = (username: string) => {
        axios.post(url + 'users/unfollow/' + username, {}, getConfig())
            .then(() => {
                getPosts()
                getUsers()
            })
    }

    const filerUsers = () =>
        users.filter(user => user.username.toLowerCase().includes(userSearch.toLowerCase()) && user.username !== getUsername())

    const sortPosts = () =>
        posts.sort((a, b) => {
            if (new Date(a.createdTime) > new Date(b.createdTime)) return -1;
            if (new Date(a.createdTime) < new Date(b.createdTime)) return 1;
            return 0
        })

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
                <div className={'users-container'}>
                    {
                        users.length > 0 &&
                            filerUsers().map(user =>
                                <div className={'user'} key={user.id}>
                                    <div className={'user-info'}>
                                        <span
                                            onClick={() => history.push('profile?userId=' + user.id)}
                                            className={'username'}
                                        >
                                            {user.username}
                                        </span>
                                        <span className={'full-name'}>{user.firstName + ' ' + user.lastName}</span>
                                    </div>
                                    <div className={'follow'} onClick={() => user.following ? unfollow(user.username) : follow(user.username)}>
                                        {user.following ? 'Unfollow' : 'Follow'}
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className={'right-panel'}>
                <div className={'latest-posts'}>Latest posts</div>
                <div className={'posts-container'}>
                    {sortPosts().map(post =>
                        <Post
                            key={post.id}
                            content={post.content}
                            date={new Date(post.createdTime).toLocaleString()}
                            author={post.reducedUserDto.username}
                            authorId={post.reducedUserDto.id}
                            onDelete={() => {
                                setToDelete(post.id)
                                setShowDeleteModal(true)
                            }}
                            id={post.id}
                            dislikes={post.dislikes}
                            likes={post.likes}
                            onLikeAction={() => getPosts()}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);