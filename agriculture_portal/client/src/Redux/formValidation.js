let initialState = {
  registered: false
};

export default function Validate(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "error":
      stateCopy = payload;
      return stateCopy;
    case "resetError":
      stateCopy.email = stateCopy.password = stateCopy.password2 = stateCopy.mobile = stateCopy.name = null
      return stateCopy;
    case "registered":
      stateCopy.registered = true
      return stateCopy;
  }
  return state;
}