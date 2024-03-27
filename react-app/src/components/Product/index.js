import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { findProductById } from '../../store/products';
import { getUsers } from '../../store/users';
import { halfStars, oneStar, oneHalfStar, twoStar, twoHalfStar, threeStar, threeHalfStar, fourStar, fourHalfStar, fiveStar } from './Rating';
import '../CSS/Product.css'
import filledStar from '../CSS/Images/filled-star.svg'
import halfStar from '../CSS/Images/half-star.svg'
import emptyStar from '../CSS/Images/empty-star.svg'
import check from '../CSS/Images/check.svg'
import { Modal } from '../Context/modal';
import LoginForm from '../auth/LoginForm';
import NotFound from '../Navigation/NotFound';
import Footer from '../Navigation/Footer';
