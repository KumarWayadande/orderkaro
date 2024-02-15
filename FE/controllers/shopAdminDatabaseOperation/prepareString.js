const prepareStringObject = (cart, userLoggedInfo, userAddressDetails) => {
  str = "";
  cart.forEach((element) => {
    str += "Product Name    :=> " + element.productName + "\n";
    str += "Quantiy         :=> " + element.__v + "\n";
    str += "price per qty   :=> " + element.pricePerQty + "\n";
    str += "description     :=> " + element.description + "\n";
    str += "----------------------------------------------------\n";
  });





  str += "\n User Address Details\n---------------------------------------------------\n";

  
  str += "Full Address            =>" + userAddressDetails.fullAddress+"\n";
  str += "Path Way                =>" + userAddressDetails.pathWay+"\n";
  str += "City                    =>" + userAddressDetails.city+"\n";
  str += "State                   =>" + userAddressDetails.state+"\n";
  str += "Nearest Location        =>" + userAddressDetails.nearestLocation+"\n";

  str += "\n Billing Information\n---------------------------------------------------\n";

  var total = 0;
  var totalTax = 0;
  cart.forEach((element) => {
    total = total + parseInt(element.__v * element.pricePerQty);
  });
  totalTax = total * 0.05;
  grandTotal = total + totalTax + 4.95;



  str += "Total            =>" + total.toString()+"\n";
  str += "Taxable Amount   =>" + totalTax.toString()+"\n";
  str += "Grand Total      =>" + grandTotal.toString()+"\n";


  
  

  return str;
};

module.exports.prepareStringObject = prepareStringObject;
