import React from 'react';
import './App.scss';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from './components/screens/login/Login';
import Home from './components/screens/home/Home';
import Register from './components/screens/register/Register';
import Navbar from './components/common/Navbar/Navbar';
import Profile from './components/screens/profile/Profile';
import Chat from './components/screens/chat/Chat';

const AuthRoutes = () => (
    localStorage.getItem('token') ?
        <Navbar>
            <Switch>
                <Route exact path={'/home'} component={Home}/>
                <Route exact path={'/profile'} component={Profile}/>
                <Route exact path={'/chat'} component={Chat}/>
            </Switch>
        </Navbar> :
        <Redirect exact to={'/login'}/>
)

const App = () => {

    return (
        <div className={'body'}>
            <Switch>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/register'} component={Register}/>
                <AuthRoutes />
            </Switch>
        </div>
    );
}

export default App;
