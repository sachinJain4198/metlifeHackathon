import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
})

// export const fetchItems = async () => {
//   const res = await api.get('/items')
//   return res.data
// }

// export const createItem = async (payload) => {
//   const res = await api.post('/items', payload)
//   return res.data
// }

// export const updateItem = async (id, payload) => {
//   const res = await api.put(`/items/${id}`, payload)
//   return res.data
// }

// export const deleteItem = async (id) => {
//   const res = await api.delete(`/items/${id}`)
//   return res.data
// }
