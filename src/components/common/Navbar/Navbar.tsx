import React from 'react';
import './Navbar.scss';
import Icon from 'react-icons-kit';
import {ic_home} from 'react-icons-kit/md/ic_home';
import {ic_account_box} from 'react-icons-kit/md/ic_account_box';
import {ic_exit_to_app} from 'react-icons-kit/md/ic_exit_to_app';
import {ic_chat} from 'react-icons-kit/md/ic_chat';
import {useHistory} from 'react-router';

const Navbar = ({children}: any) => {

    const history = useHistory()

    const navItems = [
        {
            label: 'Home',
            icon: <Icon icon={ic_home} size={30} style={{color: '#f6cc35'}}/>,
            route: '/home',
            onClick: () => history.push('/home'),
        },
        {
            label: 'Profile',
            icon: <Icon icon={ic_account_box} size={30} style={{color: '#f6cc35'}}/>,
            route: '/profile',
            onClick: () => history.push('/profile')
        },
        {
            label: 'Chat',
            icon: <Icon icon={ic_chat} size={30} style={{color: '#f6cc35'}}/>,
            route: '/chat',
            onClick: () => history.push('/chat')
        },
        {
            label: 'Log out',
            icon: <Icon icon={ic_exit_to_app} size={30} style={{color: '#f6cc35'}}/>,
            route: '/logout',
            onClick: () => {
                history.push('/login')
                localStorage.clear()
            }
        },
    ]

    return (
        <>
            <div className={'navbar'}>
                <span className={'title'}>Jibber Jabber</span>
                {
                    navItems.map((navitem, index) =>
                        <div
                            className={window.location.pathname.includes(navitem.route) ? 'navItemSelected' : 'navItem'}
                            key={index}
                            onClick={navitem.onClick}
                        >
                            {navitem.icon}
                            <span className={'label'}>{navitem.label}</span>
                        </div>
                    )
                }
            </div>
            <div className={'children'}>
                {children}
            </div>
        </>
    )
}

export default Navbar;