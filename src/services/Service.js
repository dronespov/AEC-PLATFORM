import Config from '../configs/config.json'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'

const openNotification = (type, message, description) => (
    <Toast>
        <ToastHeader close={close} icon={type}>{message}</ToastHeader>
        <ToastBody> {description} </ToastBody>
    </Toast>
)

const Storage = {
    isLogedin: (para) => {
        return localStorage.getItem('token') !== null
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get: (key, value) => {
        return JSON.parse(localStorage.getItem(key))
    },
    setString: (key, value) => {
        localStorage.setItem(key, value)
    },
    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
    },
    getToken: (key, value) => {
        return (localStorage.getItem('token')) ? localStorage.getItem('token') : false
    }
}

const Service = {
    get: (para) => {
        const header = {
            "content-type": "application/json",
            accept: "application/json"
        }
        const type = JSON.parse(localStorage.getItem('is_remember'))
        let token = localStorage.getItem('token')
        if (!type) {
            token = sessionStorage.getItem('token')
        }
        if (token) {
            header["Authorization"] = `Bearer ${token}`
        }
        return fetch(Config.BASE_URL + para.url, {
            method: "GET",
            headers: header,
            body: para.body
        })
            .then((response) => {
                if (response.status === 401) {     //Unauthorized.  Invalid JWT Token
                    Storage.logout()
                    window.location.href = '/login'
                } if (response.status === 403) {     //Token Expired
                    Storage.logout()
                    openNotification('error', 'Token Expired!', 'Please login again and check')
                    window.location.href = '/login'
                } else {
                    return response.json()
                }
            }, (error) => {
                console.log(error)
                if (error === 'TypeError: NetworkError when attempting to fetch resource.') {
                    openNotification('error', 'Unable to reach server.', 'Please check your network connectivity')
                }
            })
        //.then(response => response.json());
    },
    post: (para) => {
        const header = {
            "content-type": "application/json",
            accept: "application/json"
        }
        const type = JSON.parse(localStorage.getItem('is_remember'))
        let token = localStorage.getItem('token')
        if (!type) {
            token = sessionStorage.getItem('token')
        }

        if (token) {
            header["Authorization"] = `Bearer ${token}`
        }

        return fetch(Config.BASE_URL + para.url, {
            method: "POST",
            headers: header,
            body: para.body
        })
            .then((response) => {
                if (response.status === 401) {     //Unauthorized.  Invalid JWT Token
                    Storage.logout()
                    window.location.href = '/login'
                } else {
                    return response.json()
                }
            }, (error) => {
                console.log(error)
                if (error === 'TypeError: NetworkError when attempting to fetch resource.') {
                    openNotification('error', 'Unable to reach server.', 'Please check your network connectivity')
                }
            })
        //.then(response => response.json())
    },
    patch: (para) => {
        const header = {
            "content-type": "application/json",
            accept: "application/json"
        }

        const type = JSON.parse(localStorage.getItem('is_remember'))
        let token = localStorage.getItem('token')
        if (!type) {
            token = sessionStorage.getItem('token')
        }
        if (token) {
            header["Authorization"] = `Bearer ${token}`
        }

        return fetch(Config.BASE_URL + para.url, {
            method: "PATCH",
            headers: header,
            body: para.body
        })
            .then((response) => {
                if (response.status === 401) {     //Unauthorized.  Invalid JWT Token
                    Storage.logout()
                    window.location.href = '/login'
                } else {
                    return response.json()
                }
            }, (error) => {
                console.log(error)
            })
        //.then(response => response.json())
    },
    delete: (para) => {
        const header = {
            "content-type": "application/json",
            accept: "application/json"
        }

        const type = JSON.parse(localStorage.getItem('is_remember'))
        let token = localStorage.getItem('token')
        if (!type) {
            token = sessionStorage.getItem('token')
        }
        if (token) {
            header["Authorization"] = `Bearer ${token}`
        }
        return fetch(Config.BASE_URL + para.url, {
            method: "DELETE", headers: header, body: para.body
        })
            .then((response) => {
                if (response.status === 401) {     //Unauthorized.  Invalid JWT Token
                    Storage.logout()
                    window.location.href = '/login'
                } else {
                    return response.json()
                }
            }, (error) => {
                console.log(error)
                if (error === 'TypeError: NetworkError when attempting to fetch resource.') {
                    openNotification('error', 'Unable to reach server.', 'Please check your network connectivity')
                }
            })
        //.then(response => response.json());
    },
    getImage(image) {
        return Config.MEDIA_URL + image
    }
}


export { Service, Storage }
