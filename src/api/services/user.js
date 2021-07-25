import request from '../../api';

const UserService = {
  getUser: async() => {
    const id = localStorage.getItem('user_id');
    return await request.get(`users/${id}`)
  }
}

export default UserService;