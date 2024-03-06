from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Product, Review, Image, Category, User, Shop
from app.forms import ShopForm
from datetime import date

shop = Blueprint('shop', __name__)


@shop.route("/<shopName>")
def products_by_shop(shopName):
  user = db.session.query(User).filter(User.shop_name == shopName).first()
  userId = user.to_dict()['id']

  shop = db.session.query(Shop).get(userId)
  shop_details = []

  shop = shop.to_dict()
  shop['user'] = [user.to_dict()]
  shop_details.append(shop)

  return jsonify(shop_details)

@shop.route("/<shopName>", methods=['PUT'])
@login_required
def edit_shop(shopName):
  form = ShopForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  user = db.session.query(User).filter(User.shop_name == shopName).first()
  userId = user.to_dict()['id']
  shop = db.session.query(Shop).get(userId)
  # products = db.session.query(Product).filter(Product.seller_id == userId)

  shop_details = []

  if shop.user_id == current_user.id:

    if form.validate_on_submit():
      if form.data['title']:
        shop.title = form.data['title']
      if form.data['location']:
        shop.location = form.data['location']
      if form.data['icon']:
        shop.icon = form.data['icon']
      shop.updated_at = date.today()

      db.session.commit()

      shop = shop.to_dict()
      # shop['products'] = [product.to_dict() for product in products]

      shop['user'] = [user.to_dict()]
      shop_details.append(shop)

      return jsonify(shop_details)

    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 400
  else:
    return {'errors': ['Unauthorized']}, 403
