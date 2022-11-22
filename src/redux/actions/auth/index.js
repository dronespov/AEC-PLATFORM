// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('auth', JSON.stringify(data.user))
    if (data.token) {
      localStorage.setItem('token', data.token)
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
    localStorage.removeItem('auth')
    localStorage.removeItem('token')
    //localStorage.removeItem(config.storageTokenKeyName)
    //localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
