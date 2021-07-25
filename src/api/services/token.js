import request from '../../api';

const TokenService = {
  obtain: async(payload) => {
    return await request.post('obtain-token', payload)
  },
  refresh: async(payload) => {
    return await request.post('refresh-token', payload)
  }
}

export default TokenService;