import request from '../../api';

const ShoppingService = {
  getShoppingItems: async(params) => {
    return await request.get(`shopping_list/?${params}`);
  },

  postShoppingItem: async(added) => {
    return await request.post(`shopping_list`, added);
  }
}

export default ShoppingService;