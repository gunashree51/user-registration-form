// FORM ELEMENTS
const form=document.getElementById("Registrationform");

const nameInput=document.getElementById("name");
const emailInput=document.getElementById("email");
const passwordInput=document.getElementById("password");
const citySelect=document.getElementById("city");
const otherCity=document.getElementById("otherCity");
const feedback=document.getElementById("feedback");

const genderError=document.getElementById("genderError");
const skillsError=document.getElementById("skillsError");

// PASSWORD HINT ELEMENTS
const passwordHint=document.getElementById("passwordHint");
const lengthRule=document.getElementById("lengthRule");
const upperRule=document.getElementById("upperRule");

// PASSWORD TOGGLE
const togglePassword=document.getElementById("togglePassword");

// STRENGTH BAR
const strengthFill=document.getElementById("strengthFill");
const strengthText=document.getElementById("strengthText");

// SHOW / HIDE OTHER CITY
citySelect.addEventListener("change",()=>{
if(citySelect.value==="Others"){
otherCity.style.display="block";
}else{
otherCity.style.display="none";
otherCity.value="";
}
});

// PASSWORD POPUP + LIVE CHECK
passwordInput.addEventListener("focus",()=>{
passwordHint.style.display="block";
});

passwordInput.addEventListener("blur",()=>{
passwordHint.style.display="none";
});

passwordInput.addEventListener("input",()=>{
let val=passwordInput.value;

// LENGTH RULE
if(val.length>=6){
lengthRule.classList.add("valid");
lengthRule.classList.remove("invalid");
}else{
lengthRule.classList.add("invalid");
lengthRule.classList.remove("valid");
}

// UPPERCASE RULE
if(/[A-Z]/.test(val)){
upperRule.classList.add("valid");
upperRule.classList.remove("invalid");
}else{
upperRule.classList.add("invalid");
upperRule.classList.remove("valid");
}

// 🔥 PASSWORD STRENGTH
let strength=0;

if(val.length>=6) strength++;
if(/[A-Z]/.test(val)) strength++;
if(/[0-9]/.test(val)) strength++;
if(/[@$!%*?&]/.test(val)) strength++;

if(strength===1){
strengthFill.style.width="25%";
strengthFill.style.background="red";
strengthText.innerText="Weak";
}else if(strength===2){
strengthFill.style.width="50%";
strengthFill.style.background="orange";
strengthText.innerText="Medium";
}else if(strength>=3){
strengthFill.style.width="100%";
strengthFill.style.background="green";
strengthText.innerText="Strong";
}else{
strengthFill.style.width="0%";
strengthText.innerText="";
}
});

// LIVE VALIDATION
nameInput.addEventListener("input",validateName);
emailInput.addEventListener("input",validateEmail);
passwordInput.addEventListener("input",validatePassword);

// FORM SUBMIT
form.addEventListener("submit",(e)=>{
e.preventDefault();

clearErrors();

let isValid=true;

if(!validateName()) isValid=false;
if(!validateEmail()) isValid=false;
if(!validatePassword()) isValid=false;
if(!validateGender()) isValid=false;
if(!validateSkills()) isValid=false;
if(!validateCity()) isValid=false;

if(isValid){
alert("Submitted successfully ✅");
form.reset();
otherCity.style.display="none";

// RESET STRENGTH BAR
strengthFill.style.width="0%";
strengthText.innerText="";
}
});

// VALIDATION FUNCTIONS
function validateName(){
if(nameInput.value.trim()===""){
showError(nameInput);
return false;
}
showSuccess(nameInput);
return true;
}

function validateEmail(){
let val=emailInput.value;
if(val===""||!val.includes("@")||!val.includes(".")){
showError(emailInput);
return false;
}
showSuccess(emailInput);
return true;
}

function validatePassword(){
let val=passwordInput.value;
if(val.length<6 || !/[A-Z]/.test(val)){
showError(passwordInput);
return false;
}
showSuccess(passwordInput);
return true;
}

function validateGender(){
let g=document.querySelector('input[name="gender"]:checked');
if(!g){
genderError.innerText="Select gender";
return false;
}
genderError.innerText="";
return true;
}

function validateSkills(){
let s=document.querySelectorAll('input[name="skills"]:checked');
if(s.length===0){
skillsError.innerText="Select at least one skill";
return false;
}
skillsError.innerText="";
return true;
}

function validateCity(){
if(citySelect.value===""){
showError(citySelect);
return false;
}
if(citySelect.value==="Others" && otherCity.value.trim()===""){
showError(otherCity);
return false;
}
showSuccess(citySelect);
return true;
}

// ERROR HANDLING
function showError(input){
input.classList.add("error");
input.classList.remove("success");
}

function showSuccess(input){
input.classList.remove("error");
input.classList.add("success");
}

function clearErrors(){
document.querySelectorAll("input,select,textarea").forEach(i=>{
i.classList.remove("error","success");
});
genderError.innerText="";
skillsError.innerText="";
}

// PASSWORD TOGGLE (EYE ICON)
togglePassword.addEventListener("click",()=>{
if(passwordInput.type==="password"){
passwordInput.type="text";
togglePassword.classList.remove("fa-eye");
togglePassword.classList.add("fa-eye-slash");
}else{
passwordInput.type="password";
togglePassword.classList.remove("fa-eye-slash");
togglePassword.classList.add("fa-eye");
}
});
