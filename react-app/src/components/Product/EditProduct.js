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
