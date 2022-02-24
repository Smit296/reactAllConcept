import axios from "axios";

let Action = {};
const link = {
  login: "/user/login",
  user: "/user/",
  token: "/user/tokenverify",
  google: "/user/google",
  companyR: "/company/",
  productR: "/product/",
  userProduct: "/conprd/",
  join: "/join/",
  address: "/address/",
  seller: "/join/product/"
};

const notify = {
  type: "notify",
  payload: {
    type: "warn",
    msg: "Some Error",
  },
};

Action.join = (id) => {
  return async (dispatch) => {
    let data = await axios(`${link.join}${id}`);
    if (data.data.id)
      dispatch({
        type: "login",
        payload: data.data,
      });
    else dispatch({ type: "" });
  };
};

Action.register = (data) => {
  return (async (dispatch) => {
    try {
      let value = await axios.post(link.user, data);
      if (value.data.email) {
        dispatch({ type: "registered" });
        dispatch({
          type: "resetError",
        })
      }
      else dispatch({
        type: "notify",
        payload: {
          type: "warn",
          msg: "Email or Mobile Already in Use",
        }
      })
    }
    catch (error) {
      dispatch({
        type: "error",
        payload: error.response.data,
      });
    }
  });
};

Action.login = (data) => {
  return async (dispatch) => {
    try {
      let value = await axios.post(link.login, data);
      localStorage.setItem("token", value.data.token);
      if (value.data.data) {
        dispatch({
          type: "login",
          payload: value.data.data,
        });
        dispatch({
          type: "resetError",
        })
      }
      else dispatch({
        type: "warn",
        msg: "Sorry Some Internal Error",
      });
    }
    catch (error) {
      dispatch({
        type: "error",
        payload: error.response.data,
      });
    }
  };
};

Action.google = (data) => {
  return async (dispatch) => {
    let value = await axios.post(link.google, data);
    localStorage.setItem("token", value.data.token);
    if (value.data.data)
      dispatch({
        type: "login",
        payload: value.data.data,
      });
    else dispatch(notify);
  };
};

Action.token = (token) => {
  return async (dispatch) => {
    let data = await fetch(link.token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    if (data) {
      dispatch({
        type: "login",
        payload: data,
      });
    } else dispatch({ type: "" });
  };
};

Action.logout = () => {
  localStorage.removeItem("token");
  return { type: "logout" };
};

Action.companyRegister = (data, id) => {
  return async (dispatch) => {
    let company = await axios.post(link.companyR, data);
    let value = await axios.put(`${link.user}${id}`, {
      companyId: company.data.id,
    });
    if ((value.data[0] = 1)) dispatch({ type: "register" });
    else dispatch(notify);
  };
};

Action.productregister = (data, id) => {
  return async (dispatch) => {
    let product = await axios.post(link.productR, data);
    let value = await axios.post(link.userProduct, {
      connectType: "myproduct",
      userId: id,
      productId: product.data.id,
    });
    if ((value.data[0] = 1)) dispatch({ type: "register" });
    else dispatch(notify);
  };
};

Action.profileEdit = (user, address, id, addressId) => {
  return async (dispatch) => {
    let userData = await axios.put(`${link.user}${id}`, user);
    if (!addressId) {
      let res = await axios.post(link.address, address);
      let value = await axios.put(`${link.user}${id}`, {
        addressId: res.data.id,
      });
      dispatch({
        type: "notify",
        payload: {
          type: "success",
          msg: "Profile Updated",
        }
      });
    } else {
      let res = await axios.put(`${link.address}${addressId}`, address);
      dispatch({
        type: "notify",
        payload: {
          type: "success",
          msg: "Profile Updated",
        }
      });
    }
  };
};

Action.addCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      let middleT = await axios(`${link.userProduct}user/${userId}/${productId}`)
      if (middleT.data) {
        let userProduct = await axios.put(`${link.userProduct}${middleT.data.id}`, {
          status: false,
          cart: parseInt(middleT.data.cart) + 1
        });
      }
      else {
        let value = await axios.post(link.userProduct, {
          connectType: "booked",
          userId: userId,
          productId: productId,
          cart: 1
        });
      }
      let data = await axios(`${link.join}${userId}`);
      if (data.data.id)
        dispatch({
          type: "login",
          payload: data.data,
        });
      dispatch({
        type: "notify",
        payload: {
          type: "success",
          msg: "Added To Cart",
        }
      });
    }
    catch (err) {
      dispatch(notify);
    }
  };
};

Action.minusCount = (userId, productId) => {
  return async (dispatch) => {
    try {
      let middleT = await axios(`${link.userProduct}user/${userId}/${productId}`)
      let userProduct = await axios.put(`${link.userProduct}${middleT.data.id}`, {
        status: false,
        cart: parseInt(middleT.data.cart) - 1
      });

      let data = await axios(`${link.join}${userId}`);
      if (data.data.id)
        dispatch({
          type: "login",
          payload: data.data,
        });
      dispatch({
        type: "notify",
        payload: {
          type: "warn",
          msg: "Removed 1 Quantity",
        }
      });
    }
    catch (err) {
      dispatch(notify);
    }
  };
}

Action.removeCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      let middleT = await axios(`${link.userProduct}user/${userId}/${productId}`)
      let userProduct = await axios.put(`${link.userProduct}${middleT.data.id}`, {
        status: true,
        cart: 0
      });
      let data = await axios(`${link.join}${userId}`);
      if (data.data.id)
        dispatch({
          type: "login",
          payload: data.data,
        });
      dispatch({
        type: "notify",
        payload: {
          type: "warn",
          msg: "Removed From Cart",
        }
      });
    }
    catch (err) {
      dispatch(notify);
    }
  };
}

Action.placeOrder = (userId, productIds, email) => {
  return async (dispatch) => {
    try {
      await Promise.all(productIds.map(async (id) => {
        let product = await axios(`${link.userProduct}product/${userId}/${id}`)
        let userProduct = await axios.put(`${link.userProduct}${id}`, {
          connectType: "booked",
          status: true,
          cart: 0,
          count: parseInt(product.data.count) + parseInt(product.data.cart)
        });
        if (userProduct.data) {
          let seller = await axios(`${link.seller}${product.data.product.id}`);
          let connectedP = await axios(`${link.userProduct}${seller.data.connect_products[0].id}`);
          let sellerProduct = await axios.put(`${link.userProduct}${seller.data.connect_products[0].id}`, {
            status: true,
            count: parseInt(connectedP.data.count) + parseInt(product.data.cart),
          });
        }
      }))
      dispatch({
        type: "notify",
        payload: {
          type: "success",
          msg: "Placed Succefully",
        }
      });
      await axios(`/user/order/${email}`);
    }
    catch (err) {
      dispatch(notify);
    }
  }
}

Action.deleteProduct = (id, conId, userId) => {
  return (async (dispatch) => {
    try {
      let product = await axios.delete(`${link.productR}${id}`);
      if (product.data) {
        await axios.delete(`${link.userProduct}${conId}`);
        let data = await axios(`${link.join}${userId}`)
        dispatch({
          type: "login",
          payload: data.data,
        });
        dispatch({
          type: "notify",
          payload: {
            type: "error",
            msg: "Deleted",
          }
        })
      }
    }
    catch (error) {
      dispatch(notify);
    }
  });
};

export default Action;
