import React, {useEffect, useState} from 'react';
import './Chat.scss';
import {withRouter} from 'react-router-dom';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import {getConfig, getUsername, url} from '../../../utils';

let stompClient: any;

const Chat = () => {

    const [me, setMe] = useState();
    const [receiver, setReceiver] = useState();
    const [searchUser, setSearchUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [connected, setConnected] = useState(false);

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
            stompClient.subscribe('/api/topic/messages/' + me?.id, (chatMessage: any) => {
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
        stompClient.send(`/api/chat/${user.id}/${me?.id}`, {}, JSON.stringify({
            // @ts-ignore
            'sender': me?.id,
            'content': message
        }));
    };

    useEffect(() => {
        axios.get(url + 'users/by-username/' + getUsername(), getConfig())
            .then((res) => {
                setMe({...res.data})
                connect(res.data.id, incomingMessage);
            })

        return () => {
            if (connected) {
                stompClient.disconnect();
                setConnected(false);
            }
        }
    },[]);

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
                <NeuButton onClick={() => null} label={'Search'} />
            </div>
            <div className={'chat-panel'}>
                <div className={'chat-title'}>Chat</div>
                <div className={'chat-username'}>Elon Musk</div>
                <div className={'messages-container'}>
                    {
                        messages.map((message, index) => (
                            <div key={index} className={'message-wrapper ' + (index%2 === 0 ? 'wrapper-left' : 'wrapper-right')}>
                                <div className={'message ' + (index%2 === 0 ? 'left' : 'right')}>
                                    <span>{message.message}</span>
                                    <span>{(new Date(message.time)).toLocaleString()}</span>
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
                    />
                    <NeuButton onClick={() => {
                        sendNewMessage(message);
                        setMessage('');
                    }} label={'Send'}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Chat);