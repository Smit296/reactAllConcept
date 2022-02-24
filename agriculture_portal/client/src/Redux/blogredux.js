let blogdata = {
  blogList: {},
  adminlogin: false,
};

function blogState(state = blogdata, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    //to add blog
    case "bloglist":
      stateCopy.blogList = { ...action.payload };
      return stateCopy;

    case "blogdelete":
      var value = action.payload._id;
      stateCopy.blogList.data = stateCopy.blogList.data.filter(
        (item) => item._id !== value
      );
      return stateCopy;

    case "adminlogin":
      stateCopy.adminlogin = action.payload;
      return stateCopy;
    default:
      return state;
  }
}
export default blogState;
