import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { findProductById } from '../../store/products';
import { getUsers } from '../../store/users';
import { halfStars, oneStar, oneHalfStar, twoStar, twoHalfStar, threeStar, threeHalfStar, fourStar, fourHalfStar, fiveStar } from './Rating';
import '../CSS/Product.css'
import filledStar from '../CSS/Images/filled-star.svg'
import halfStar from '../CSS/Images/half-star.svg'
import emptyStar from '../CSS/Images/empty-star.svg'
import check from '../CSS/Images/check.svg'
import { Modal } from '../Context/modal';
import LoginForm from '../auth/LoginForm';
import NotFound from '../Navigation/NotFound';
import Footer from '../Navigation/Footer';

const Product = () => {
    const cartInStorage = JSON.parse(localStorage.getItem('cart'))
    // console.log(cartInStorage, 'cartInStorage') // returns null if empty
    let { productId } = useParams()
    productId = Number(productId)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const product = useSelector(state => state.products)
    const [selectedImage, setSelectedImage] = useState(product[productId]?.images[0])
    const [rating, setRating] = useState([])
    const users = useSelector(state => state.users)
    const [showSignIn, setShowSignIn] = useState(false)

    const [cart, setCart] = useState(cartInStorage)

    const [notification, setNotification] = useState(false)
    const [count, setCount] = useState(0)

    const roundedStars = Math.floor(product[productId]?.avg_stars)
    const difference = product[productId]?.avg_stars - roundedStars
