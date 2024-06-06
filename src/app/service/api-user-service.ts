import axios from 'axios'
import { getAccessToken, setAccessToken, setRefreshToken, getRefreshToken } from '../../shared/utils/localStorageLogic'

const instance = axios.create({
  baseURL: 'http://localhost:5000/auth',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config
    if (err.response) {
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data)
      }

      if (err.response.status === 401 && !originalConfig._retry && getAccessToken() != null) {
        originalConfig._retry = true
        try {
          const rs: any = await refreshAccessToken()
          const { accessToken, refreshToken } = rs.data
          setAccessToken(accessToken)
          setRefreshToken(refreshToken)
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
          return instance(originalConfig)
        } catch (error: any) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
          }
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data)
      }

      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response.data)
        }
        return
      }
    }
    return Promise.reject(err)
  },
)

//401
async function refreshAccessToken() {
  const response = await instance.post('/refreshToken', {
    refreshToken: getRefreshToken(),
  })
  return response
}

const responseBody = (response: any) => response.data

const User = {
  register: (user: any) => instance.post('/register', user).then(responseBody),
  login: (user: any) => instance.post('/login', user).then(responseBody),
  ws: () => instance.get('/ws').then(responseBody),
  getAllUsers: () => instance.get('/getAllUsers').then(responseBody),
  logout: (userId: string) => instance.post(`/logout/${userId}`).then(responseBody),
  changePassword: (user: any) => instance.post('/changePassword', user).then(responseBody),
  updateProfile: (user: any) => instance.post('/updateProfile', user).then(responseBody),
  updateUser: (user: any) => instance.post('/updateUser', user).then(responseBody),
  deleteUser: (id: string) => instance.delete(`/deleteUser/?userId=${id}`),
}

async function handleApiRequest(request: Promise<any>) {
  try {
    const response = await request
    return { response }
  } catch (error: any) {
    return { error: error.response || error.message }
  }
}

export async function register(user: any) {
  return handleApiRequest(User.register(user))
}

export async function login(user: any) {
  return handleApiRequest(User.login(user))
}

export async function ws() {
  return handleApiRequest(User.ws())
}

export async function getAllUsers() {
  return handleApiRequest(User.getAllUsers())
}

export async function logout(userId: string) {
  return handleApiRequest(User.logout(userId))
}

export async function changePassword(user: any) {
  return handleApiRequest(User.changePassword(user))
}

export async function updateProfile(user: any) {
  return handleApiRequest(User.updateProfile(user))
}

export async function updateUser(user: any) {
  return handleApiRequest(User.updateUser(user))
}

export async function deleteUser(id: string) {
  return handleApiRequest(User.updateUser(id))
}
