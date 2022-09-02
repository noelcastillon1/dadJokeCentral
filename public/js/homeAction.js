var loggedIn = false;

function toggleLogin() {
    if (loggedIn) {
        // var authButtons = document.getElementsByClassName("auth");
        // for (var i = 0; i < authButtons.length; i++) {
        //     authButtons[i].style.display = "none";
        // }
        document.getElementById("instructions").innerHTML = "Go to my joke creation dashboard";
        // const button = document.createElement("button");
        // button.innerHTML = "Dashboard";
        // button.onclick = function () {
        //     // Redirect to dashboard
        //     window.location.href = "dashboard.html";
        // }
        // document.getElementById("buttonElement").appendChild(button);
        var likeButtons = document.getElementsByClassName("likeButton");
        for (var i = 0; i < likeButtons.length; i++) {
            likeButtons[i].style.visibility = "visible";
        }
        document.getElementById("Login").style.visibility = "hidden";
        document.getElementById("Signup").innerHTML = "Dashboard";
        document.getElementById("Signup").onclick = function () {
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        }
    }
}

// detect if user presses spacebar and toggle login boolean to change UI
window.addEventListener("keydown", function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        console.log("Spacebar pressed");
        loggedIn = !loggedIn;
        toggleLogin(); 
    }
});