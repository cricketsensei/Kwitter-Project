var firebaseConfig = {
      apiKey: "AIzaSyBOX-is08or5b3H4_tK6Y2N-8ojFJRH_CE",
      authDomain: "kwitter-939aa.firebaseapp.com",
      databaseURL: "https://kwitter-939aa-default-rtdb.firebaseio.com",
      projectId: "kwitter-939aa",
      storageBucket: "kwitter-939aa.appspot.com",
      messagingSenderId: "676898059913",
      appId: "1:676898059913:web:d430757f8772ff2631f858"
    };
    

    firebase.initializeApp(firebaseConfig);
var username = localStorage.getItem("Username");
console.log(username);
document.getElementById("welcome_user").innerHTML = "Welcome " + username;

function addroom() {
      var roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose: "addingroomname"
      });
      localStorage.setItem("roomname", roomname);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}

function redirectToRoomName(name) { 
      console.log(name); 
      localStorage.setItem("roomname", name); 
      window.location = "kwitter_page.html"; 
}
getData();