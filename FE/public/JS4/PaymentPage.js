var cardDrop = document.getElementById('card-dropdown');
var activeDropdown;
cardDrop.addEventListener('click',function(){
  var node;
  for (var i = 0; i < this.childNodes.length-1; i++)
    node = this.childNodes[i];
    if (node.className === 'dropdown-select') {
      node.classList.add('visible');
       activeDropdown = node; 
    };
})

window.onclick = function(e) {
  console.log(e.target.tagName)
  console.log('dropdown');
  console.log(activeDropdown)
  if (e.target.tagName === 'LI' && activeDropdown){
    if (e.target.innerHTML === 'Master Card') {
      document.getElementById('credit-card-image').src = "/Images/MasterCard_Logo.png";
          activeDropdown.classList.remove('visible');
      activeDropdown = null;
      e.target.innerHTML = document.getElementById('current-card').innerHTML;
      document.getElementById('current-card').innerHTML = 'Master Card';
    }
    else if (e.target.innerHTML === 'American Express') {
         document.getElementById('credit-card-image').src = "/Images/american.png";
          activeDropdown.classList.remove('visible');
      activeDropdown = null;
      e.target.innerHTML = document.getElementById('current-card').innerHTML;
      document.getElementById('current-card').innerHTML = 'American Express';      
    }
    else if (e.target.innerHTML === 'Visa') {
         document.getElementById('credit-card-image').src = '/Images/visa_logo.png';
          activeDropdown.classList.remove('visible');
      activeDropdown = null;
      e.target.innerHTML = document.getElementById('current-card').innerHTML;
      document.getElementById('current-card').innerHTML = 'Visa';
    }
  }
  else if (e.target.className !== 'dropdown-btn' && activeDropdown) {
    activeDropdown.classList.remove('visible');
    activeDropdown = null;
  }
}



function payBill(){

  // var cardno = /^(?:3[47][0-9]{13})$/;
    if(document.getElementById('card-number').value =="" || document.getElementById('card-number').value ==null)
    {
      alert("Please Enter Card Number");
    }
    else if(document.getElementById('card-holder').value =="" || document.getElementById('card-holder').value ==null)
    {
      alert("Please Enter Card Holder Name");
    }
    else if(document.getElementById('exp1').value =="" || document.getElementById('exp1').value ==null)
    {
      alert("Please Enter Month");
    }else if(document.getElementById('exp2').value =="" || document.getElementById('exp2').value ==null)
    {
      alert("Please Enter year");
    }
    else if(document.getElementById('cvc').value =="" || document.getElementById('cvc').value ==null)
    {
      alert("Please Enter CVC Number");
    }
    else if(document.getElementById('card-number').value.length != 16){
      alert("Wrong card no , Please enter 16 digit card no" );
    }
    else if(document.getElementById('cvc').value.length !=3){
      alert("Invalid CVC Number")
    }
    else{
      window.location.href="/paymentSuccess";
    }
}



function redirectToNextPage(){

  if(document.getElementById('full-address').value =="" || document.getElementById('full-address').value ==null)
  {
    alert("Please Enter Full Address");
  }
  else if(document.getElementById('path-way').value =="" || document.getElementById('path-way').value ==null)
  {
    alert("Please Enter path way");
  }
  else if(document.getElementById('city').value =="" || document.getElementById('city').value ==null)
  {
    alert("Please Enter Month");
  }else if(document.getElementById('state').value =="" || document.getElementById('state').value ==null)
  {
    alert("Please Enter year");
  }
  else if(document.getElementById('nearest-location').value =="" || document.getElementById('nearest-location').value ==null)
  {
    alert("Please Enter CVC Number");
  }
  else{
    // window.location.href="/paymentUserAddressDetails";
    btn = document.getElementById('pay-next-btn');
    btn.type="submit";
    btn.click();
  }
}






















// const monthInput = document.querySelector('#month');
// const yearInput = document.querySelector('#year');

// const focusSibling = function(target, direction, callback) {
//   const nextTarget = target[direction];
//   nextTarget && nextTarget.focus();
//   // if callback is supplied we return the sibling target which has focus
//   callback && callback(nextTarget);
// }

// // input event only fires if there is space in the input for entry. 
// // If an input of x length has x characters, keyboard press will not fire this input event.
// monthInput.addEventListener('input', (event) => {

//   const value = event.target.value.toString();
//   // adds 0 to month user input like 9 -> 09
//   if (value.length === 1 && value > 1) {
//       event.target.value = "0" + value;
//   }
//   // bounds
//   if (value === "00") {
//       event.target.value = "01";
//   } else if (value > 12) {
//       event.target.value = "12";
//   }
//   // if we have a filled input we jump to the year input
//   2 <= event.target.value.length && focusSibling(event.target, "nextElementSibling");
//   event.stopImmediatePropagation();
// });

// yearInput.addEventListener('keydown', (event) => {
//   // if the year is empty jump to the month input
//   if (event.key === "Backspace" && event.target.selectionStart === 0) {
//     focusSibling(event.target, "previousElementSibling");
//     event.stopImmediatePropagation();
//   }
// });

// const inputMatchesPattern = function(e) {
//   const { 
//     value, 
//     selectionStart, 
//     selectionEnd, 
//     pattern 
//   } = e.target;
  
//   const character = String.fromCharCode(e.which);
//   const proposedEntry = value.slice(0, selectionStart) + character + value.slice(selectionEnd);
//   const match = proposedEntry.match(pattern);
  
//   return e.metaKey || // cmd/ctrl
//     e.which <= 0 || // arrow keys
//     e.which == 8 || // delete key
//     match && match["0"] === match.input; // pattern regex isMatch - workaround for passing [0-9]* into RegExp
// };

// document.querySelectorAll('input[data-pattern-validate]').forEach(el => el.addEventListener('keypress', e => {
//   if (!inputMatchesPattern(e)) {
//     return e.preventDefault();
//   }
// }));