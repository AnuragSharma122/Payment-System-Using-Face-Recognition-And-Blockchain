import React, { useState } from "react";
import './Register.css';
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setNumb] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(phoneNum);
        console.log(email);
        console.log(pass);
    }

    return (
        <div className="auth-form-container">
            <h2 className="h2">Register to Wallet</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="number">Phone Number</label>
            <input value={phoneNum}  onChange={(e) => setNumb(e.target.value)} id="number" placeholder="Phone Number" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
    </div>
    )
}