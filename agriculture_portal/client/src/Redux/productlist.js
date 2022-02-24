let productState = {
  productList: [],
  machineList: [],
  machineListCopy: [],
  productListCopy: [],
  grainList: [],
  grainListCopy: [],
  cart: [],
};

function productList(state = productState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    //to add machine
    case "add_machine":
      stateCopy.machineList = [...action.payload];
      stateCopy.machineListCopy = [...action.payload];
      return stateCopy;

    case "load_machine":
      stateCopy.machineList = [...state.machineList, ...action.payload];
      stateCopy.machineListCopy = [...state.machineListCopy, ...action.payload];
      return stateCopy;

    // to add product
    case "add_product":
      stateCopy.productList = [...action.payload];
      stateCopy.productListCopy = [...action.payload];
      return stateCopy;

    case "load_product":
      stateCopy.productList = [...state.productList, ...action.payload];
      stateCopy.productListCopy = [...state.productListCopy, ...action.payload];
      return stateCopy;

    // to add product
    case "add_grain":
      stateCopy.grainList = [...action.payload];
      stateCopy.grainListCopy = [...action.payload];
      return stateCopy;

    case "load_grain":
      stateCopy.grainList = [...state.grainList, ...action.payload];
      stateCopy.grainListCopy = [...state.grainListCopy, ...action.payload];
      return stateCopy;

    //to filter grain on price
    case "filter_grain_price":
      var price = parseInt(action.payload);
      var priceFiltered = stateCopy.grainList.filter((value) => {
        return value.price <= price;
      });
      stateCopy.grainListCopy = [...priceFiltered];
      return stateCopy;

    //to filter machine on price
    case "filter_machine_price":
      var price = parseInt(action.payload);
      var priceFiltered = stateCopy.machineList.filter((value) => {
        return value.price <= price;
      });
      stateCopy.machineListCopy = [...priceFiltered];
      return stateCopy;

    //to filter productlist on price
    case "filter_product_price":
      var price = parseInt(action.payload);

      var priceFiltered = stateCopy.productList.filter((value) => {
        return value.price <= price;
      });
      stateCopy.productListCopy = [...priceFiltered];
      return stateCopy;

    //filter based upon targetplant for grain and fruits
    case "filter_grain_targetplant":
      var targetCropFiltered = stateCopy.grainList.filter((value) => {
        return value.productName.toLowerCase() === action.payload.toLowerCase();
      });
      stateCopy.grainListCopy = [...targetCropFiltered];
      return stateCopy;

    //filter based upon targetplant for machine
    case "filter_machine_targetplant":
      var targetCropFiltered = stateCopy.machineList.filter((value) => {
        return value.targetplant.toLowerCase() === action.payload.toLowerCase();
      });
      stateCopy.machineListCopy = [...targetCropFiltered];
      return stateCopy;

    //filter based upon targetplant for product
    case "filter_product_targetplant":
      var targetCropFiltered = stateCopy.productList.filter((value) => {
        return value.targetplant.toLowerCase() === action.payload.toLowerCase();
      });
      stateCopy.productListCopy = [...targetCropFiltered];
      return stateCopy;

    //filter based upon category for machine
    case "filter_machine_category":
      var categoryCropFiltered = stateCopy.machineList.filter((value) => {
        return value.productType.toLowerCase() === action.payload.toLowerCase();
      });
      stateCopy.machineListCopy = [...categoryCropFiltered];
      return stateCopy;

    //filter based upon category for product
    case "filter_product_category":
      var categoryCropFiltered = stateCopy.productList.filter((value) => {
        return value.productType.toLowerCase() === action.payload.toLowerCase();
      });
      stateCopy.productListCopy = [...categoryCropFiltered];
      return stateCopy;

    //filter based upon category for grain and fruits
    case "filter_grain_category":
      var categoryCropFiltered = stateCopy.grainList.filter((value) => {
        return value.productType.toLowerCase() === action.payload.toLowerCase();
      });
      stateCopy.grainListCopy = [...categoryCropFiltered];
      return stateCopy;

    case "clearFilter":
      if (action.payload === "product")
        stateCopy.productListCopy = [...stateCopy.productList];
      else if (action.payload === "machine")
        stateCopy.machineListCopy = [...stateCopy.machineList];
      else if (action.payload === "grain")
        stateCopy.grainListCopy = [...stateCopy.grainList];
      return stateCopy;

    case "addToCart":
      stateCopy.cart.push(action.payload);
      return stateCopy;

    case "notify":
      if (action.payload.msg == "Item Removed")
        var value = action.payload.item.id;
      stateCopy.cart = stateCopy.cart.filter((item) => item.id !== value);
      return stateCopy;

    default:
      return state;
  }
}
export default productList;
