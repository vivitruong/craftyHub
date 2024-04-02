import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findShop, updateShop } from '../../store/shop';
import { getAllProducts } from '../../store/products';
import { editUser } from '../../store/session';
import { getUsers } from '../../store/users';
import { Modal } from '../Context/modal';
import '../CSS/ProductsByShop.css'
import smoothShipping from '../CSS/Images/shop_smooth_shipping.svg'
import speedyReplies from '../CSS/Images/shop_speedy_replies.svg'
import starSeller from '../CSS/Images/shop_star_seller.svg'
import editPencil from '../CSS/Images/edit_pencil.svg'
import addIcon from '../CSS/Images/add_icon.svg'
import Footer from '../Navigation/Footer';

const ProductsByShop = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { shopName } = useParams()
    const user = useSelector(state => state.session.user)
    const shop = useSelector(state => Object.values(state.shop))
    const products = useSelector(state => Object.values(state.products))
    const shopProducts = products.filter((product) => product?.seller_id === shop[0]?.user_id)
    const [editShop, setEditShop] = useState(false)
    const [name, setName] = useState(shopName)
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [shopErrors, setShopErrors] = useState([])

    useEffect(() => {
      dispatch(getAllProducts())
      dispatch(findShop(shopName))
      document.documentElement.scrollTop = 0;
    }, [shopName])
