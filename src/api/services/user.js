import request from '../../api';

const UserService = {
  getUser: async() => {
    const id = localStorage.getItem('user_id');
    return await request.get(`users/${id}`)
  },
  postUser: async(payload) => {
    return await request.post('users', payload);
  },
  patchUser: async(payload) => {
    const id = localStorage.getItem('user_id');
    return await request.patch(`users/${id}`);
  }
}

export default UserService;