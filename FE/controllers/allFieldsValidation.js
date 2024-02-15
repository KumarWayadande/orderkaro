const allFieldsValidation = (req, alertMessage)=>{

        // req.body.shopAdminFirstName == "" || req.body.shopAdminLastName == "" || req.body.adminEmail == "" || 
        // req.body.adminPhoneNumber == "" || req.body.adminAddress == "" || req.body.bankName == "" || 
        // req.body.bankAccountNumber == "" || req.body.bankEmail == "" || req.body.additionInformation == "" || 
        // req.body.gstinNumber == "" || req.body.pincode == ""  || req.body.shopName == "" || req.body.shopEmail == "" || 
        // req.body.shopPhoneNumber == "" || req.body.accountHolderName == "" || req.body.shopAddress == ""){

        if(req.body.shopAdminFirstName == ""){
            alertMessage.push("Please Enter Your First Name");
        } 
        else if(req.body.shopAdminLastName == ""){
            alertMessage.push("Please Enter Your Last Name");
        }
        else if(req.body.adminEmail== ""){
            alertMessage.push("Please Enter Your Email");
        }
        else if(req.body.adminPhoneNumber == ""){
            alertMessage.push("Please Enter Your Phone Number");
        }
        else if(req.body.adminAddress== ""){
            alertMessage.push("Please Enter Your Address");
        }
        else if(req.body.accountHolderName == ""){
            alertMessage.push("Please Enter Your Account Holder Name");
        }
        else if(req.body.bankName == ""){
            alertMessage.push("Please Enter Bank Name");
        }
        else if(req.body.bankAccountNumber == ""){
            alertMessage.push("Please Enter Your Bank Account Number");
        }
        else if(req.body.bankEmail == ""){
            alertMessage.push("Please Enter Your Bank Email");
        }
        else if(req.body.gstinNumber ==""){
            alertMessage.push("Please Enter Your GSTIN Number");
        }
        else if(req.body.pincode == ""){
            alertMessage.push("Please Enter Your Pincode");
        }
        else if(req.body.panNo == ""){
            alertMessage.push("Please Enter Your PAN Card Number");
        }
        else if(req.body.legalName == ""){
            alertMessage.push("Please Enter Your Shop Name");
        }
        else if(req.body.shopAddress == ""){
            alertMessage.push("Please Enter Your Shop Address");
        }
        else if(req.body.shopPhoneNumber == ""){
            alertMessage.push("Please Enter Your Shop Phone Number");
        }
        else if(req.body.tradeName == ""){
            alertMessage.push("Please Enter Trade Name");
        }
        else if(req.body.constiOfBusiness == ""){
            alertMessage.push("Please Enter Constitution of the business");
        }
        else if(req.body.shopEmail == ""){
            alertMessage.push("Please Enter Your Shop Email");
        }
        else if(req.body.pPlaceOfBusiness == ""){
            alertMessage.push("Please Enter Principle Place of the business");
        }
        else if(req.body.taxPayerType == ""){
            alertMessage.push("Please Enter Type of Tax Payer");
        }
        else if(req.body.adhaarRadioButton1 == ""){

        }
        // else if(req.body.AadhaarAuthentication == "select"){
        //     alertMessage.push("Please Select Whether You Have Authenticated Your Aadhar or Not");
        // }
        // else if(req.body.KYCAuthentication == "select"){
        //     alertMessage.push("Please Select Whether You Have Authenticated Your KYC or Not");
        // }
        // else if(req.body.firstCondition == false || req.body.secondCondition == false){
        //     alertMessage.push("Please accept all the terms and condtions otherwise quit the process");
        // }

        return alertMessage;
        
}


module.exports.allFieldsValidation = allFieldsValidation;