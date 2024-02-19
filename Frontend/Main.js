// Login Function
var flag=false;
  function  myFunction(){
    if(flag==false){
        onloadata1();
    }
    else{
        onloadata();
    }
  }



var UserLoginID;       //Use to access particular user uploaded adds or performing any function with single user
function ApplyLogin(){
    flag==true;
    var email= document.getElementById('input_email').value;
    var password= document.getElementById('input_pass').value;
    var PassLoginObj={};
    PassLoginObj.Email=email;
    PassLoginObj.Pass=password;
    console.log(PassLoginObj);
    document.getElementById('CreateBtn').style.display="";
    document.getElementById('LoginSignupButton').style.display="none";
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_FilterMain').style.display="";
    document.getElementById('Div_CardConatiner').style.display="flex";
    onloadata();
    

  }

function showLogin(){
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_Login').style.display="";
}
function showSignup(){
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_Signup').style.display="";
}
function showCreateProperty(){
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_CreateProperty').style.display="";
}

function ShowForgetView(){
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_ForgetPass').style.display="";

}

  // Login Function
function ApplyRegistration(){
    var Name= document.getElementById('input_RName').value;
    var email= document.getElementById('input_REmail').value;
    var password= document.getElementById('input_RPass').value;
    var Confirmpassword= document.getElementById('input_RCPass').value;
    if(password==Confirmpassword && password!=""){
        var registerObj={};
        registerObj.RName=Name;
        registerObj.Remail=email;
        registerObj.RPassword=password;
        console.log(registerObj);
        alert('User registered successfully')
        showLogin();
        
    }
    else{
        alert("Password should match with confirm password")
    }
    
  }

  function ApplyForgetPasswpord(){

    var OldPass= document.getElementById('Input_OldPass').value;
    var password= document.getElementById('Input_CurrentPass').value;
    var Confirmpassword= document.getElementById('Input_ReCurrentPass').value;
    if(password==Confirmpassword && password!="" && OldPass!="" && Confirmpassword !=""){
        var PassObj={};
        PassObj.oldpass=OldPass;
        PassObj.password=password;
        PassObj.confirmpassword=Confirmpassword;
        console.log(PassObj);
        alert('Password changed successfully')
        showLogin();
        
    }
    else{
        alert("Password should match with confirm password")
    }
  }

  var Image = document.getElementById('Prop_Image');
  var SRC;
  var loadFile = function(event) {
      Image.src = URL.createObjectURL(event.target.files[0]);
      SRC=Image.src;
    };

    function EditloadFile(event){
        var EditImage=document.getElementById('Edit_Image');
        EditImage.src = URL.createObjectURL(event.target.files[0]);
        SRC=EditImage.src;
    }
   
  function CreateProperty()
  {
    var Name= document.getElementById('Prop_Name').value;
    var Location= document.getElementById('Prop_Location').value;
    var Size= document.getElementById('Prop_Size').value;
    var Status= document.getElementById('Prop_Status').value;
    var Amenities= document.getElementById('Prop_Amenities').value;
    var PropObj={};
    PropObj.Name=Name;
    PropObj.Location=Location;
    PropObj.Size=Size;
    PropObj.Status=Status;
    PropObj.Amenities=Amenities;
    PropObj.Image=SRC;
    console.log(PropObj);
    alert("Your Property Is Created")
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_FilterMain').style.display="";
    document.getElementById('Div_CardConatiner').style.display="flex";
    onloadata();
  }


