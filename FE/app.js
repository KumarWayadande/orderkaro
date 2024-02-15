const express = require("express");
const prepareString = require('./controllers/shopAdminDatabaseOperation/prepareString');
const List = require("collections/list");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const sendMail = require("./controllers/sendEmail");
const TemporaryDatabaseOperation = require("./controllers/shopAdminDatabaseOperation/TemporaryDatabaseOperation/tempDBOperations.js");
const schemaCreator = require("./controllers/shopAdminDatabaseOperation/TemporaryDatabaseOperation/schemaCreator.js");
var session = require('express-session');   // to pass data from one router to another router we use express session
const loginCheckerModule = require("./controllers/customerDatabaseOperation/userLoginChecker.js");
const customerDatabaseOperation =  require("./controllers/customerDatabaseOperation/userRegistrationInsertion.js")
// var { default: mongoose, Mongoose } = require("mongoose");
// const collectionReturner = require("./controllers/collectionsReturner/CollectionsReturner.js")


// const e = require("express");
// var popup = require('popups');
// const alert = require('alert');
// const Search = require(__dirname + "/findTitle.js")
// const popup = require("popups");

// Initial Configuration
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/product/:customURL",express.static("public"));
app.use("/product/update/:customURL",express.static("public"));
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

/* 
    ------------------
      Global variables
    ------------------ 
*/
var adminDetails = {
    shopAdminFirstName:"",
    shopAdminLastName:"",
    adminEmail:"",
    adminPhoneNumber:"",
    adminAddress:"",
    password:""
};

var DESTINATION_EMAIL="";
var userPincode= 0;
var bankDetails = {
    accountHolderName:"",
    bankName:"",
    bankAccountNumber:"",
    bankEmail:""
};

var shopDetails = {
    gstinNumber:"",
    pincode:"",
    legalName:"",
    shopAddress:"",
    shopEmail:"",
    shopPhoneNumber:"",
    panNo:"",
    tradeName:"",
    constiOfBusiness:"",
    pPlaceOfBusiness:"",
    taxPayerType:"",
    isAdhaarAuthenticated:"",
    isKycAuthenticated:"",
    firstCondition:"",
    secondCondition:""
};

var userAddressDetails = {
    fullAddress:"",
    pathWay:"",
    city:"",
    state:"",
    nearestLocation:""
};

var cart;
var loggedAdminInfo;
var loggedUserInfo ;
/* 
    ------------------
      End of Global variables
    ------------------ 
*/ 

app.get("/", function(req, res){
    // Retrive data form database and set city
    res.render("index", {Title:"OrderKaro | Grocery Ordering System", city:"Pune"});
});

app.get("/shopAdminRegister", (req, res)=>{
    res.render("createOrLogin", {Title:"Shop Approval Form"});
})

app.get("/shopCreationPage", (req, res)=>{
    res.render("shopCreationForm", {Title:"Shop Verification"});
});

// To send email this route is used and sendMail() function is used
app.get("/mail", function(req, res){
    message ="Your request is received by us and you will be notified for further notifications after we verify all your details.";
    subject="Request Verification";
    sendMail(DESTINATION_EMAIL, message, subject).then(result => res.render("successfullPage"))
    .catch(error=>res.send("Error has occured"))
});

app.get("/loginAndRegistrationPage", (req, res)=>{
    resultMessage = req.session.resultMessage;
    res.render("Login_And_Registration_Page", {Title:"OrderKaro | SignUp/SignIn Form for user", resultMessage:resultMessage});
});

app.get("/shopAdminLogin", (req, res)=>{
    resultMessage = req.session.resultMessage;
    res.render("shopAdminLoginPage",{Title:"Shop Admin Login", resultMessage:resultMessage});
});

