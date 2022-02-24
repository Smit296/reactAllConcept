let initialState = {
  type: '',
  msg: 'Welcome to our website!',
  reset: 1
}

export default function movie(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {

    case 'notify':
      stateCopy.type = payload.type;
      stateCopy.msg = payload.msg;
      stateCopy.reset += 1;
      return stateCopy;

    default: return stateCopy;
  }
}