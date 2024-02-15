const getAdminCLS = (mongoose)=>{

    const schema = require("../shopAdminDatabaseOperation/TemporaryDatabaseOperation/schemaCreator.js");

    let adminCLS
    try{
      adminCLS = mongoose.model("adminCLS");
    }
    catch(error){
      adminCLS = mongoose.model("adminCLS", schema.getAdminCLSSchema);
    }

    return adminCLS
}


const getUserRegistrationInfoCLS = (mongoose) => {


    const schema = require("../shopAdminDatabaseOperation/TemporaryDatabaseOperation/schemaCreator.js");
    let userRegistrationInfoCLS

    try {
        userRegistrationInfoCLS = mongoose.model("userRegistrationInfoCLS");
    }
    catch (error) {
      // console.log("Schema Created Again");
        userRegistrationInfoCLS = mongoose.model("userRegistrationInfoCLS", schema.getUserRegistrationInfoCLSchema);
    }

    return userRegistrationInfoCLS;
}

const getProductsCLS = (mongoose)=>{

  const schema = require("../shopAdminDatabaseOperation/TemporaryDatabaseOperation/schemaCreator.js");

  let productsCLS
  try{
    productsCLS = mongoose.model("products");
  }
  catch(error){
    productsCLS = mongoose.model("products", schema.getProductsCLSchema);
  }

  return productsCLS
}

module.exports.getAdminCLS = getAdminCLS;
module.exports.getProductsCLS = getProductsCLS;
module.exports.getUserRegistrationInfoCLS = getUserRegistrationInfoCLS;