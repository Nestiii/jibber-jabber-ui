import React from 'react';
import './App.scss';
import {NeuButton} from './components/common/Button/Button';
import {Post} from './components/post/Post';
import {NeuInput} from './components/common/Input/Input';
import {NeuTextBox} from './components/common/TextBox/TextBox';

const posts = [
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
    {content: 'Make humanity a multiplanet species!', date: (new Date()).toDateString(), author: 'Elon Musk'},
]

function App() {
    return (
        <div className={'body'}>
            <div className={'app-header'}>
                Jibber Jabber
            </div>
            <div className={'app-body'}>
                <div className={'left-panel'}>
                    <div className={'create-post'}>Create post</div>
                    <NeuInput placeholder={'Created by'}/>
                    <NeuTextBox placeholder={'Write your post here'}/>
                    <NeuButton label={'Create'} />
                </div>
                <div className={'right-panel'}>
                    <div className={'latest-posts'}>Latest posts</div>
                    <div className={'posts-container'}>
                        {posts.map(post =>
                            <Post content={post.content} date={post.date} author={post.author} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
