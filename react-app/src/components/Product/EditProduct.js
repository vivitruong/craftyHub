import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../store/products";
import '../CSS/EditProduct.css'

const EditProduct = ({ productId, setShowEditForm }) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const categories = useSelector(state => Object.values(state.categories))
    const product = products[productId]

    const [name, setName] = useState(product?.name)
    const [price, setPrice] = useState(product?.price)
    const [description, setDescription] = useState(product?.description)
    const [category, setCategory] = useState(product?.category)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []
        if (name.length < 10) errors.push('Name: Title requires 10 characters minimum')
        if (name.length > 140) errors.push('Name: Title exceeds 140 character limit')
        if (category.length === 0) errors.push('Category: Category selection is required')
        if (price < 1) errors.push('Price: Minimum price of $1.00 required')
        if (price > 1000000) errors.push('Price: Price exceeds $1,000,000 limit')
        if (description.length < 10) errors.push('Description: Description requires 10 characters minimum')
        if (description.length > 1000) errors.push('Description: Description exceeds 1000 character limit')
        setErrors(errors)
      }, [name, category, price, description])