app.get("/displayLoggedUserInfo", (req, res)=>{
    loggedUserInfo = null;
    res.redirect("/");
});
app.post("/shopCreationValidation", (req, res)=>{
    adminDetails.shopAdminFirstName=req.body.shopAdminFirstName;
    adminDetails.shopAdminLastName=req.body.shopAdminLastName;
    adminDetails.adminAddress=req.body.adminAddress;
    adminDetails.adminEmail=req.body.adminEmail;
    adminDetails.adminPhoneNumber=req.body.adminPhoneNumber;
    adminDetails.password = req.body.password;

    bankDetails.accountHolderName=req.body.accountHolderName;
    bankDetails.bankEmail=req.body.bankEmail;
    bankDetails.bankName=req.body.bankName;
    bankDetails.bankAccountNumber=req.body.bankAccountNumber;

    shopDetails.gstinNumber=req.body.gstinNumber;
    shopDetails.pincode=req.body.pincode;
    shopDetails.legalName=req.body.legalName;
    shopDetails.shopAddress=req.body.shopAddress;
    shopDetails.shopEmail=req.body.shopEmail;
    shopDetails.shopPhoneNumber=req.body.shopPhoneNumber;

    shopDetails.panNo=req.body.panNo;
    shopDetails.tradeName= req.body.tradeName;
    shopDetails.constiOfBusiness=req.body.constiOfBusiness;
    shopDetails.taxPayerType=req.body.taxPayerType;
    shopDetails.pPlaceOfBusiness=req.body.pPlaceOfBusiness;
    shopDetails.isAdhaarAuthenticated=req.body.AadhaarAuthentication;
    shopDetails.isKycAuthenticated=req.body.KYCAuthentication;

        /* 
            Store data into Database 
            Send emails to  platform owners
            Erase all the details 
        */

        DESTINATION_EMAIL = adminDetails.adminEmail;
        TemporaryDatabaseOperation.getConnection("shopVerificationRequestsDB").then((mongoose)=>{
            adminCLSchema = schemaCreator.getAdminCLSSchema;
            TemporaryDatabaseOperation.insertIntoAdminCL(adminDetails, bankDetails, shopDetails, mongoose, res);
        });
});


app.post("/userRegistration", (req, res)=>{   
    var arrResults = new Array();
    TemporaryDatabaseOperation.getConnection("UserRegistrationDatabase").then((mongoose)=>{
        loginCheckerModule.registeredUserInfoRetrieval(req, mongoose).then((results)=>{
            if(loginCheckerModule.isAlreadyRegistered(results) == true){
                req.session.resultMessage = "You are already Registered User | Please Login to go ahead";
                res.redirect("/loginAndRegistrationPage");
            }
            else{                
                customerDatabaseOperation.insertIntoUserRegistrationInfo(mongoose, req).then((result)=>{
                    req.session.resultMessage = "You are now registered successfully";
                    res.redirect("/loginAndRegistrationPage");
                });     
            } 
        });     
    });  
});

app.post("/userLogin", (req, res)=>{

    TemporaryDatabaseOperation.getConnection("UserRegistrationDatabase").then((mongoose)=>{    
        loginCheckerModule.loginInfoRetrieval(req, mongoose).then((results)=>{
            loggedUserInfo = new Array();
            loggedUserInfo = results;
            if(loginCheckerModule.isLoggedIn(loggedUserInfo) == true){
                cart = new Array();
                userPincode = loggedUserInfo[0].pincode;
                res.redirect("/");
            }
            else{
                req.session.resultMessage = "Wrong Email or Password";
                res.redirect("/loginAndRegistrationPage");
            }
        });
    });    
});

app.post("/shopAdminLogin", (req, res)=>{   
        TemporaryDatabaseOperation.getConnection("shopVerificationRequestsDB").then((mongoose)=>{
        TemporaryDatabaseOperation.getRegisteredAdminInfo(mongoose, req).then((results)=>{
            loggedAdminInfo = new Array();
            loggedAdminInfo = results;
            if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
                // res.send("Here you will see another page especially designed for you to manipulate products");
                res.redirect("/homePageShopAdmin");
                // console.log(loggedAdminInfo);
            }
            else{
                req.session.resultMessage = "Wrong Email or Password";
                res.redirect("/shopAdminLogin");
            }
        });
    });
})


/* 
    Routes being developed 
    for shop admin portal.
*/

app.get("/homePageShopAdmin", (req, res)=>{
    if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
        res.render("homePageShopAdmin",{Title:"Shop Admin Portal"});
    }
    else{
        res.send("Please Login");
    }
});

