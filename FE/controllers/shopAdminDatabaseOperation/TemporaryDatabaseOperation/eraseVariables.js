
const variableEraser = (adminDetails, shopDetails, bankDetails)=>{

        // --------------------------
        // Remove filled input fields
        // --------------------------


        adminDetails.shopAdminFirstName="";
        adminDetails.adminEmail="";
        adminDetails.adminPhoneNumber="";
        adminDetails.shopAdminLastName="";
        adminDetails.adminAddress="";

        bankDetails.accountHolderName="";
        bankDetails.additionInformation="";
        bankDetails.bankAccountNumber="";
        bankDetails.bankEmail="";
        bankDetails.bankName="";

        shopDetails.gstinNumber="";
        shopDetails.pincode="";
        shopDetails.shopAddress="";
        shopDetails.shopEmail="";
        shopDetails.shopPhoneNumber="";


        // --------------------------
        // Remove filled input fields
        // --------------------------
        
}

module.exports.variableEraser = variableEraser;