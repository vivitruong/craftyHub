import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../Context/modal";
import '../CSS/Reviews.css'
import unfilledStar from '../CSS/Images/review-star-grey.svg'
import filledStar from '../CSS/Images/review-star-black.svg'
import { addNewReview, getAllUserReviews, updateReview } from "../../store/reviews";

const Reviews = ({ productId, purchaseId, reviewStars, setReviewStars, setAddReview, formatDate, editReview, setEditReview, reviewId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => state.products)
    const purchases = useSelector(state => state.purchases)
    const userReviews = useSelector(state => state.reviews)
    const [content, setContent] = useState(userReviews[productId] ? userReviews[productId].content : "")
    const [errors, setErrors] = useState([])
    const [ratedStar1, setRatedStar1] = useState(false)
    const [ratedStar2, setRatedStar2] = useState(false)
    const [ratedStar3, setRatedStar3] = useState(false)
    const [ratedStar4, setRatedStar4] = useState(false)
    const [ratedStar5, setRatedStar5] = useState(false)

    useEffect(() => {
        if (reviewStars >= 1) setRatedStar1(true)
        if (reviewStars >= 2) setRatedStar2(true)
        if (reviewStars >= 3) setRatedStar3(true)
        if (reviewStars >= 4) setRatedStar4(true)
        if (reviewStars >= 5) setRatedStar5(true)
      }, [reviewStars])

      useEffect(() => {
        const errors = []
        if (content.length < 10) errors.push("Content: Review must be at least 10 characters long")
        if (content.length > 1000) errors.push("Content: Review exceeds 1000 characters")
        setErrors(errors)
      }, [content])
