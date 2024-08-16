export function getTokenFromLocalStorage() {
    const data = localStorage.getItem('token');
    const token = data ? JSON.parse(data) : '';
    return token
}

export function setTokenToLocalStorage(token) {
    localStorage.setItem('token', JSON.stringify(token))
}

export function removeTokenFromLocalStorage() {
    localStorage.removeItem('token')

}

// ______________________________________

export function getOpenPriceFromLocalStorage() {
    const data = localStorage.getItem('openPrice');
    const openPrice = data ? JSON.parse(data) : '';
    return openPrice
}

export function setOpenPriceToLocalStorage(openPrice) {
    localStorage.setItem('openPrice', JSON.stringify(openPrice))
}


// ______________________________________


export function getIsUserEducatedFromLocalStorage() {
  const data = localStorage.getItem('isUserEducated');
  const isUserEducated = data ? JSON.parse(data) : false;
  return isUserEducated

}

export function setIsUserEducatedToLocalStorage(){
    localStorage.setItem('isUserEducated', JSON.stringify(true))
}