/* Local intl-tel-input 18.2.1. Each field owns a separate hidden dial-code value. */
(() => {
  'use strict';
  if(!window.intlTelInput)return;
  document.querySelectorAll('.phone-input').forEach(input=>{
    const iti=window.intlTelInput(input,{initialCountry:'in',preferredCountries:['in','ae','us','gb','sg','au','ca'],separateDialCode:true,autoPlaceholder:'off',nationalMode:true});
    const hidden=document.getElementById(input.dataset.countrycodeId);
    function sync(){const country=iti.getSelectedCountryData();hidden.value='+'+(country.dialCode||'91');input.dataset.countryIso=country.iso2||'in';const flag=input.parentElement.querySelector('.iti__selected-flag .iti__flag');if(flag)flag.dataset.iso=(country.iso2||'in').toUpperCase();input.setCustomValidity('');}
    input.addEventListener('countrychange',sync);sync();
  });
  // ISO text labels replace raster flag sprites, keeping the entire picker local and image-free.
  document.querySelectorAll('.iti__country-list .iti__flag').forEach(flag=>{const iso=[...flag.classList].find(c=>/^iti__[a-z]{2}$/.test(c));if(iso)flag.dataset.iso=iso.slice(5).toUpperCase()});
})();
