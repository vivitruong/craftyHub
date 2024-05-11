import React, { useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loadProductsByOwner, findProductById, removeProduct } from "../../store/products";
import '../CSS/ShopManager.css';
import {Modal} from '../Context/modal';
import EditProduct from "../Product/EditProduct";
import rightAngle from '../CSS/Images/right_angle.svg'

const ShopManager = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => Object.values(state.products))
    const [productId, setProductId] = useState()
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    useEffect(() => {
        dispatch(loadProductsByOwner(user.id))
        if(products.length === 0) {
            history.push('/shop')
        }
    },[products.length])

    const handleEdit = (id) => {
        setProductId(id)
        setShowEditForm(true)
    }

    const handleDelete = (id) => {
        setProductId(id)
        setDeleteConfirmation(true)
    }

    const confirmDelete = () => {
        dispatch(removeProduct(productId))
        setDeleteConfirmation(false)
    }

    return(<>
    </>)

}
