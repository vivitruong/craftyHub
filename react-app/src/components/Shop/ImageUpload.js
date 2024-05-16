import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { findProductById, getAllProducts } from "../../store/products";
import '../CSS/ImageUpload.css'
import photo from '../CSS/Images/photo.svg'
import whiteX from '../CSS/Images/white-x.svg'
import { uploadImages } from "../../store/images";

const ImageUpload = ({productId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [multiImages, setMultiImage] = useState([])
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [imageLoading, setImageLoading] = useState(null);
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [brokenImage, setBrokenImage] = useState(state)
    const [brokenImage2, setBrokenImage2] = useState(state)
    const [brokenImage3, setBrokenImage3] = useState(state)
    const [brokenImage4, setBrokenImage4] = useState(state)

    useEffect(() => {
        if(image4) setMultiImage([image, image2, image3, image4])
        else if (image3) setMultiImage([image, image2, image3])
        else if(image2) setMultiImage([image, image2])
        else if(image) setMultiImage([image])
        else setMultiImage([])

        if(image || image2 || image3 || image4) setErrors([])

        if (brokenImage === true || brokenImage2 === true || brokenImage3 === true || brokenImage4 === true) setErrors(['Invalid image was uploaded. Please upload a different image'])
        else setErrors([])

    },[image, image2, image3, image4, brokenImage, brokenImage2, brokenImage3, brokenImage4])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(errors.length > 0){
            return
        }
        if(multiImages.length === 0){
            setErrors(['Minimum of one image upload required'])
            return
        }
    }
}
