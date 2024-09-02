import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIo7Ucxjjug1RUXuI9LEWeIq4pVE9sHIk",
  authDomain: "airbnb-54cf0.firebaseapp.com",
  projectId: "airbnb-54cf0",
  storageBucket: "airbnb-54cf0.appspot.com",
  messagingSenderId: "201715149293",
  appId: "1:201715149293:web:a9a4329331cc8688b99fe4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  handleSignUp();
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

function handleSignUp() {
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email,
        firstName,
      };
      return setDoc(doc(db, "users", user.uid), userData);
    })
    .then(() => {
      showMessage("Account Created Successfully", "signUpMessage");
      window.location.href = "Login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        showMessage("Unable to create User", "signUpMessage");
      }
    });


    const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='logged.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
}
