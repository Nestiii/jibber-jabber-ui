import React, {useEffect, useState} from 'react';
import './Chat.scss';
import {withRouter} from 'react-router-dom';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import {getConfig, getUsername, url} from '../../../utils';

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

let stompClient: any;

const Chat = () => {

    const [me, setMe] = useState();
    const [receiver, setReceiver] = useState<UserProps>();
    const [searchUser, setSearchUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState<UserProps[]>([]);

    const getUsers = () => {
        axios.get(url + 'users/get-users', getConfig())
            .then((res: { data: { users: UserProps[] } }) => {
                setUsers([...res.data.users])
            })
        axios.get(url + 'users/by-username/' + getUsername(), getConfig())
            .then((res) => {
                setMe({...res.data})
            })
    }

    useEffect(() => getUsers(), [])

    const incomingMessage = (chatMessage: any) => {
        // @ts-ignore
        if (JSON.parse(chatMessage.body).sender === receiver?.id) {
            setMessages([...messages, {
                author: receiver,
                text: JSON.parse(chatMessage.body).content,
                timestamp: Date.now()
            }]);
        }
    }

    const connect = (username: string, incomingMessage: any) => {
        let socket = new SockJS('/api/messages/chat');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame: any) => {
            console.log('Connected: ' + frame);
            setConnected(true);
            // @ts-ignore
            stompClient.subscribe('/topic/messages/' + me?.id, (chatMessage: any) => {
                incomingMessage(chatMessage);
            });
        });
    }

    const sendNewMessage = (message: string) => {
        setMessages([...messages, {
            author: me,
            text: message,
            timestamp: Date.now()
        }]);
        // @ts-ignore
        stompClient.send(`/chat/${receiver.id}/${me?.id}`, {}, JSON.stringify({
            // @ts-ignore
            'sentBy': me?.id,
            'content': message
        }));
    };

    useEffect(() => {
        if (receiver?.id) {
            // @ts-ignore
            connect(me?.id, incomingMessage);
        }
        return () => {
            if (connected) {
                stompClient.disconnect();
                setConnected(false);
            }
        }
    },[receiver]);

    return (
        <div className={'chat'}>
            <div className={'left-panel'}>
                <div className={'find-people'}>Find people</div>
                <NeuInput
                    placeholder={'Enter username'}
                    onChange={(e) => setSearchUser(e.target.value)}
                    maxLength={20}
                    value={searchUser}
                />
                <div className={'users-container'}>
                    {
                        users.length > 0 &&
                        users.map(user =>
                            <div className={'user'} key={user.id} onClick={() => setReceiver(user)}>
                                <div className={'user-info'}>
                                        <span className={'username'}>
                                            {user.username}
                                        </span>
                                    <span className={'full-name'}>{user.firstName + ' ' + user.lastName}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={'chat-panel'}>
                <div className={'chat-title'}>Chat</div>
                {
                    receiver ?
                        <>
                            <div className={'chat-username'}>{receiver?.username}</div>
                            <div className={'messages-container'}>
                                {
                                    messages.map((message, index) => (
                                        <div key={index} className={'message-wrapper ' + (message.author.id === receiver.id ? 'wrapper-left' : 'wrapper-right')}>
                                            <div className={'message ' + (message.author.id === receiver.id ? 'left' : 'right')}>
                                                <span>{message.text}</span>
                                                <span className={'message-date'}>{(new Date(message.timestamp)).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={'messaging-container'}>
                                <NeuInput
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={'Write your message'}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            sendNewMessage(message);
                                            setMessage('');
                                        }
                                    }}
                                />
                                <NeuButton onClick={() => {
                                    sendNewMessage(message);
                                    setMessage('');
                                }} label={'Send'}/>
                            </div>
                        </> :
                        <div className={'select-user'}>Select an user to start chatting</div>
                }
            </div>
        </div>
    )
}

export default withRouter(Chat);