//   This function is to view card to the user after login who uploaded the ads it is not for customer view
function onloadata(){
    //Here we fetch API to get only advertise those are uploaded by the user only 
    //Here we are passsing login Id (Primary Key ) to fetch data 
    var containerData="";
    var Data;              //Here we save our JSON object coming from API

    //This loop runs upto the Advertisement length
    for(var i=0;i<8;i++){
      containerData+='<div class="container" style="width:380px;height:500px;border: solid 2px;padding: 20px;border-radius: 10px;border-color: #b3b3b3;margin: 5px;"><div class="container"><img  id="CardImage_'+i+'"" src="https://ap.rdcpix.com/ae17d0c657d089ad839ac1259082725dl-m603593997od-w480_h360.jpg" class="card-img-top" style="height:150px;" alt="Card Image"><div class="container"><h4 id="Header_'+i+'" class="card-title" style="text-align:center;color:#0000ff">Property'+i+'</h4><div class="row"><div class="col-5"><p>Property Location</p></div><div class="col"><p id="Location_'+i+'">data['+i+'].Location</p></div></div><div class="row"><div class="col-5"><p>Property Amenities</p></div><div class="col"><p id="Amenities_'+i+'">data['+i+'].Amenities</p></div></div><div class="row"><div class="col-5"><p>Property Size</p></div><div class="col"><p id="Size_'+i+'"">data['+i+'].Size</p></div></div><div class="row"><div class="col-5"><p>Property Status</p></div><div class="col"><p id="Status_'+i+'">data['+i+'].Status</p></div></div></div><div class="card-body" style="text-align:center;"><button class="btn btn-warning" id="data[K].userID_Edit" style="margin:10px;width:100px;" onclick="EditDetails('+i+')">Edit</button><button class="btn btn-danger" id="data[K].userID_Delete" style="width:100px;" onclick="DeleteDetails('+i+')">Delete</button></div></div></div>'
    }
      document.getElementById('Div_CardConatiner').innerHTML=containerData;
  }
  
  //   This function is to view card to the user after login who uploaded the ads it is not for customer view
