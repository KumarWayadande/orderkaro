

const getLoggedUserDetails = ()=>{
    if(isLoggedIn() == true)
        return loggedInfoArr;
    else 
        return "Some Error has Occured";
}

const getRegisteredUserDetails = ()=>{
    if(isLoggedIn() == true)
        return registeredInfoArr;
    else 
        return "Some Error has Occured";
}

const loginInfoRetrieval = async(req, mongoose)=>{
    const collectionReturner = require("../collectionsReturner/CollectionsReturner.js");
    UserRegistrationInfoCLS = collectionReturner.getUserRegistrationInfoCLS(mongoose);
    
    var query = { 
            email: req.body.loginEmail, 
            password:req.body.loginPassword
    };
    results = await UserRegistrationInfoCLS.find(query, 'userName pincode email password').lean().exec();    
    return results;

}

const registeredUserInfoRetrieval = async(req, mongoose)=>{

    const collectionReturner = require("../collectionsReturner/CollectionsReturner.js");
    UserRegistrationInfoCLS = collectionReturner.getUserRegistrationInfoCLS(mongoose);
   
    var query = { 
            email: req.body.userEmail 
    };

    results = await UserRegistrationInfoCLS.find(query, 'email password userName userEmail').lean().exec();
    // results = UserRegistrationInfoCLS.find(query).lean().exec();
    return results;
}


const isLoggedIn = (loggedUserInfo)=>{
    if(loggedUserInfo == null){
        return false
    }
    else if(loggedUserInfo.length == 1 || loggedUserInfo > 1){
        return true;
    }
    else 
        return false;
}

const isAlreadyRegistered = (registeredInfoArr)=>{
    if(registeredInfoArr.length > 0){
        return true;
    }
    else 
        return false;
}


module.exports.isLoggedIn = isLoggedIn;
module.exports.isAlreadyRegistered = isAlreadyRegistered;
module.exports.loginInfoRetrieval = loginInfoRetrieval;
module.exports.getLoggedUserDetails = getLoggedUserDetails;
module.exports.registeredUserInfoRetrieval=registeredUserInfoRetrieval;
module.exports.getRegisteredUserDetails=getRegisteredUserDetails;