app.get("/insertProductPage", (req, res)=>{
    res.render("insertProductPage", {Title:"Insert Products", flag:false});
});

app.get("/shopAdminLogOut", (req, res)=>{
    res.redirect("/");
})

app.get("/updateProductPage", (req, res)=>{

    // Call function to retrive information 
    // from databases and store it into a productList
    
    if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
        pincode = loggedAdminInfo[0].pincode;
        // console.log(pincode);

        TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
            TemporaryDatabaseOperation.getProductDetails(mongoose).then((productList)=>{
                // console.log(productList[0]._id.toHexString());
                // console.log(productList[0].toString());
                // console.log(productList[0].productName);
                res.render("displayProductsAdmin", {Title:"Update Products", productList:productList});
            });
        });
    }
    else{
        res.send("Please login");
    }
});

app.post("/insertProductPage", (req, res)=>{

    if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
        pincode = loggedAdminInfo[0].pincode;
        // console.log(pincode);

        TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
            TemporaryDatabaseOperation.insertIntoProductsCL(req, mongoose, res);
        });
    }
    else{
        res.send("Please login");
    }
})

app.post("/:customURL", (req, res)=>{
    console.log("New Id "+req.params.customURL);
    
    
    if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
        pincode = loggedAdminInfo[0].pincode;
        // console.log(pincode);
        TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
            TemporaryDatabaseOperation.deleteProduct(req, mongoose, res);
        });
     
    }
    else{
        res.send("Please login");
    }
})


app.get("/product/:customURL", (req, res)=>{
    // console.log(req.params.customURL);
    
    if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
        pincode = loggedAdminInfo[0].pincode;
        // console.log(pincode);
        TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
            TemporaryDatabaseOperation.getSingleProductDetails(req, mongoose, res).then((result)=>{
                // console.log("After pincode");
                res.render("SingleProductUpdate", {Title:"Add to Cart", productDetails1:result});
            })
            .catch((err)=>{
                console.log("Error");
            });
        }); 
    }
    else{
        res.send("Please login");
    }
})

app.post("/product/update/:customURL", (req, res)=>{
    if(loginCheckerModule.isLoggedIn(loggedAdminInfo) == true){
        pincode = loggedAdminInfo[0].pincode;
        // console.log(pincode);
        TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
            TemporaryDatabaseOperation.updateProductCLS(req, mongoose, res);
        }); 
    }
    else{
        res.send("Please login");
    }

})


/* 

    Routes being developed for 
    displaying products to the customer.
    Operations :Add to Cart,
                Billing    
                Payment Options

*/



app.post("/addToCart/:customURL", (req, res)=>{
    // console.log(req.params.customURL);
    if(loginCheckerModule.isLoggedIn(loggedUserInfo) == true){
        pincode = loggedUserInfo[0].pincode;

        flag = false;
        // To check if a product is already added or not 
        // if not then insert
        // else increment __v field by one
        for(i = 0; i < cart.length; i++){
            if(cart[i]._id.toHexString() == req.params.customURL){
                flag = true;
                break;
            }
        }


        if(flag == true){
            cart[i].__v++;
            res.redirect("/groceriesAndEssentials");
        }   
        else{
            TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
                TemporaryDatabaseOperation.getSingleProductDetails(req, mongoose, res).then((result)=>{
                    result[0].__v = 1;
                    cart.push(result[0]);
                    // console.log(cart);
                    res.redirect("/groceriesAndEssentials");
                })
                .catch((err)=>{
                    console.log("Error");
                });
            }); 
        }
        
    }
    else{
        res.send("Please login");
    }
})

app.post("/Cart/incrementQty", (req, res)=>{
    // console.log("inside route "+req.body.addBtn);

    flag = false;
    for(i = 0; i < cart.length; i++){
        if(cart[i]._id.toHexString() == req.body.addBtn){
            flag = true;
            break;
        }
    }

    cart[i].__v++;
    res.redirect("/groceriesAndEssentials");
})

