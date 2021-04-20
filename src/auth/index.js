export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function login(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getUsername() {
  return fetch("https://peaceful-spire-60083.herokuapp.com/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

//user information 
export function getUser() {
  const user = localStorage.getItem("user");
  console.log(user)
  return user;
}

export function user(result) {
  localStorage.setItem("user", result);
  console.log(result)
}

export function removeUser() {
  localStorage.removeItem("user");
}

//userId
export function setUserIdLocal(result) {
  localStorage.setItem("userId", result);
  console.log(result)
}

export function getUserId() {
  const userId = localStorage.getItem("userId");
  console.log(userId)
  return userId;
}

export function removeUserId() {
  localStorage.removeItem("userId");
}

//products for checkout for guests 

// export function addProduct() {
//   let products = [];
//   if(localStorage.getItem('products')){
//       products = JSON.parse(localStorage.getItem('products'));
//   }
//   products.push({'productId' : productId, 'productTitle' : productTitle, 'count' : 1});
//   localStorage.setItem('products', JSON.stringify(products));
// }

export function getProductForGuests() {
  const products = JSON.parse(localStorage.getItem('products'));
  return products;
}

export function removeGuestProducts() {
  localStorage.removeItem("products");
}

// export function removeProduct() {
//   let storageProducts = JSON.parse(localStorage.getItem('products'));
//   let products = storageProducts.filter(product => product.productId !== productId );
//   localStorage.setItem('products', JSON.stringify(products));
// }
