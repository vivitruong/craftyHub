import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from '../Context/modal';
import { cancelPurchase, getAllPurchases } from "../../store/purchases";
import { getAllUserReviews, removeReview } from "../../store/reviews";
import { getAllProducts } from "../../store/products";
import '../CSS/ShopManager.css'
import '../CSS/Purchases.css'
import unfilledStar from '../CSS/Images/review-star-grey.svg'
import filledStar from '../CSS/Images/review-star-black.svg'
import Reviews from "../Reviews";
import { ratingFiveStar, ratingFourStar, ratingThreeStar, ratingTwoStar, ratingOneStar } from "../Product/Rating";

const Purchases = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const userReviews = useSelector(state => state.reviews)
  const products = useSelector(state => state.products)
  const purchases = useSelector(state => Object.values(state.purchases))
  const [ratedStar1, setRatedStar1] = useState(false)
  const [ratedStar2, setRatedStar2] = useState(false)
  const [ratedStar3, setRatedStar3] = useState(false)
  const [ratedStar4, setRatedStar4] = useState(false)
  const [ratedStar5, setRatedStar5] = useState(false)
  const [cancelConfirmation, setCancelConfirmation] = useState(false)
  const [removeConfirmation, setRemoveConfirmation] = useState(false)
  const [purchaseId, setPurchaseId] = useState()
  const [orderNumber, setOrderNumber] = useState()
  const [productName, setProductName] = useState()
  const [addReview, setAddReview] = useState(false)
  const [reviewStars, setReviewStars] = useState(false)
  const [productId, setProductId] = useState([])
  const [refreshReview, setRefreshReview] = useState(false)
  const [editReview, setEditReview] = useState(false)
  const [reviewId, setReviewId] = useState()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllPurchases(user.id))
    dispatch(getAllUserReviews())
    setRefreshReview(false)
  }, [addReview, refreshReview])


  const formatDate = (dateTime) => {
    let month = dateTime.split(" ")[2]
    let day = dateTime.split(" ")[1]
    if (day[0] === '0') day = day.slice(1)
    let year = dateTime.split(" ")[3]

    return `${month} ${day}, ${year}`
  }

  const generatedShipped = (dateTime) => {
    const date = new Date(dateTime)
    date.setDate(date.getDate() + 3);
    return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date));
  }

  const generateDelivery = (dateTime) => {
    const date = new Date(dateTime)
    date.setDate(date.getDate() + 7);
    return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date));
  }

  const checkDelivered = (dateTime) => {
    const date = new Date(dateTime)
    date.setDate(date.getDate() + 7);
    if (date < new Date()) {
      return "delivered"
    }
  }

  const checkShipped = (dateTime) => {
    const date = new Date(dateTime)
    date.setDate(date.getDate() + 3);
    if (date < new Date()) {
      return "shipped"
    }
  }

  const convertTotal = (price) => {
    return price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const cancelOrder = (id, num, name) => {
    setPurchaseId(id)
    setOrderNumber(num)
    setProductName(name)
    setCancelConfirmation(true)
  }

  const confirmCancel = () => {
    dispatch(cancelPurchase(purchaseId))
    setCancelConfirmation(false)
  }

  const handleStarOn = (num, id) => {
    setPurchaseId(id)
    if (num >= 1) setRatedStar1(true)
    if (num >= 2) setRatedStar2(true)
    if (num >= 3) setRatedStar3(true)
    if (num >= 4) setRatedStar4(true)
    if (num >= 5) setRatedStar5(true)
  }

  const handleStarOff = (num, id) => {
    setPurchaseId(id)
    if (num >= 1) setRatedStar1(false)
    if (num >= 2) setRatedStar2(false)
    if (num >= 3) setRatedStar3(false)
    if (num >= 4) setRatedStar4(false)
    if (num >= 5) setRatedStar5(false)
  }

  const handleReview = (num, itemId, orderId) => {
    setAddReview(true);
    setProductId(itemId)
    setPurchaseId(orderId)
    setReviewStars(num)
  }

  const handleEditReview = (review, id) => {
    setProductId(review.product_id)
    setPurchaseId(id)
    setReviewStars(review.stars)
    setReviewId(review.id)
    setEditReview(true);
    setAddReview(true);
  }

  const handleRemoveConfirmation = (id) => {
    setRemoveConfirmation(true)
    setReviewId(id)
  }
