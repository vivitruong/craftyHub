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

      return (
        <>
          {shop?.length > 0 && <div className='user-shop-main'>
            <div className='user-shop-upper'>
              <div className='user-shop-header'>
                <div className='user-shop-header-left'>
                  {shop[0]?.icon.length > 0 ? <img src={shop[0]?.icon} className='shop-icon-img' alt='shop-icon'></img> :
                    <div className='shop-icon-no-img' alt='shop-icon'><span>Image coming soon</span></div>}
                  <div className='user-shop-info-outer'>
                    <div className='user-shop-name' onClick={() => handleEditShop()}>{shopName}
                      {user?.id === shop[0]?.user_id && <span className='user-shop-edit-outer'>
                        <span className='user-shop-edit'>Edit</span>
                        <img src={editPencil} className='user-shop-edit-pencil' alt='edit pencil'></img>
                      </span>}
                    </div>
                    <div className='user-shop-title'>{shop[0]?.title}</div>
                    <div className='user-shop-location'>{shop[0]?.location}</div>
                    <div className='user-shop-star-seller'><img src={starSeller} className='star-seller-icon' alt='star-seller'></img>Star Sellar</div>
                  </div>
                </div>
                <div className='user-shop-header-middle'>
                  <div className='user-shop-feature'>
                    <img src={smoothShipping}></img>
                    <div className='user-shop-feature-title'>Smooth Shipping</div>
                    <div className='user-shop-feature-caption'>Has a history of shipping on time with tracking.</div>
                  </div>
                  <div className='user-shop-feature'>
                    <img src={speedyReplies}></img>
                    <div className='user-shop-feature-title'>Speed replies</div>
                    <div className='user-shop-feature-caption'>Has a history of replying to messages quickly.</div>
                  </div>
                </div>
                <div className='user-shop-header-right'>
                  <img src={shop[0]?.user[0]?.profile_pic} className='user-shop-profile-img'></img>
                  <div className='user-shop-profile-name'>{shop[0]?.user[0]?.first_name}</div>
                </div>
              </div>
            </div>
