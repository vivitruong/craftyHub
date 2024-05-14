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

    return(
        <div className="my-products-main">
            <div className="my-products-upper">
                <div className="my-products-header">Shop Manager</div>
                {user?.shop_name &&
                <div className="my-products-shop">
                <Link to={`/shop/${user?.shop_name}`}>
              <span className="shop-manager-shop-name">{user?.shop_name}</span>
            </Link>
            <img src={rightAngle} className='shop-manager-right-icon' alt=''></img>
                </div>
                }

            </div>
            <div className="my-products-outer">
                {products && <div className="my-products-inner">
                    {products?.reverse().map((product, i) => {
                        return (
                            <>
                            <div className="my-products-img-main" key={i}>
                                <Link to={`/products/${product?.id}`} onClick={() => dispatch(findProductById(product?.id))}>
                                    {product?.image?.length > 0 && <img src={product?.images[0]} className='my-products-img' alt='product'></img>}
                                </Link>
                            </div>
                            <div className="my-products-info">
                                <div className="my-product-category">{product?.category.split("&").join(' & ')}</div>
                                <div className="my-product-name">{product?.name}</div>
                                <div className="my-product-price">${product?.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                <div className="my-product-buttons">
                                <button className="my-product-edit-button" onClick={() => handleEdit(product?.id)}>Edit</button>
                                <button className="my-product-delete-button" onClick={() => { handleDelete(product?.id) }}>Delete</button>
                                </div>
                            </div>
                            </>
                        )
                    })}

                </div>
                    }

            </div>

        </div>

    )

}