app.post("/Cart/decrementQty", (req, res)=>{
    flag = false;
    for(i = 0; i < cart.length; i++){
        if(cart[i]._id.toHexString() == req.body.removeBtn){
            flag = true;
            break;
        }
    }

    if(cart[i].__v == 1){
        // cart.splice(i, 1);
        // res.redirect("/groceriesAndEssentials");   

        cartNew = new Array();

        for(j = 0; j < cart.length; j++){
            if(j != i)
                cartNew.push(cart[j]);
            else 
                continue;
        }

        cart = cartNew;
        res.redirect("/groceriesAndEssentials");
    }
    else{
        cart[i].__v--;
        res.redirect("/groceriesAndEssentials");
    }

})

app.get("/groceriesAndEssentials", (req, res)=>{
     
    if(loginCheckerModule.isLoggedIn(loggedUserInfo) == true){
        pincode = loggedUserInfo[0].pincode;
        // console.log(pincode);
        // cart = new Array();
        // cart = ["Kumar"];
        // item = {
            // _id:1234
        // }
        // cart = [item]
        // console.log(cart);
        TemporaryDatabaseOperation.getConnection(pincode).then((mongoose)=>{
            TemporaryDatabaseOperation.getProductDetails(mongoose).then((result)=>{

                var checkoutPrice = 0;

                if(cart.length != 0){
                    cart.forEach(element => {
                        checkoutPrice = checkoutPrice + (parseInt(element.pricePerQty) * parseInt(element.__v));
                    });
                }
                

                res.render("viewCart", {Title:"View Cart", productDetails:result, cart:cart, checkoutPrice:checkoutPrice});
            })
            .catch((err)=>{
                console.log("Error");
            });
        }); 
    }
    else{
        res.send("Please login");
    }

    // res.render("viewCart", {Title:"View Cart"});
})

app.get("/paymentPage", (req, res)=>{

    if(cart.length == 0){
        res.send("Please Select a product");
    }
    else
        res.render("PaymentPage", {Title:"Payment", cart: cart});
})


app.post("/paymentUserAddressDetails", (req, res)=>{
    
    userAddressDetails.fullAddress=req.body.full-address;
    userAddressDetails.pathWay=req.body.path-way;
    userAddressDetails.city=req.body.city;
    userAddressDetails.state=req.body.state;
    userAddressDetails.nearestLocation=req.body.nearest-location;


    res.redirect("/paymentPage");
})
app.get("/paymentUserAddressDetails", (req, res)=>{

    if(cart.length == 0){
        res.send("Please Select a product");
    }
    else{
        res.render("paymentUserAddressDetails"), {Title:"Payment", cart : cart};
    }
})


app.get("/paymentSuccess", (req, res)=>{
    DESTINATION_EMAIL = loggedUserInfo[0].email;
    message ="Your Order Placed Successfully With [Order ID = 2006132HFHDS]. \n Order Will Get Delivered In The Next 20 Minutes.";
    subject="Order Delivery";
    sendMail(DESTINATION_EMAIL, message, subject).then(result => res.render("paymentSuccessPage"))
    .catch(error=>res.send("Error has occured"))

    
})

app.get("/progressBar", (req, res)=>{
    console.log(userPincode);
    TemporaryDatabaseOperation.getConnection("shopVerificationRequestsDB").then((mongoose)=>{
        TemporaryDatabaseOperation.getAdminEmailByPincode(req, mongoose, res, userPincode).then(result=>{
                if(result.length != 0){
                    subject="Order Request";
                    console.log(loggedUserInfo);
                    // console.log(result[0].ShopEmail);
                    str = prepareString.prepareStringObject(cart, loggedUserInfo, userAddressDetails);
                    sendMail(result[0].ShopEmail, str, subject).then(result => res.render("progressBar"))
                    .catch(error=>res.send("Error has occured"))
                    cart = new Array();
                }
        });
    });
})

app.get("/orderDeliveryPage", (req, res)=>{
    res.render("delivery-page");
})

app.post("/getUserAddressDetails", (req, res)=>{
    res.send("Called");
})
app.listen(3000, function() {
    console.log("Server started on port 3000");
});


