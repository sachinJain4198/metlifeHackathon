import axios from 'axios'
import { getAllClaims } from './mock.js'

export const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
})

// Claims API functions
export const fetchClaims = async () => {
  // For now, return mock data. In production, this would be:
  // const res = await api.get('/claims')
  // return res.data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getAllClaims)
    }, 500) // Simulate API delay
  })
}

// Fetch detailed claim information
export const fetchClaimDetails = async (claimId) => {
  // For now, find claim from the same getAllClaims data
  // In production, this would be:
  // const res = await api.get(`/claims/${claimId}`)
  // return res.data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const claimDetails = getAllClaims.find(claim => claim.policyId === claimId)
      if (claimDetails) {
        resolve(claimDetails)
      } else {
        reject(new Error(`Claim with ID ${claimId} not found`))
      }
    }, 800) // Simulate API delay, slightly longer for details
  })
}

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
