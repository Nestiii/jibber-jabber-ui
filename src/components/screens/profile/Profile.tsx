import React, {useEffect, useState} from 'react';
import './Profile.scss';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';
import {useHistory, withRouter} from 'react-router-dom';
import {ic_account_circle} from 'react-icons-kit/md/ic_account_circle'
import Icon from 'react-icons-kit';
import axios from 'axios';
import {getConfig, getUsername, url} from '../../../utils';
import {Post} from '../../common/Post/Post';

interface UserProps {
    email: string,
    firstName: string,
    followersCount: number,
    followingCount: number,
    id: string,
    lastName: string,
    username: string,
    following: boolean
}

interface EditableUserProps {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
}

interface PostProps {
    reducedUserDto: { username: string, id: string },
    createdTime: string,
    content: string,
    id: number,
    likes: number,
    dislikes: number
}

const initialUserState = {
    email: '',
    firstName: '',
    followersCount: 0,
    followingCount: 0,
    id: '',
    lastName: '',
    username: '',
    following: false
}

const Profile = () => {

    const history = useHistory();
    const [editing, setEditing] = useState(false);
    const [toDelete, setToDelete] = useState(-1);
    const [user, setUser] = useState<UserProps>({...initialUserState});
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const userId = history.location.search.split('userId')[1]?.replace('=', '')

    const getUser = () => {
        axios.get(url + 'users/by-id/' + userId, getConfig())
            .then((res: { data: UserProps }) => {
                setUser(res.data)
            })
    }

    const handleSave = () => {
        setLoading(true)
        axios.post(url + 'users/edit', {...user}, getConfig())
            .then((res: { data: UserProps }) => {
                setUser(res.data)
                setEditing(false)
                setLoading(false)
            })
    }

    const editPassword = () => {
        axios.post(url + 'users/edit/password', {password}, getConfig())
            .then(() => {
                setPassword('')
                setConfirmPass('')
                setShowEditPassword(false)
            })
    }

    const getPosts = () => {
        axios.get(url + 'post/by-user/' + userId, getConfig())
            .then((res) => {
                setPosts(res.data.posts)
            })
    }

    const follow = () => {
        axios.post(url + 'users/follow/' + user.username,{}, getConfig())
            .then(() => {
                getUser()
            })
    }

    const unfollow = () => {
        axios.post(url + 'users/unfollow/' + user.username,{}, getConfig())
            .then(() => {
                getUser()
            })
    }

    useEffect(() => {
        if (userId) {
            getUser()
            getPosts()
        }
    }, [])

    const handleUserChange = (field: keyof EditableUserProps, value: string) => {
        const temp = {...user};
        temp[field] = value;
        setUser({...temp});
    }

    const deletePost = () => {
        axios.delete(url + 'post/delete/' + toDelete, getConfig())
            .then(() => {
                getPosts()
                setShowDeleteModal(false)
                setToDelete(-1)
            })
    }

    return (
        <div className={'profile'}>
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
            <div className={'profile-card'}>
                <Icon icon={ic_account_circle} style={{color: '#f6cc35', marginBottom: 20}} size={100}/>
                <div className={'followers-container'}>
                    <div className={'follow'}>
                        Followers
                        <span className={'follow-value'}>{' ' + user.followersCount}</span>
                    </div>
                    <div className={'follow'}>
                        Following
                        <span className={'follow-value'}>{' ' + user.followingCount}</span>
                    </div>
                </div>
                {
                    !showEditPassword &&
                    <>
                        <span className={'input-label'}>First name</span>
                        <NeuInput
                            onChange={(e) => handleUserChange('firstName', e.target.value)}
                            value={user.firstName}
                            disabled={!editing}
                        />
                        <span className={'input-label'}>Last name</span>
                        <NeuInput
                            onChange={(e) => handleUserChange('lastName', e.target.value)}
                            value={user.lastName}
                            disabled={!editing}
                        />
                        <span className={'input-label'}>Username</span>
                        <NeuInput
                            onChange={(e) => handleUserChange('username', e.target.value)}
                            value={user.username}
                            disabled={!editing}
                        />
                        <span className={'input-label'}>Email</span>
                        <NeuInput
                            onChange={(e) => handleUserChange('email', e.target.value)}
                            value={user.email}
                            disabled={!editing}
                        />
                    </>
                }
                {
                    getUsername() === user.username && editing && showEditPassword &&
                    <>
                        <span className={'input-label'}>Password</span>
                        <NeuInput
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type={'password'}
                        />
                        <span className={'input-label'}>Confirm password</span>
                        <NeuInput
                            onChange={(e) => setConfirmPass(e.target.value)}
                            value={confirmPass}
                            type={'password'}
                        />
                    </>
                }
                {
                    editing && !showEditPassword &&
                    <div className={'profile-link'} onClick={() => setShowEditPassword(true)}>Change password</div>
                }
                {
                    editing && showEditPassword &&
                    <div className={'profile-link'} onClick={() => {
                        setPassword('')
                        setConfirmPass('')
                        setShowEditPassword(false)
                    }}>Edit profile</div>
                }
                {
                    getUsername() === user.username ?
                        <NeuButton
                            label={editing ? 'Save' : 'Edit'}
                            onClick={() => (editing && !showEditPassword) ? handleSave() : (editing && showEditPassword) ? editPassword() : setEditing(true)}
                            loading={loading}
                            disabled={showEditPassword && (password !== confirmPass || !password || !confirmPass)}
                        /> :
                        <NeuButton
                            label={user.following ? 'Unfollow' : 'Follow'}
                            onClick={() => user.following ? unfollow() : follow()}
                        />
                }
            </div>
            <div className={'posts'}>
                {
                    posts.length > 0 ?
                        posts.map(post =>
                            <Post
                                content={post.content}
                                date={new Date(post.createdTime).toLocaleString()}
                                author={post.reducedUserDto.username}
                                authorId={post.reducedUserDto.id}
                                onDelete={() => {
                                    setToDelete(post.id)
                                    setShowDeleteModal(true)
                                }}
                                likes={post.likes}
                                dislikes={post.dislikes}
                                onLikeAction={() => getPosts()}
                                id={post.id}
                            />
                        ) :
                        <div className={'no-posts'}>User hasn't posted anything yet</div>
                }
            </div>
        </div>
    )
}

export default withRouter(Profile);