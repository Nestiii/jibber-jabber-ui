import React, {useState} from 'react';
import './Chat.scss';
import {withRouter} from 'react-router-dom';
import {NeuInput} from '../../common/Input/Input';
import {NeuButton} from '../../common/Button/Button';

const messages = [
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
    {message: 'asdasd a sd as d asd asdasd asdas dasd asd', time: (new Date()).toString()},
]

const Chat = () => {

    const [searchUser, setSearchUser] = useState('')
    const [message, setMessage] = useState('')

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
                    <NeuButton onClick={() => null} label={'Send'}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Chat);