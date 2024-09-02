// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIo7Ucxjjug1RUXuI9LEWeIq4pVE9sHIk",
  authDomain: "airbnb-54cf0.firebaseapp.com",
  projectId: "airbnb-54cf0",
  storageBucket: "airbnb-54cf0.appspot.com",
  messagingSenderId: "201715149293",
  appId: "1:201715149293:web:a9a4329331cc8688b99fe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}
const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;

    const auth=getAuth();
    const db=getFirestore();
});
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
    });
       

 .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message; 

    if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
    } else {
        showMessage(`Unable to create user: ${errorMessage}`, 'signUpMessage'); 
    }

    console.error("Error code:", errorCode); 
    console.error("Error message:", errorMessage); 
});