import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../store/session';
import '../CSS/SignUpForm.css'

const SignUpForm = ({ setShowRegister, setShowSignIn }) => {
    const [errors, setErrors] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const dispatch = useDispatch();
