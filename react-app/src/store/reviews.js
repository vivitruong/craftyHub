const GET_REVIEWS = 'reviews/GET_REVIEWS'
const GET_REVIEWS_PRODUCTS = 'reviews/GET_REVIEWS_PRODUCTS'
const ADD_REVIEW = 'review/ADD_REVIEW'
const EDIT_REVIEW = 'review/EDIT_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const getReviewsProducts = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const addReview = (newReview) => ({
    type: ADD_REVIEW,
    newReview
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})
