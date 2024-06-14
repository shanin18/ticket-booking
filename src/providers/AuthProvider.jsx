import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (name, image) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      setUser(auth.currentUser);
    } catch (error) {
      throw error;
    }
  };

  const updateUserEmail = async (newEmail) => {
    try {
      await updateEmail(auth.currentUser, newEmail);
      setUser(auth.currentUser);
    } catch (error) {
      throw error;
    }
  };

  const updateUserPassword = async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      setUser(auth.currentUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signIn,
    googleLogin,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
