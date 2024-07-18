import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../public/firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to handle user sign in
const signInUser = async () => {
    const signinButton = document.getElementById('signinButton');
    const errorMessage = document.getElementById('error-message');

    signinButton.addEventListener('click', async function(event) {
        event.preventDefault();

        console.log("Sign-in button clicked");

        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;

        errorMessage.textContent = '';

        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log("User signed in:", user);  // Log sign-in success
            // Redirect to the profile or dashboard page
            window.location.href = `profile.html?uid=${user.uid}`;
        } catch (error) {
            console.error("Error signing in:", error.message);
            errorMessage.textContent = 'Error signing in: ' + error.message;
        }
    });
};

// Ensure this function is called when the script is loaded
document.addEventListener('DOMContentLoaded', signInUser);
