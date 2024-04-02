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
