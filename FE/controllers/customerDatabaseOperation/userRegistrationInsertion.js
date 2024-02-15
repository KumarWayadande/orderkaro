const insertIntoUserRegistrationInfo =  async(mongoose, req)=>{

  const schema = require("../shopAdminDatabaseOperation/TemporaryDatabaseOperation/schemaCreator");
  const collectionReturner = require("../collectionsReturner/CollectionsReturner.js");

  let userRegistrationInfoCLS = collectionReturner.getUserRegistrationInfoCLS(mongoose);
  
  // Create an instance of model SomeModel
  // const instance = new shopAdminCollection({fName: , lName:"Wayadande", phoneNo:7219733341, address:"market Yard Pune 411037"});
  const instance = new userRegistrationInfoCLS({ 
            userName:req.body.userName,
            pincode: req.body.pincode,
            email:req.body.userEmail,
            password:req.body.password
      });
    
    // console.log(userDetails);
    // Save the new model instance, passing a callback
    
    // console.log(instance.save());
    await instance.save().then()  
    .catch(err => console.log(err));

  
    // const variableEraser = require("./eraseVariables");
    // variableEraser.variableEraser(adminDetails, shopDetails, bankDetails);   
}


module.exports.insertIntoUserRegistrationInfo = insertIntoUserRegistrationInfo;