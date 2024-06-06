//LS

export function setSelectedUser(user: any) {
  localStorage.setItem('selectedUser', JSON.stringify(user))
}

export function getSelectedUser() {
  const selectedUser = localStorage.getItem('selectedUser')
  return selectedUser ? JSON.parse(selectedUser) : null
}

export function removeSelectedUser() {
  localStorage.removeItem('selectedUser')
}

//

export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token)
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token)
}

export function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken')
}

export function removeTokens() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('selectedUser')
}