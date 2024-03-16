const GET_SHOP = 'reviews/GET_SHOP'
const EDIT_SHOP = 'reviews/EDIT_SHOP'

const getShop = (shop_name, shop) => ({
    type: GET_SHOP,
    shop_name,
    shop
})

const editShop = (shop_name, shop) => ({
    type: EDIT_SHOP,
    shop_name,
    shop
})

export const findShop = (shop_name) => async (dispatch) => {
    const response = await fetch(`/api/shop/${shop_name}`);

    if(response.ok) {
        const shop = await response.json();
        dispatch(getShop(shop_name, shop))
        return shop
    }
}
