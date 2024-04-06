import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewProduct, getAllProducts } from '../../store/products';
import { editUser } from '../../store/session';
import '../CSS/Shop.css'
import ImageUpload from './ImageUpload';
