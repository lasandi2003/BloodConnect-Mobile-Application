import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth } from "./firebaseAuth";
import { db } from "./firebaseServices";

// Register a new user
export const registerUser = async ({
  name,
  email,
  password,
  role,
}) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Send verification email
  await sendEmailVerification(user);

  // Save additional user information in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: name,
    email: email,
    role: role,
    createdAt: serverTimestamp(),
  });

  return user;
};

// Login existing user
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};