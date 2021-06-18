import React, {useState} from 'react';
import './Login.scss';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';
import {useHistory, withRouter} from 'react-router-dom';
import axios from 'axios';
import {url} from '../../../utils';

const Login = () => {

    const history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = () => {
        setLoading(true)
        axios.post(url + 'login',
            {
                username: username,
                password: password,
            })
            .then(({data}) => {
                localStorage.setItem('token', data)
                setError('')
                setLoading(false)
                history.push('/home')
            })
            .catch(() => {
                setError('An error occurred logging in')
                setLoading(false)
            })
    }

    return (
        <div className={'login'}>
            <div className={'login-card'}>
                <div className={'title'}>Jibber Jabber</div>
                <NeuInput
                    placeholder={'Username'}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <NeuInput
                    placeholder={'Password'}
                    type={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <NeuButton
                    disabled={!username || !password}
                    label={'Login'}
                    loading={loading}
                    onClick={() => login()}
                />
                {
                    error &&
                    <span className={'error-message'}>{error}</span>
                }
                <span
                    onClick={() => history.push('/register')}
                    className={'register-link'}
                >
                    Create an account
                </span>
                <span className={'register-link forgot-pass'}>
                    Forgot password?
                </span>
            </div>
        </div>
    )
}

export default withRouter(Login);