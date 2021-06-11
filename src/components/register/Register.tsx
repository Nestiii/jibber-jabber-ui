import React, {useState} from 'react';
import './Register.scss';
import {NeuInput} from '../common/Input/Input';
import {NeuButton} from '../common/Button/Button';
import {useHistory, withRouter} from 'react-router-dom';

const Register = () => {

    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className={'register'}>
            <div className={'register-card'}>
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
                <NeuInput
                    placeholder={'Confirm assword'}
                    type={'password'}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <NeuButton
                    disabled={!email || !password || !confirmPassword || confirmPassword !== password}
                    label={'Register'}
                    //@ts-ignore
                    onClick={() => null}
                />
            </div>
        </div>
    )
}

export default withRouter(Register);