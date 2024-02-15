
const collectionReturner = require("./../../collectionsReturner/CollectionsReturner.js");

const getConnection  = async(dbName)=>{
    // Import the mongoose module
    var mongoose = require("mongoose");
    // Define the database URL to connect to.
    const mongoDB = "mongodb://127.0.0.1/"+dbName;    
    var conn = await mongoose.createConnection(mongoDB);
    console.log("Connection created");
    return conn;
}

const insertIntoAdminCL =  async(adminDetails, bankDetails, shopDetails, mongoose, res)=>{

  let adminCLS = collectionReturner.getAdminCLS(mongoose);
  const instance = new adminCLS({ 
   
    fName:adminDetails.shopAdminFirstName,
    lName:adminDetails.shopAdminLastName,
    phoneNo:adminDetails.adminPhoneNumber,
    address:adminDetails.adminAddress,
    email:adminDetails.adminEmail,
    password:adminDetails.password,
    
  //    Shop Details
    legalName:shopDetails.shopName,
    gstinNo:shopDetails.gstinNumber,
    pincode:shopDetails.pincode,
    shopAddress:shopDetails.shopAddress,
    ShopEmail:shopDetails.shopEmail,
    shopPhoneNo:shopDetails.shopPhoneNumber,

    panNo:shopDetails.panNo,
    tradeName:shopDetails.tradeName,
    constiOfBusiness:shopDetails.constiOfBusiness,
    taxPayerType:shopDetails.taxPayerType,
    pPlaceOfBusiness:shopDetails.pPlaceOfBusiness,

  //  bank Details
    accHolderName:bankDetails.accountHolderName,
    accNo : bankDetails.bankAccountNumber,
    bankEmail:bankDetails.bankEmail,
    bankName:bankDetails.bankName,
  
    isAccountActivated:true
            
    });
    
    // Save the new model instance, passing a callback
    
    // console.log(instance.save());
    instance.save().then(()=>res.redirect("/mail"))  
    .catch(err => console.log(err));

    const variableEraser = require("./eraseVariables");
    variableEraser.variableEraser(adminDetails, shopDetails, bankDetails);   
}



const insertIntoProductsCL =  async(req, mongoose, res)=>{

  let productsCLS = collectionReturner.getProductsCLS(mongoose);
  const instance = new productsCLS({ 
   
    productName: req.body.productName,
    pricePerQty: req.body.pricePerQty,
    productImageLink: req.body.productImageLink,
    description:req.body.description,
    inStock:true
            
    });
    
    // Save the new model instance, passing a callback
    
    // console.log(instance.save());
    instance.save().then(()=>res.render("insertProductPage", {Title:"Insert Products", flag:true}))  
    .catch(err => console.log(err));

    // const variableEraser = require("./eraseVariables");
    // variableEraser.variableEraser(adminDetails, shopDetails, bankDetails);   
}

const getProductDetails = async(mongoose)=>{

    let productsCLS = collectionReturner.getProductsCLS(mongoose);

    productList = await productsCLS.find({}).lean().exec();

    return productList;

}

const deleteProduct = async(req, mongoose, res)=>{

  let productsCLS = collectionReturner.getProductsCLS(mongoose);
  result = await productsCLS.findByIdAndDelete(req.params.customURL).lean().exec().then((result)=>{
    res.redirect("/updateProductPage");
  });

}

const getRegisteredAdminInfo = async(mongoose, req)=>{

    adminCLS= collectionReturner.getAdminCLS(mongoose);
    var query = { 
          gstinNo:req.body.gstinNo,
          password:req.body.adminPassword,
          isAccountActivated:true
    };

    results = await adminCLS.find(query, "gstinNo password isAccountActivated fName lName phoneNo address email pincode shopAddress ShopEmail shopPhoneNo").lean().exec();    
    // console.log(results);
    return results;
}
const updateProductCLS = async(req, mongoose, res)=>{

  let productsCLS = collectionReturner.getProductsCLS(mongoose);

  const instance = {
   
    productName: req.body.productName,
    pricePerQty: req.body.pricePerQty,
    productImageLink: req.body.productImageLink,
    description:req.body.description,
    inStock:true
    };
console.log("Inside Update");
  // result = await productsCLS.findByIdAndDelete(req.params.customURL).lean().exec().then((result)=>{
    result = await productsCLS.findOneAndUpdate({_id:req.params.customURL}, instance, null).lean().exec().then((result)=>{
      res.redirect("/updateProductPage");
    })
    .catch((err)=>{
      console.log("Error");
    });
}

const getSingleProductDetails = async (req, mongoose, res)=>{

    let productsCLS = collectionReturner.getProductsCLS(mongoose);

    var query = { 
      _id: req.params.customURL
    };

    results = await productsCLS.find(query).lean().exec();    
    return results;
}


const getAdminEmailByPincode = async(req, mongoose, res, userPincode)=>{
  adminCLS= collectionReturner.getAdminCLS(mongoose);
    var query = { 
          pincode:userPincode,
          isAccountActivated:true
    };

    results = await adminCLS.find(query, "ShopEmail").lean().exec();    
    console.log(results);
    return results;
}
module.exports.getRegisteredAdminInfo = getRegisteredAdminInfo;
module.exports.insertIntoAdminCL = insertIntoAdminCL;
module.exports.insertIntoProductsCL = insertIntoProductsCL;
module.exports.getConnection = getConnection;
module.exports.getProductDetails = getProductDetails;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProductCLS = updateProductCLS;
module.exports.getSingleProductDetails= getSingleProductDetails;
module.exports.getAdminEmailByPincode=getAdminEmailByPincode;

