import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findProductsBySearch } from '../../store/products';
import magnifyingGlass from '../CSS/Images/magnifying_glass.svg'
import '../CSS/SearchBar.css'


const SearchBar = ({setSelectedCategory}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [keyword, setKeyword] = useState("")
    const [errors, setErrors] = useState([])
