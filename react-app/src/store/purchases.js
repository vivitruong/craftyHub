const GET_PURCHASES = 'purchases/GET_PURCHASES'
const ADD_PURCHASE = 'purchases/ADD_PURCHASE'
const REMOVE_PURCHASE = 'purchases/REMOVE_PURCHASE'

const getPurchases = (purchases) => ({
    type: GET_PURCHASES,
    purchases
})
