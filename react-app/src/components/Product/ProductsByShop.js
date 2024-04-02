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

    useEffect(() => {
        const shopErrors = []
        let validChar = new RegExp(/^[A-Za-z]+$/)
        if (!validChar.test(name)) shopErrors.push('Shop Name: Shop Name must only contain alphabetical characters')
        if (name.split(" ").length > 1) shopErrors.push('Shop Name: Shop Name must not contain spaces')
        if (name.length < 4 || name.trim().length < 4) {
          shopErrors.push('Shop Name: Shop Name requires 4 characters minimum')
        }
        if (name.length > 30) shopErrors.push('Shop Name: Shop Name exceeds 30 character limit')
        if (title?.length > 60) shopErrors.push('Title: Title exceeds 60 character limit')
        if (location?.length > 50) shopErrors.push('Location: Location exceeds 50 character limit')

        setShopErrors(shopErrors)
      }, [name, title, location])

      const handleEditShop = () => {
        setEditShop(true)
        setName(shopName)
        setTitle(shop[0]?.title)
        setLocation(shop[0]?.location)
      }

      const handleAddItems = () => {
        history.push('/shop')
      }

      const handleEditShopForm = async (e) => {
        e.preventDefault()

        if (shopErrors.length > 0) return

        const userData = {
          id: user.id,
          shop_name: name
        }

        const shopData = {
          shop_name: name,
          title,
          location
        }

        if (shopName !== name) {
          const userResponse = await dispatch(editUser(userData))

          if (userResponse) {
            await dispatch(getUsers())
            history.push(`/shop/${name}`)
          } else setShopErrors(['Shop Name: Shop Name is already in use'])
        }

        const shopResponse = await dispatch(updateShop(shopData))

        if (shopResponse) {
          dispatch(findShop(name))
          setEditShop(false)
        }
      }
