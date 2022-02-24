let initialState = {
  currentUser: {},
  Authenticated: undefined,
};

export default function user(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "register":
      return stateCopy;

    case "login":
      stateCopy.currentUser = payload;
      stateCopy.Authenticated = true;

      return stateCopy;

    case "logout":
      stateCopy.Authenticated = false;
      stateCopy.currentUser = {};
      return stateCopy;

    //not required
    case "company-register":
      stateCopy.currentUser.address = payload;
      return stateCopy;
    //not required
    case "productregister":
      stateCopy.currentUser.product = payload;
      return stateCopy;

    default:
      return stateCopy;
  }
}
