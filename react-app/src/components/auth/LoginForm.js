import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {login} from '../../store/session';
import SignUpForm from './SignUpForm';
import '../CSS/LoginForm.css';


const LoginForm = ({setShowSignIn}) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [showRegister, setShowRegister] = useState(false)

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if ( data ) {
            setErrors(data);

        } else {
            setShowSignIn(false)
        }
    }
    const updateEmail = e => {
        setEmail(e.target.value)
    }

    const updatePassword = e => {
        setPassword(e.target.value)
    }

    const handleRegister = () => {
        setShowRegister(true)
    }

    return (
        <>
        </>
    )
}
