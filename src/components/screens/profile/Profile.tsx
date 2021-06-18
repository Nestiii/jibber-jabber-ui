import React, {useEffect, useState} from 'react';
import './Profile.scss';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';
import {withRouter} from 'react-router-dom';
import {ic_account_circle} from 'react-icons-kit/md/ic_account_circle'
import Icon from 'react-icons-kit';
import axios from 'axios';
import {getConfig, getUsername, url} from '../../../utils';

interface UserProps {
    email: string,
    firstName: string,
    id: string,
    lastName: string,
    username: string
}

const initialUserState = {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    username: ''
}

const Profile = () => {

    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState<UserProps>({...initialUserState});
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true)
        axios.post(url + 'users/edit', {...user}, getConfig())
            .then((res: {data: UserProps}) => {
                setUser(res.data)
                setEditing(false)
                setLoading(false)
            })
    }

    useEffect(() => {
        axios.get(url + 'users/by-username/' + getUsername(), getConfig())
            .then((res: {data: UserProps}) => {
                setUser(res.data)
            })
    }, [])

    const handleUserChange = (field: keyof UserProps, value: string) => {
        const temp = {...user}
        temp[field] = value
        setUser({...temp})
    }

    return (
        <div className={'profile'}>
            <div className={'profile-card'}>
                <Icon icon={ic_account_circle} style={{color: '#f6cc35', marginBottom: 20}} size={100} />
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
                <NeuButton
                    label={editing ? 'Save' : 'Edit'}
                    onClick={() => editing ? handleSave() : setEditing(true)}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default withRouter(Profile);