let bankdata = {
  loanList: {},
  adminlogin: false,
};

function bankState(state = bankdata, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "add_loanlist":
      stateCopy.loanList = { ...action.payload };
      return stateCopy;

    default:
      return state;
  }
}
export default bankState;