function onloadata1(){
    //Here we fetch API to get only advertise those are uploaded by the user only 
    //Here we are passsing login Id (Primary Key ) to fetch data 
    var containerData="";
    var Data;              //Here we save our JSON object coming from API

    //This loop runs upto the Advertisement length
    for(var i=0;i<8;i++){
      containerData+='<div class="container" style="width:380px;height:500px;border: solid 2px;padding: 20px;border-radius: 10px;border-color: #b3b3b3;margin: 5px;"><div class="container"><img id="CardImage_'+i+'" src="https://ap.rdcpix.com/ae17d0c657d089ad839ac1259082725dl-m603593997od-w480_h360.jpg" class="card-img-top" style="height:150px;" alt="Card Image"><div class="container"><h4 class="card-title" id="Header_'+i+'" style="text-align:center;color:#0000ff">Property'+i+'</h4><div class="row"><div class="col-5"><p>Property Location</p></div><div class="col"><p  id="Location_'+i+'">data['+i+'].Location</p></div></div><div class="row"><div class="col-5"><p>Property Amenities</p></div><div class="col"><p id="Amenities_'+i+'">data['+i+'].Amenities</p></div></div><div class="row"><div class="col-5"><p>Property Size</p></div><div class="col"><p  id="Size_'+i+'"">data['+i+'].Size</p></div></div><div class="row"><div class="col-5"><p>Property Status</p></div><div class="col"><p  id="Status_'+i+'">data['+i+'].Status</p></div></div><div style="text-align: center;"><button class="btn btn-primary" onclick="ShowDetails('+i+')">Show Details</button></div></div></div></div>'
    }
      document.getElementById('Div_CardConatiner').innerHTML=containerData;
  }

  function ShowDetails(index){
    var Name=document.getElementById('Header_'+index).innerHTML;
    var Amenities=document.getElementById('Amenities_'+index).innerHTML;
    var Size=document.getElementById('Size_'+index).innerHTML;
    var Location=document.getElementById('Location_'+index).innerHTML;
    var Status=document.getElementById('Status_'+index).innerHTML;
    var Image=document.getElementById('CardImage_'+index).src;
    var Card='<div class="container maindiv" id="Div_CreateProperty" style="padding: 5px;" ><div class="container" style=" margin-top: 10px;border: solid 2px;border-radius: 10px;width: 700px;margin-left: auto;margin-top:20px;padding: 10px;background-color: white;"><p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create Property</p><img style="height:200px;width:500px;margin-left:100px;" src="'+Image+'"><div style="margin-left: 100px;"><div class="form" style="mrgin-left:50px"><div class="row"><div class="col-6"><i class="bi bi-building"  style="margin-right: 5px;"></i><h5 for="form3Example1c" style="display: inline;">Property Name</h5></div><div class="col-6"><h5>'+Name+'</h5></div></div><br><div class="row"><div class="col-6"><i class="bbi bi-geo-alt-fill"  style="margin-right: 5px;"></i><h5 for="form3Example1c" style="display: inline;">Property Location</h5></div><div class="col-6"><h5><h5>'+Location+'</h5></div></div><br><div class="row"><div class="col-6"><i class="bi bi-building-gear"  style="margin-right: 5px;"></i><h5 for="form3Example1c" style="display: inline;">Property Status</h5></div><div class="col-6"><h5>'+Status+'</h5></div></div><br><div class="row"><div class="col-6"><i class="bi bi-envelope"  style="margin-right: 5px;"></i><h5 for="form3Example1c" style="display: inline;">Property Size</h5></div><div class="col-6"><h5>'+Size+'</h5></div></div><br><div class="row"><div class="col-6"><i class="bi bi-cart-plus-fill"  style="margin-right: 5px;"></i><h5 for="form3Example1c" style="display: inline;">Amenities</h5></div><div class="col-6"><h5>'+Amenities+'</h5></div></div><br><div class="btn btn-group"><button type="button" class="btn btn-primary" style="width: 250px;margin:10px" onclick="ShowIntrest('+index+')">Show Intrest</button><button onclick="GetBack()" class="btn btn-primary" style="width: 250px;margin:10px;margin-right:50px;">Back</button></div></div></div></div></div>'
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_ShowDetails').innerHTML=Card;
    document.getElementById('Div_ShowDetails').style.display="";
}
function EditDetails(index){
    var Name=document.getElementById('Header_'+index).innerHTML;
    var Amenities=document.getElementById('Amenities_'+index).innerHTML;
    var Size=document.getElementById('Size_'+index).innerHTML;
    var Location=document.getElementById('Location_'+index).innerHTML;
    var Status=document.getElementById('Status_'+index).innerHTML;
    var Image=document.getElementById('CardImage_'+index).src;
    var Card='<div class="container maindiv" id="Div_CreateProperty" style="padding: 5px;"><div class="container" style=" margin-top: 10px;border: solid 2px;border-radius: 10px;width: 700px;margin-left: auto;margin-top:20px;padding: 10px;background-color: white;"><p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit Property Details</p><div class="form"><div class="row"><div class="col-3"><i class="bi bi-building"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Name</label></div><div class="col-7"><input type="text" id="Edit_Name_'+index+'" name="form3Example1c" class="form-control" style="display: inline;" placeholder="Enter Your Property Name Here" value="'+Name+'"/></div></div><br><div class="row"><div class="col-3"><i class="bbi bi-geo-alt-fill"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Location</label></div><div class="col-7"><select class="form-control" id="Edit_Location_'+index+'" value="'+Location+'"><option value="Pune">Pune</option><option value="Pune">Banglore</option><option value="Pune">Mumbai</option><option value="Pune">Chennai</option></select></div></div><br><div class="row"><div class="col-3"><i class="bi bi-building-gear"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Status</label></div><div class="col-7"><select class="form-control" id="Edit_Status_'+index+'" value="'+Status+'"><option value="Rental">Rental</option><option value="Sale">Sale</option><option value="Both Rental & Sale">Both Rental & Sale</option></select></div></div><br><div class="row"><div class="col-3"><i class="bi bi-envelope"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Size</label></div><div class="col-7"><input type="text"  id="Edit_Size_'+index+'" name="form3Example1c" class="form-control" style="display: inline;" placeholder="Enter Your Property Size Here" value="'+Size+'"/></div></div><br><div class="row"><div class="col-3"><i class="bi bi-cart-plus-fill"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Amenities</label></div><div class="col-7"><input type="text" id="Edit_Amenities_'+index+'" name="form3Example1c" class="form-control" style="display: inline;" placeholder="Enter Your Property Amenities Here" value="'+Amenities+'"/></div></div><br><div class="row"><div class="col-3"><i class="bi bi-card-image"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Upload Image</label></div><div class="col-7"><input type="file" class="form-control" id="Edit_Image" onchange="EditloadFile(event)" data-source='+Image+' /></div></div><br><div class="btn-group"><button type="button" class="btn btn-primary" style="width:250px;margin:10px;height:50px;" onclick="EditProperty('+index+')">Update Property</button><button onclick="GetBackOwner()" class="btn btn-primary" style="width:250px;margin:10px;margin-right:50px;height:50px;">Back</button></div></div></div></div>' 
     $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_EditProperty').innerHTML=Card;
    document.getElementById('Div_EditProperty').style.display="";
}

