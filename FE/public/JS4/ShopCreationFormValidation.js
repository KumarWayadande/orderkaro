function allFieldsValidation(){
  var phoneno = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/
//   var gstinFormat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
  var gstinFormat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  var panCardNumber = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
    if(document.getElementById("shopAdminFirstName").value == "" || document.getElementById('shopAdminFirstName').value == null){
        alert("Please Enter Your First Name");
    }
    else if(document.getElementById('shopAdminLastName').value == "" || document.getElementById('shopAdminLastName').value == null){
      alert("Please Enter Your Last Name");
    }
    else if(document.getElementById('adminEmail').value == "" || document.getElementById('adminEmail').value == null){
      alert("Please Enter Your Email");
    }
    else if(document.getElementById('adminPhoneNumber').value == "" || document.getElementById('adminPhoneNumber').value == null){
      alert("Please Enter Your Phone Number");
    }
    else if(document.getElementById('adminAddress').value == "" || document.getElementById('adminAddress').value == null){
      alert("Please Enter Your Address");
    }
    else if(document.getElementById('accountHolderName').value == "" || document.getElementById('accountHolderName').value == null){
      alert("Please Enter Account Holder Name");
    }
    else if(document.getElementById('bankName').value == "" || document.getElementById('bankName').value == null){
      alert("Please Enter Bank Name");
    }
    else if(document.getElementById('bankAccountNumber').value == "" || document.getElementById('bankAccountNumber').value == null){
      alert("Please Enter Your Account Number");
    }
    else if(document.getElementById('bankEmail').value == "" || document.getElementById('bankEmail').value == null){
      alert("Please Enter Your Bank Email");
    }
    else if(document.getElementById('gstinNumber').value == "" || document.getElementById('gstinNumber').value == null){
      alert("Please Enter Shop GSTIN Number");
    }
    else if(document.getElementById('pincode').value == "" || document.getElementById('pincode').value == null){
      alert("Please Enter Pincode");
    }
    else if(document.getElementById('panNo').value == "" || document.getElementById('panNo').value == null){
      alert("Please Enter PAN Card Number");
    }
    else if(document.getElementById('legalName').value == "" || document.getElementById('legalName').value == null){
      alert("Please Enter Legal Name of the Business");
    }
    else if(document.getElementById('shopAddress').value == ""|| document.getElementById('shopAddress').value == null){
      alert("Please Enter Shop Address");
    }
    else if(document.getElementById('shopPhoneNumber').value == "" || document.getElementById('shopPhoneNumber').value == null){
      alert("Please Enter Shop Phone Number");
    }
    else if(document.getElementById('tradeName').value == "" || document.getElementById('tradeName').value == null){
      alert("Please Enter Trade Name");
    }
    else if(document.getElementById('constiOfBusiness').value == ""|| document.getElementById('constiOfBusiness').value == null){
      alert("Please Enter Constitution of the business");
    }
    else if(document.getElementById('shopEmail').value == "" || document.getElementById('shopEmail').value == null){
      alert("Please Enter Shop Email");
    }
    else if(document.getElementById('pPlaceOfBusiness').value == "" || document.getElementById('pPlaceOfBusiness').value == null){
      alert("Please Enter Principle Place of the business");
    }
    else if(document.getElementById('taxPayerType').value == "" || document.getElementById('taxPayerType').value == null){
      alert("Please Enter Tax Payer Type");
    }
    else if(document.getElementById('firstCondition').checked == false){
        alert("Please select all the terms and conditions")
    }
    else if(document.getElementById('secondCondition').checked == false){
        alert("Please select all the terms and conditions")
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('adminEmail').value) == false){
        alert("Please Enter Valid Email Address for Admin")
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('bankEmail').value) == false){
        alert("Please Enter Valid Email Address for bank")
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('shopEmail').value) == false){
        alert("Please Enter Valid Email Address for shop")
    }
    else if(phoneno.test(document.getElementById('adminPhoneNumber').value) == false){ 
      alert("Please Enter valid Phone Number for Admin")
    }
    else if(phoneno.test(document.getElementById('shopPhoneNumber').value) == false){ 
      alert("Please Enter valid Phone Number for Shop")
    }
    else if(panCardNumber.test(document.getElementById('panNo').value) == false){
        alert("Please Enter valid pan card number") 
    }
    else if(gstinFormat.test(document.getElementById('gstinNo')).value == false){
      alert("Please Enter valid GSTIN Number")
    }
    else if(document.getElementById('password').value == "" || document.getElementById('password').value == null){
      alert("Please Enter the Passsword")
    }
    else if(document.getElementById('password1').value == "" || document.getElementById('password1').value == null){
      alert("Please Confirm The Entered Password")
    }
    else if(document.getElementById('password').value != document.getElementById('password1').value){
      alert("Please Enter Matching Password")
    }
    else{
      document.getElementById('requestButton').type="submit";
      document.getElementById('requestButton').style.display="block";
      document.getElementById('submitButton').style.display="none";
    }
}
