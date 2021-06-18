import React from 'react';
import Icon from 'react-icons-kit';
import {ic_delete} from 'react-icons-kit/md/ic_delete';
import {ic_thumb_down} from 'react-icons-kit/md/ic_thumb_down';
import {ic_thumb_up} from 'react-icons-kit/md/ic_thumb_up';
import './Post.scss';

interface PostProps {
    content: string,
    date: string,
    author: string,
    onDelete: () => void,
    username: string
}

export const Post = ({content, date, author, onDelete, username}: PostProps) => {

    return (
        <div className={'post-container'}>
            <div className={'created-by'}>{author}</div>
            {content}
            <div className={'post-footer'}>
                <span className={'post-date'}>{date}</span>
                <div className={'footer-right'}>
                    <Icon icon={ic_thumb_up} className={'icon'}/>
                    123
                    <Icon icon={ic_thumb_down} className={'icon'}/>
                    32
                    {
                        username === author &&
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