function DeleteDetails(index){
    var Name=document.getElementById('Header_'+index).innerHTML;
    var Amenities=document.getElementById('Amenities_'+index).innerHTML;
    var Size=document.getElementById('Size_'+index).innerHTML;
    var Location=document.getElementById('Location_'+index).innerHTML;
    var Status=document.getElementById('Status_'+index).innerHTML;
  
    //var Image=document.getElementById('CardImage_'+index).src;
    var Card='<div class="container maindiv" id="Div_CreateProperty" style="padding: 5px;"><div class="container" style=" margin-top: 10px;border: solid 2px;border-radius: 10px;width: 700px;margin-left: auto;margin-top:20px;padding: 10px;background-color: white;"><p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style="color:Red;">Confirm Your Delete</p><div class="form"><div class="row"><div class="col-3"><i class="bi bi-building"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Name</label></div><div class="col-7"><input type="text" id="DeleteName_'+index+'" name="form3Example1c" class="form-control" style="display: inline;" placeholder="Enter Your Property Name Here" value="'+Name+'"/></div></div><br><div class="row"><div class="col-3"><i class="bbi bi-geo-alt-fill"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Location</label></div><div class="col-7"><select class="form-control" id="DeleteLocation_'+index+'" value="'+Location+'"><option value="Pune">Pune</option><option value="Pune">Banglore</option><option value="Pune">Mumbai</option><option value="Pune">Chennai</option></select></div></div><br><div class="row"><div class="col-3"><i class="bi bi-building-gear"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Status</label></div><div class="col-7"><select class="form-control" id="DeleteStatus_'+index+'" value="'+Status+'"><option value="Rental">Rental</option><option value="Sale">Sale</option><option value="Both Rental & Sale">Both Rental & Sale</option></select></div></div><br><div class="row"><div class="col-3"><i class="bi bi-envelope"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Property Size</label></div><div class="col-7"><input type="text"  id="DeleteSize_'+index+'" name="form3Example1c" class="form-control" style="display: inline;" placeholder="Enter Your Property Size Here" value="'+Size+'"/></div></div><br><div class="row"><div class="col-3"><i class="bi bi-cart-plus-fill"  style="margin-right: 5px;"></i><label for="form3Example1c" style="display: inline;">Amenities</label></div><div class="col-7"><input type="text" id="DeleteAmenities_'+index+'" name="form3Example1c" class="form-control" style="display: inline;" placeholder="Enter Your Property Amenities Here" value="'+Amenities+'"/></div></div><br></div><br><div class="btn-group"><button type="button" class="btn btn-primary" style="width:250px;margin:10px;height:50px;" onclick="DeleteProperty('+index+')">Delete Property</button><button onclick="GetBackOwner()" class="btn btn-primary" style="width:250px;margin:10px;margin-right:50px;height:50px;">Back</button></div></div></div></div>' 
     $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_EditProperty').innerHTML=Card;
    document.getElementById('Div_EditProperty').style.display="";
}

function GetBackOwner(){
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_CardConatiner').style.display="flex";
    onloadata();
}
function GetBack(){
    $( ".maindiv" ).css( "display", "none" );
    document.getElementById('Div_CardConatiner').style.display="flex";
    onloadata1();
}
function DeleteProperty(index){
    var PassObj={};
    PassObj.DeleteKey=index;
    console.log(PassObj);
    alert('Your Property Number '+index+' Had Been Deleted Successfully');
}

function EditProperty(index){
    var Name=document.getElementById('Edit_Name_'+index).value;
    var Amenities=document.getElementById('Edit_Amenities_'+index).value;
    var Size=document.getElementById('Edit_Size_'+index).value;
    var Location=document.getElementById('Edit_Location_'+index).value;
    var Status=document.getElementById('Edit_Status_'+index).value;
    var obj={};
    obj.Name=Name;
    obj.Amenities=Amenities;
    obj.Location=Location;
    obj.Size=Size;
    obj.Status=Status;
    if(SRC!="" && SRC!=undefined){
        obj.Image=SRC;
     }

     else{
        obj.Image=document.getElementById('Edit_Image').dataset.source;
   
     }
    
    console.log(obj);
}