import React from 'react';
import Icon from 'react-icons-kit';
import {ic_delete} from 'react-icons-kit/md/ic_delete';
import {ic_thumb_down} from 'react-icons-kit/md/ic_thumb_down';
import {ic_thumb_up} from 'react-icons-kit/md/ic_thumb_up';
import './Post.scss';
import {useHistory} from 'react-router';
import {getConfig, getUsername, url} from '../../../utils';
import axios from 'axios';

interface PostProps {
    content: string,
    date: string,
    author: string,
    authorId: string,
    onDelete: () => void,
    onLikeAction: () => void,
    likes: number,
    dislikes: number,
    id: number
}

export const Post = ({likes, id, dislikes, content, date, author, authorId, onDelete, onLikeAction}: PostProps) => {

    const history = useHistory();

    const like = () => {
        axios.post(url + 'post/like/' + id,{}, getConfig())
            .then(() => {
                onLikeAction()
            })
    }

    const dislike = () => {
        axios.post(url + 'post/dislike/' + id,{}, getConfig())
            .then(() => {
                onLikeAction()
            })
    }

    return (
        <div className={'post-container'}>
            <div
                className={'created-by'}
                onClick={() => history.push('profile?userId=' + authorId)}
            >
                {author}
            </div>
            {content}
            <div className={'post-footer'}>
                <span className={'post-date'}>{date}</span>
                <div className={'footer-right'}>
                    <Icon icon={ic_thumb_up} className={'icon'} onClick={() => like()}/>
                    {likes}
                    <Icon icon={ic_thumb_down} className={'icon'} onClick={() => dislike()}/>
                    {dislikes}
                    {
                        getUsername() === author &&
                        <Icon
                            icon={ic_delete}
                            className={'icon'}
                            size={20}
                            onClick={() => onDelete()}
                        />
                    }
                </div>
            </div>
        </div>
    )
}