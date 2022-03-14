import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged, signInWithPopup
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();
  auth.useDeviceLanguage();

  // login or create user with gmail twitter and github
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // google sign in
  const socialSignIn = (socialProvider) => {
    setIsLoading(true);
    if (socialProvider === "google") {
      return signInWithPopup(auth, googleProvider)
        .then((result) => {
          setError("");
        })
        .catch((error) => {
          setError(error.message);
          setModal(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (socialProvider === "github") {
      return signInWithPopup(auth, githubProvider)
        .then((result) => {
          setError("");
        })
        .catch((error) => {
          setError(error.message);
          setModal(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  // managing user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);



  return {
    user,
    error,
    setError,
    loading,
    setIsLoading,
    modal,
    setModal,
    socialSignIn,
  };
};

export default useFirebase;
