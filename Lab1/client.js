
/*Once the page is loaded completel\ b\ the broZser and the DOM tree is built, the method RQORDG
belonging to the ZLQGRZ object is called automaticall\ b\ the broZser. B\ oYerloading the RQORDG
method, a custom piece of code, in this case the code for reading and inserting HTML code, can be
e[ecuted eYer\ time the page is loaded or reloaded.*/

window.onload = function(){
  let welcome = document.getElementById("welcomeview");
  let profileview = document.getElementById("profileview");
  // accessToken skapas när vi har loggat in
 if(window.localStorage.accessToken != null)
   {
    let last_active_tab = window.localStorage.last_active_tab;
    displayView(profileview);
    openTab(event, last_active_tab);
    WriteInfo();
    ShowMessages();
  }
  else{

      displayView(welcome);
  }
};

displayView = function(view){
let showView = document.getElementById("view");
  showView.innerHTML = view.innerHTML;
};


function openTab(Eevent, tab){

  // Get all elements with class="tabActive" and hide them
  // Home, browse and account have class tabActive
  tabActive = document.getElementsByClassName("tabActive");
  for (i = 0; i < tabActive.length; i++) {
    tabActive[i].style.display = "none";
  }

  document.getElementById(tab).style.display = "block";
  window.localStorage.last_active_tab = tab;

};


WriteInfo = function(){
  /* Input: A string containing the access token of the current user.
Return data: A user object containing the follo􀁚ing fields:
email, firstname, familyname, gender, city and country.*/

  let userObject = serverstub.getUserDataByToken(window.localStorage.accessToken);
  if(userObject.success){

    document.getElementById("HomEmail").innerHTML = userObject.data.email;
    document.getElementById("HomName").innerHTML = userObject.data.firstname;
    document.getElementById("HomFamily").innerHTML = userObject.data.familyname;
    document.getElementById("HomGender").innerHTML = userObject.data.gender;
    document.getElementById("HomCity").innerHTML = userObject.data.city;
    document.getElementById("HomCountry").innerHTML = userObject.data.country;
    return true;
  }
  else
  {
    return false;
  }
};

ShowMessages = function(){
  let token = window.localStorage.accessToken;
  //An array containing all messages sent to the user.
  //let messArr = serverstub.getUserMessagesByToken(token);
  let { success, message, data } = serverstub.getUserMessagesByToken(token);
  //let messERR = document.getElementById("ErrorId6");
  //data kommer från postmessages som innehåller writer och content
  let resultMessage = " ";
  if(success){
    for(i=0; i<data.length; ++i){
     resultMessage += data[i].writer + ': ' + data[i].content + '<br>';
    }
    let rresult= document.getElementById("writingWall");
    rresult.innerHTML = resultMessage;
  //  messERR.innerHTML = message;
    return true;
  }
   else
   {
    // messERR.innerHTML = mess.message;"Can not write the messsage"
      messERR.innerHTML = message;
    return false;
  }
};



signup = function(){
  let signUpForm = {
    email: document.getElementById("SigninEmail").value,
    password: document.getElementById("SigninPassword1").value,
    firstname: document.getElementById("SigninName").value,
    familyname: document.getElementById("SigninFamilyname").value,
    gender: document.getElementById("SigninGender").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value
  }
  let signup = serverstub.signUp(signUpForm);
  if(confirmPSW()){
    if(signup.success)
    {
      //"Successfully created a new user."
      document.getElementById("ErrorId2").innerHTML = signup.message;
      return true;
    }
    else
    {
      //"Form data missing or incorrect type."
      document.getElementById("ErrorId2").innerHTML = signup.message;
      return false;
    }
  }
   else if (!confirmPSW())
  {
  //"pass not the same"
    return false;
  }
  // "User already exists."
  document.getElementById("ErrorId2").innerHTML = signup.message;
  return false;
};


confirmPSW = function(){
  let SigninPassword1 = document.getElementById("SigninPassword1").value;
  let SigninPassword2 = document.getElementById("SigninPassword2").value;
if(SigninPassword1 == SigninPassword2){
  document.getElementById("ErrorId2").innerHTML = "pass the same!";
  return true;
}
else{
  document.getElementById("ErrorId2").innerHTML = "pass not the same!";
  return false;
}
};


// Login knapp
LogIn = function(){
  let errorDiv = document.getElementById("ErrorId1");
  let email = document.getElementById("LoginEmail").value;
  let password = document.getElementById("LoginPassword").value;
  //let login = serverstub.signIn(email,password);
    if(serverstub.signIn(email,password).success){
      window.localStorage.accessToken = serverstub.signIn(email,password).data;
      displayView(profileview);
      openTab(event, 'Home');
      WriteInfo();
      ShowMessages();
    }
    else
     {
      errorDiv.innerHTML = "Wrong password or Email";
        return false;
    }
};

signout = function(){
  serverstub.signOut(window.localStorage.accessToken);
  window.localStorage.removeItem("accessToken");
  displayView(welcomeview);
};


