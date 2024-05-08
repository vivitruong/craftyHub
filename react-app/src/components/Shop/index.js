import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewProduct, getAllProducts } from '../../store/products';
import { editUser } from '../../store/session';
import '../CSS/Shop.css'
import ImageUpload from './ImageUpload';
const Shop = () => {
const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const categories = useSelector(state => Object.values(state.categories))
  const [productId, setProductId] = useState()
  const [page, setPage] = useState(0)
  const [shopName, setShopName] = useState(user.shop_name ? user.shop_name : "")
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [shopErrors, setShopErrors] = useState([])
  const [errors, setErrors] = useState([])
  const [checkDuplicate, setCheckDuplicate] = useState(false)

  useEffect(() => {
    dispatch(getAllProducts())

    const errors = []
    if (name.length < 10 || name.trim().length < 10) errors.push('Name: Title requires 10 characters minimum')
    if (name.length > 140) errors.push('Name: Title exceeds 140 character limit')
    if (category.length === 0) errors.push('Category: Category selection is required')
    if (price < 1) errors.push('Price: Minimum price of $1.00 required')
    if (price > 1000000) errors.push('Price: Price exceeds $1,000,000 limit')
    if (description.length < 10 || description.trim().length < 10) errors.push('Description: Description requires 10 characters minimum')
    if (description.length > 1000) errors.push('Description: Description exceeds 1000 character limit')
    setErrors(errors)
  }, [name, category, price, description])

  useEffect(() => {
    const shopErrors = []
    let validChar = new RegExp(/^[A-Za-z]+$/)
    if(!validChar.test(shopName)) shopErrors.push('Shop Name: Shop Name must only contain alphabetical character')
    if(shopName.split(" ").length > 1) shopErrors.push('Shop Name: Shop Name must not contain spaces')
    if(shopName.length < 4 || shopName.trim().length < 4){
      shopErrors.push('Shop Name " Sop Name requires at least 4 chracters ')
      setCheckDuplicate(false)
    }
    if(shopName.length > 30 ) shopErrors.push('Shop Name: Shop Name reached over 30 character')
    setShopErrors(shopErrors)

    if(checkDuplicate === true){
      shopErrors.push('Shop Name: Shop Name is already taken')
    }
  }, [shopName, checkDuplicate])

  const checkShopName = () => {
    if(shopName) setPage(2)
    else setPage(1)

  }

  const handlerUserSubmit = async(e) => {
    e.preventDefault()

    const userData = {
      id: user.id,
      shop_name: shopName
    }

    const response = await dispatch(editUser(userData))

    if (response) {
      setPage(2)
    } else {
      setCheckDuplicate(true)
    }

  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()

    if(errors.length > 0) {
      return
    }

    const productData = {
      name,
      price,
      category,
      description
    }

    const response = await dispatch(addNewProduct(productData))
    if(response) {
      setProductId(response.id)
      setPage(3)
    }
  }
  return (
    <>
    </>

  )



}
