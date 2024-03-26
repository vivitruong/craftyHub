import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/Profile.css'
import downArrow from '../CSS/Images/down-arrow.svg'
import purchases from '../CSS/Images/purchases.svg'
import { logout } from '../../store/session';
import signOut from '../CSS/Images/sign-out.svg'
import shop from '../CSS/Images/shop.svg'
