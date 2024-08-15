export function getTokenFromLocalStorage() {
    const data = localStorage.getItem('token');


    const token = data ? JSON.parse(data) : '';

    console.log(token)
    return token
}


export function setTokenToLocalStorage(token) {

    localStorage.setItem('token', JSON.stringify(token))
}


export function removeTokenFromLocalStorage() {
    localStorage.removeItem('token')

}