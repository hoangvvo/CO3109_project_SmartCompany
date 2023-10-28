import React, { Component } from 'react';
import './Login.js';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            showPassword: false,
            username: '',
            password: '',
            correctAuth: false
        };
    }
    render() {
    return (
        <div className="loginBox">
            <img src={'./robot.png'} alt="" className="image"/>
            <div><h1 className="loginWord">LOGIN</h1></div>
            <div className='inputBox username'>
                <input 
                    id='name' 
                    className='inputField' 
                    placeholder='USERNAME' 
                />
            </div>
            <div className='inputBox password'>
                <input
                    type={this.state.showPassword ? 'text' : 'password'}
                    id='password'
                    className='inputField'
                    placeholder='PASSWORD'
                />
            </div>
            <div>
                <input type="checkbox" className='checkPassword'/>
                <label className="togglePassword">Show Password</label>
            </div>
            <button type='button' className='button' >SUBMIT</button>
            <button type='button' className='button Google'>Log in with Google</button>
        </div>
        );
    }
}

export default Login;