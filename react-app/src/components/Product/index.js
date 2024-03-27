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

    useEffect(() => {
        dispatch(getUsers())
        document.documentElement.scrollTop = 0;
      }, [])

      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])


      useEffect(() => {
        const response = dispatch(findProductById(productId))
        if (response) setSelectedImage(product[productId]?.images[0])
        displayRating()
      }, [roundedStars])


      const addToCart = (selectedProduct) => {

        if (!user) {
          setShowSignIn(true)
          return
        }

        if (cart && cart.length > 0) {
          let findItem = cart.filter((item, i) => item.id === selectedProduct.id)
          let newCart = [...cart]

          if (findItem[0]) {
            findItem[0].quantity++
          } else {
            findItem = {
              ...selectedProduct,
              quantity: 1
            }
            newCart.push(findItem)
          }
          setCart(newCart)

        } else {
          selectedProduct.quantity = 1
          setCart([selectedProduct])
        }
        setNotification(true)
        setCount(count + 1)
      }

      const displayRating = () => {
        const ratingArr = []
        for (let i = 0; i < roundedStars; i++) {
          ratingArr.push(filledStar)
        }

        if (difference >= 0.5) ratingArr.push(halfStar)

        const remainder = 5 - ratingArr.length
        if (ratingArr.length > 0 && remainder > 0) {
          let index = 0
          while (index < remainder) {
            ratingArr.push(emptyStar)
            index += 1
          }
        }
        setRating(ratingArr)
      }

      const starsDisplay = (starCount) => {
        return (
          <>
            {starCount.map((star, i) => {
              return (
                <img className='star-display-rating' src={star} key={i} alt='star'></img>
              )
            })}
          </>
        )
      }

      const formatDate = (dateTime) => {
        let month = dateTime.split(" ")[2]
        let day = dateTime.split(" ")[1]
        if (day[0] === '0') day = day.slice(1)
        let year = dateTime.split(" ")[3]

        return `${month} ${day}, ${year}`
      }

      console.log(product[productId])

      if (!product[productId]) {
        return (
          <NotFound />
        )
      }
