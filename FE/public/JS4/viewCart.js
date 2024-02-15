function incrementQty(id){
    // console.log(id);
    // alert("called"+id);
        btn = document.getElementById(id);
        
        formId = id.substring(0, 24)+"1";
        // alert(id + "\n" + formId);
        document.getElementById(formId).action="/Cart/incrementQty";
        btn.type="submit";
        document.getElementById(formId).setAttribute("method", "post");
        btn.click();
}


function decrementQty(id){
    
    btn = document.getElementById(id);
    formId = id.substring(0, 24)+"1";
    document.getElementById(formId).action="/Cart/decrementQty";
    btn.type="submit";
    document.getElementById(formId).setAttribute("method", "post");
    btn.click();
}


function redirectToPayment(){
    window.location.href = '/paymentPage';
}