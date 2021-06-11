import React, {useState} from 'react';
import './Login.scss';
import {NeuInput} from '../common/Input/Input';
import {NeuButton} from '../common/Button/Button';
import {useHistory, withRouter} from 'react-router-dom';

const Login = () => {

    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={'login'}>
            <div className={'login-card'}>
                <div className={'title'}>Jibber Jabber</div>
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
                <NeuButton
                    disabled={!email || !password}
                    label={'Login'}
                    //@ts-ignore
                    onClick={() => {
                        localStorage.setItem('token', 'asd')
                        history.push('/home')
                    }}
                />
                <span
                    onClick={() => history.push('/register')}
                    className={'register-link'}
                >
                    Create an account
                </span>
            </div>
        </div>
    )
}

export default withRouter(Login);