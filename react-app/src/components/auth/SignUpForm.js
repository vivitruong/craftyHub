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

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
          const data = await dispatch(signUp(first_name, email, password));
          if (data) {
            setErrors(data)
          } else {
            setShowSignIn(false)
            setShowRegister(false)
          }
        } else {
          setErrors(['Password : Passwords do not match'])
        }
      };

      const updateFirstName = (e) => {
        setFirstName(e.target.value);
      };

      const updateEmail = (e) => {
        setEmail(e.target.value);
      };

      const updatePassword = (e) => {
        setPassword(e.target.value);
      };

      const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
      };
