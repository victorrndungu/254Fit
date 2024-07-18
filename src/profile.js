import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from '../public/firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let userName = '';

// Function to load user profile data
const loadUserProfile = async () => {
    const user = auth.currentUser;
    if (user) {
        const docRef = db.collection('users').doc(user.uid);
        const doc = await docRef.get();
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById('email').value = userData.email;
            document.getElementById('name').value = userData.name || '';
            document.getElementById('calorieGoal').value = userData.calorieGoal || '';
            document.getElementById('height').value = userData.height || '';
            document.getElementById('weight').value = userData.weight || '';
            document.getElementById('gender').value = userData.gender || '';
            document.getElementById('dailyCaloricIntake').value = userData.dailyCaloricIntake || '';
            document.getElementById('workoutDays').value = userData.workoutDays || '';
            userName = userData.name || '';
        } else {
            console.log('No such document!');
        }
    } else {
        console.log('No user is signed in.');
    }
};

// Function to save user profile data
const saveUserProfile = async () => {
    const user = auth.currentUser;
    const errorMessage = document.getElementById('error-message');
    if (user) {
        const userData = {
            name: document.getElementById('name').value,
            calorieGoal: parseInt(document.getElementById('calorieGoal').value, 10),
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            gender: document.getElementById('gender').value,
            dailyCaloricIntake: parseInt(document.getElementById('dailyCaloricIntake').value, 10),
            workoutDays: parseInt(document.getElementById('workoutDays').value, 10),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            await db.collection('users').doc(user.uid).update(userData);
            console.log('User profile updated successfully');
            window.location.href = 'homepage.html';
        } catch (error) {
            console.error('Error updating profile:', error);
            errorMessage.textContent = 'Error updating profile: ' + error.message;
        }
    } else {
        console.log('No user is signed in.');
    }
};

// Ensure these functions are called when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadUserProfile();
        } else {
            window.location.href = 'signin.html';
        }
    });

    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveUserProfile);
});
