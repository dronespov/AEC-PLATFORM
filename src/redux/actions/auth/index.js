// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  console.log(data)
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data.data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data.data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    const user = data.data.user
    user['is_remember'] = data.remember
    window.localStorage.is_remember = JSON.stringify(data.remember)
    if (data.remember) {
      localStorage.setItem('auth', JSON.stringify(user))
      if (data.data.token) {
        localStorage.setItem('token', data.data.token)
      }
    } else {
      sessionStorage.setItem('auth', JSON.stringify(user))
      if (data.data.token) {
        sessionStorage.setItem('token', data.data.token)
      }
    }

    //localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.token))
    //localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.token))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    const type = JSON.parse(localStorage.getItem('is_remember'))
    if (type) {
      localStorage.removeItem('token')
      localStorage.removeItem('auth')
    } else {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('auth')
    }
    //localStorage.removeItem(config.storageTokenKeyName)
    //localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