displaySearchData = function(){
  let searchEmail = document.getElementById("emailSearch").value;
  let token = window.localStorage.accessToken;
  /*token: A string containing the access token of the current user
    email: The email address of the user to retrieve data for
    Return: A user object containing the following fields:
    email, firstname, familyname, gender, city and country.*/

  let userObject = serverstub.getUserDataByEmail(token,searchEmail);

  if(userObject.success){
    document.getElementById("browseEmail").innerHTML = userObject.data.email;
    document.getElementById("browseName").innerHTML = userObject.data.firstname;
    document.getElementById("browseName2").innerHTML = userObject.data.firstname + "'s Twidder wall:";
    document.getElementById("browseFamily").innerHTML = userObject.data.familyname;
    document.getElementById("browseGender").innerHTML = userObject.data.gender;
    document.getElementById("browseCity").innerHTML = userObject.data.city;
    document.getElementById("browseCountry").innerHTML = userObject.data.country;
    browseClass = document.getElementsByClassName("browseClass");
    for (i = 0; i < browseClass.length; i++) {
      browseClass[i].style.display = "block";
    }
      document.getElementById("ErrorId5").innerHTML = " ";
    /*token: A string containing the access token of the current user
      email: The email address of the user to retrie􀁙e messages for
     Return: An array containing all messages sent to the user.*/
   }
   else{

     browseClass = document.getElementsByClassName("browseClass");
     for (i = 0; i < browseClass.length; i++) {
       browseClass[i].style.display = "none";
     }

   }
    let { success, message, data } = serverstub.getUserMessagesByEmail(token,searchEmail);
  //  let wallArray = serverstub.getUserMessagesByEmail(token,searchEmail);
  if (!success) {
    document.getElementById("ErrorId5").innerHTML = message;
    return false;
  }
  else
  {
      let messMess = document.getElementById("S_writingWall");
      let resultMessage = " ";
      for(i=0; i<data.length; ++i){
        resultMessage += data[i].writer + ': ' + data[i].content + '<br>';
      }
      messMess.innerHTML = resultMessage;
    }
    document.getElementById("ErrorId5").innerHTML = message;
    return false;
};

post_message_my = function(){
  let messagePost = document.getElementById("usermessage").value;
  let token = window.localStorage.accessToken;
  let userObject = serverstub.getUserDataByToken(token);
  let emailRecipient = userObject.data.email;
  /*token: A string containing the access token of the current user
􀆔 message: The message to post
􀆔 email: The email address of the recipient*/
  let {success, message} = serverstub.postMessage(token,messagePost,emailRecipient);
  if(success){
  refreshWall();
  return true;
  }
   else
   {
    document.getElementById("ErrorId3").innerHTML = message;
    return false;
  }
};


refreshWall = function(){
  let token = window.localStorage.accessToken;
  let searchEmail = document.getElementById("emailSearch").value;
  /*token: A string containing the access token of the current user
    email: The email address of the user to retrie􀁙e messages for
   Return: An arra􀁜 containing all messages sent to the user.*/

  ShowMessages(token);
  let { success, message, data } = serverstub.getUserMessagesByEmail(token,searchEmail);
//  let wallArray = serverstub.getUserMessagesByEmail(token,searchEmail);
   if (!success) {
      document.getElementById("ErrorId3").innerHTML = message;
      return false;
    }
    else
    {
    let messMess = document.getElementById("writingWall");
    let resultMessage = " ";
    for(i=0; i<data.length; ++i){
      resultMessage += data[i].writer + ': ' + data[i].content + '<br>';
    }
    messMess.innerHTML = resultMessage;
  }

  document.getElementById("ErrorId3").innerHTML = message;
  return true;

};

post_message_searched = function(){
  let messagePost = document.getElementById("message").value;
  let token = window.localStorage.accessToken;
  let emailRecipient = document.getElementById("emailSearch").value;
  let {success, message} = serverstub.postMessage(token,messagePost,emailRecipient);
  if(success){
    refresh_search_Wall();
  }
  else
  {
    document.getElementById("ErrorId4").innerHTML = message;
    return false;
  }
};




refresh_search_Wall = function(){
  let token = window.localStorage.accessToken;
  let searchEmail = document.getElementById("emailSearch").value;
  /*token: A string containing the access token of the current user
 email: The email address of the user to retrie􀁙e messages for
  Return: An arra􀁜 containing all messages sent to the user.*/

  let { success, message, data } = serverstub.getUserMessagesByEmail(token,searchEmail);
  //  let wallArray = serverstub.getUserMessagesByEmail(token,searchEmail);
  if (!success) {
    document.getElementById("ErrorId4").innerHTML = message;
    return false;
  }
  else
  {
      let messMess = document.getElementById("S_writingWall");
      let resultMessage = " ";
      for(i=0; i<data.length; ++i){
        resultMessage += data[i].writer + ': ' + data[i].content + '<br>';
      }
      messMess.innerHTML = resultMessage;
    }

    document.getElementById("ErrorId4").innerHTML = message;
    return false;
};






changepassword = function(){
  let token = window.localStorage.accessToken;
  let currentPassword = document.getElementById("accountPassword").value;
  let newPassword = document.getElementById("newPSW").value;
  let confirmPassword = document.getElementById("confPSW").value;
  let messageErr = document.getElementById("changePass");

    if (newPassword.length <= 5) {
      messageErr.innerHTML = "Please use a longer than 5";
      return false;
    }

    if (newPassword !== confirmPassword) {
      messageErr.innerHTML = "Passwords don't match";
      return false;
    }


    let { success, message } = serverstub.changePassword(token,currentPassword,newPassword);

    if (success) {
      messageErr.innerHTML = message;
      return true;
    }
   else
    {
   messageErr.innerHTML = message;
   return false;
   }
   messageErr.innerHTML = message;
    return false;
  };


/*refresh = function(){

  let searchEmail = document.getElementById("emailSearch").value;
  let token = window.localStorage.accessToken;
  let { success, message, data } = serverstub.getUserMessagesByEmail(token,searchEmail);
//  let wallArray = serverstub.getUserMessagesByEmail(token,searchEmail);
if (!success) {
  document.getElementById("ErrorId5").innerHTML = "Not such a user";
}
else
{
    let messMess = document.getElementById("S_writingWall");
    let resultMessage = " ";
    for(i=0; i<data.length; ++i){
      resultMessage += data[i].writer + ': ' + data[i].content + '<br>';
    }
    messMess.innerHTML = resultMessage;
  }
};*/
