import React, {useState} from 'react';
import './Register.scss';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';
import {useHistory, withRouter} from 'react-router-dom';
import axios from 'axios';
import {url} from '../../../utils';

const Register = () => {

    const history = useHistory()
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const register = () => {
        setLoading(true)
        axios.post(url + 'users/register',
            {
                email: email,
                firstName: name,
                lastName: lastName,
                username: username,
                password: password,
            })
            .then(() => {
                setError('')
                setLoading(false)
                history.push('/login')
            })
            .catch(() => {
                setError('An error occurred creating the user')
            })
    }

    return (
        <div className={'register'}>
            <div className={'register-card'}>
                <div className={'title'}>Jibber Jabber</div>
                <NeuInput
                    placeholder={'Name'}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <NeuInput
                    placeholder={'Last Name'}
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <NeuInput
                    placeholder={'Username'}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <NeuInput
                    placeholder={'Email'}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <NeuInput
                    placeholder={'Password'}
                    type={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <NeuInput
                    placeholder={'Confirm assword'}
                    type={'password'}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <NeuButton
                    disabled={
                        !name ||
                        !lastName ||
                        !username ||
                        !email ||
                        !password ||
                        !confirmPassword ||
                        confirmPassword !== password
                    }
                    label={'Register'}
                    loading={loading}
                    onClick={() => register()}
                />
                {
                    error &&
                    <span className={'error-message'}>{error}</span>
                }
                <span
                    onClick={() => history.push('/login')}
                    className={'login-link'}
                >
                    Back to login
                </span>
            </div>
        </div>
    )
}

export default withRouter(Register);