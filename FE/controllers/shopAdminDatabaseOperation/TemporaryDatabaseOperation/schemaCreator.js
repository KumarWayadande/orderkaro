const mongoose = require('mongoose')
module.exports.getAdminCLSSchema = mongoose.Schema({
    // Admin details
      fName: { type: String, lowercase: true, trim: true },
      lName: String,
      phoneNo: Number,
      address: String,
      email: mongoose?.Schema?.Types?.Mixed,
      password: mongoose?.Schema?.Types?.Mixed,

      //    Shop Details
      legalName:mongoose?.Schema?.Types?.Mixed,
      gstinNo: mongoose?.Schema?.Types?.Mixed,
      pincode: String,
      shopAddress: mongoose?.Schema?.Types?.Mixed,
      ShopEmail: mongoose?.Schema?.Types?.Mixed,
      shopPhoneNo: Number,
      panNo:mongoose?.Schema?.Types?.Mixed,
      tradeName:mongoose?.Schema?.Types?.Mixed,
      constiOfBusiness:mongoose?.Schema?.Types?.Mixed,
      taxPayerType:String,
      pPlaceOfBusiness:mongoose?.Schema?.Types?.Mixed,

      //  bank Details
      accHolderName: String,
      accNo: mongoose?.Schema?.Types?.Mixed,
      bankEmail: mongoose?.Schema?.Types?.Mixed,
      bankName: mongoose?.Schema?.Types?.Mixed,
      isAccountActivated:Boolean
});

module.exports.getUserRegistrationInfoCLSchema = mongoose.Schema({
    // User details
      userName: { type: String, lowercase: true, trim: true },
      pincode: Number,
      email: mongoose?.Schema?.Types?.Mixed,
      password:mongoose?.Schema?.Types?.Mixed
});

module.exports.getProductsCLSchema = mongoose.Schema({
  // User details
    productName: { type: String, lowercase: true, trim: true },
    pricePerQty: Number,
    productImageLink: mongoose?.Schema?.Types?.Mixed,
    description:mongoose?.Schema?.Types?.Mixed,
    inStock:Boolean
});