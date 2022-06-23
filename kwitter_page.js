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

function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("roomname");
    window.location = "index.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        name: username,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}



function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
                document.getElementById("output").innerHTML = "";
                snapshot.forEach(function (childSnapshot) {
                            childKey = childSnapshot.key;
                            childData = childSnapshot.val();
                            if (childKey != "purpose") {                                
                                firebase_message_id = childKey;
                                message_data = childData;
                                console.log(firebase_message_id);
                                console.log(message_data);
                                name = message_data['name'];
                                message = message_data['message'];
                                like = message_data['like'];
                                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                                document.getElementById("output").innerHTML += row;
                                getData();
                            }
                        });
                    });
                }
                
                function updateLike(message_id){
                    console.log("Message ID = " + message_id);
                    buttonID = message_id;
                    Likes = Number(document.getElementById("buttonID").value);
                    updateLiked = Likes + 0.001;
                    console.log(updateLiked);
                    firebase.database().ref(room_name).child(buttonID).update({
                        like : updateLiked
                    });
                }