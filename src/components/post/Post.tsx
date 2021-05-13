import React from 'react';
import Icon from 'react-icons-kit';
import {ic_delete} from 'react-icons-kit/md/ic_delete'
import './Post.scss';

interface PostProps {
    content: string,
    date: string,
    author: string,
    onDelete: () => void
}

export const Post = ({content, date, author, onDelete}: PostProps) => {

    return (
        <div className={'post-container'}>
            <div className={'created-by'}>{author}</div>
            {content}
            <div className={'post-footer'}>
                <span className={'post-date'}>{date}</span>
                <Icon
                    icon={ic_delete}
                    style={{color: '#ed35f6'}}
                    className={'delete'}
                    size={20}
                    onClick={() => onDelete()}
                />
            </div>
        </div>
    )
}