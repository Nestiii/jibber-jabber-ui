import React, {useState} from 'react';
import './Profile.scss';
import {NeuInput} from '../common/Input/Input';
import {NeuButton} from '../common/Button/Button';
import {withRouter} from 'react-router-dom';
import {ic_account_circle} from 'react-icons-kit/md/ic_account_circle'
import Icon from 'react-icons-kit';

const Profile = () => {

    const [editing, setEditing] = useState(false);
    const [userName, setUserName] = useState('User6543');
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@gmail.com');

    const handleSave = () => {
        setEditing(false)
    }

    return (
        <div className={'profile'}>
            <div className={'profile-card'}>
                <Icon icon={ic_account_circle} style={{color: '#f6cc35', marginBottom: 20}} size={100} />
                <span className={'input-label'}>User name</span>
                <NeuInput
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    disabled={!editing}
                />
                <span className={'input-label'}>Name</span>
                <NeuInput
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={!editing}
                />
                <span className={'input-label'}>Email</span>
                <NeuInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={!editing}
                />
                <NeuButton
                    label={editing ? 'Save' : 'Edit'}
                    //@ts-ignore
                    onClick={() => editing ? handleSave() : setEditing(true)}
                />
            </div>
        </div>
    )
}

export default withRouter(Profile);