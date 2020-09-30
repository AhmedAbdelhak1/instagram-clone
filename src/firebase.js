// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  
  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyD-lMAb9Zu2XX36lx3khvOLXKhDpOIJAsA",
        authDomain: "instagram-clone-react-93e9b.firebaseapp.com",
        databaseURL: "https://instagram-clone-react-93e9b.firebaseio.com",
        projectId: "instagram-clone-react-93e9b",
        storageBucket: "instagram-clone-react-93e9b.appspot.com",
        messagingSenderId: "194410762175",
        appId: "1:194410762175:web:4d5bea2816aee0057adb0a",
        measurementId: "G-MV0N0FVWWB"
      });

      const db = firebaseApp.firestore();
      const auth = firebase.auth();
      const storage = firebase.storage();

      export {db, auth, storage};







  //export default db;