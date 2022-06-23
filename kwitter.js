var username_value = "";
function login(){
    username_value = document.getElementById("username").value;
    localStorage.setItem("Username", username_value);
    window.location = "kwitter_room.html";
}