// src/signup.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from '../public/firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Function to handle user sign up
const signUpUser = async () => {
    const signUpForm = document.getElementById('signUpForm');
    const errorMessage = document.getElementById('error-message');

    signUpForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        errorMessage.textContent = '';

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            errorMessage.textContent = 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number';
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match';
            return;
        }

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await firebase.firestore().doc(`users/${user.uid}`).set({
                email: user.email,
                name: email.split('@')[0],
                calorieGoal: 0,
                height: '',
                weight: '',
                gender: '',
                dailyCaloricIntake: '',
                workoutDays: '',
                googleFitLinked: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('User signed up and saved in Firestore:', user);
            window.location.href = `profile.html?uid=${user.uid}`;
        } catch (error) {
            console.error('Error signing up:', error);
            errorMessage.textContent = 'Error signing up: ' + error.message;
        }
    });
};

// Ensure this function is called when the script is loaded
document.addEventListener('DOMContentLoaded', signUpUser);
