const ADD_IMAGE = 'images/ADD_IMAGE'
const addImages = (newImage) => ({
    type: ADD_IMAGE,
    newImage
  })

  export const uploadImages = (imageData) => async (dispatch) => {
    const response = await fetch(`/api/images`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: imageData
    })

    if (response.ok) {
      const newImage = await response.json()
      dispatch(addImages(newImage));
      return newImage;
    }
  }

  // const imageReducer = (state = {}, action) => {
  //   let newState = {}
  //   switch (action.type) {

  //     case ADD_IMAGE: {
  //       newState = { ...state }
  //       newState[action.newImage.id] = action.newImage
  //       return newState
  //     }

  //     default:
  //       return state;
  //   }
  // }

  // export default imageReducer;
