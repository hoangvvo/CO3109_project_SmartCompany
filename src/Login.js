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
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleUsernameChange(event) {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        this.setState({
            username: event.target.value
        });
    }
    handlePasswordChange(event) {
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        this.setState({
            password: event.target.value
        });
    }
    handleClick() {
        const { username, password } = this.state;
        
        if (username === 'Abc' && password === 'Xyz') {
        // Valid credentials - handle the login logic here
            alert('Login successful');
        } else {
        // Invalid credentials - display an error message
            const errorElement = document.createElement('h3');
            errorElement.textContent = 'Wrong username/password';
            errorElement.className = 'error-message';

        // Find the inputBox div and append the error message to it
            const inputBox = document.querySelector('.password');
            inputBox.appendChild(errorElement);
        }
        console.log(this.state.username);
        console.log(this.state.password);
    }
    togglePasswordVisibility() {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
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
                    onChange={this.handleUsernameChange}
                />
            </div>
            <div className='inputBox password'>
                <input
                    type={this.state.showPassword ? 'text' : 'password'}
                    id='password'
                    className='inputField'
                    placeholder='PASSWORD'
                    onChange={this.handlePasswordChange}
                />
            </div>
            <div>
                <input type="checkbox" onChange={() => this.togglePasswordVisibility()} className='checkPassword'/>
                <label className="togglePassword">Show Password</label>
            </div>
            <button type='button' className='button' onClick={this.handleClick}>SUBMIT</button>
            <button type='button' className='button Google' onClick={this.handleClick}>Log in with Google</button>
        </div>
        );
    }
}

export default Login;