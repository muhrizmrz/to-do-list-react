// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, updateDoc, query, where, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxzom_oAtcOYJz-AzQiGjiMsnwDPvidNg",
  authDomain: "to-do-list-d08d3.firebaseapp.com",
  projectId: "to-do-list-d08d3",
  storageBucket: "to-do-list-d08d3.appspot.com",
  messagingSenderId: "501262756271",
  appId: "1:501262756271:web:d5b0604e6cdd8d829c675a",
  measurementId: "G-V24SPBYHQ6",
  databaseURL: "https://to-do-list-d08d3-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
const db = getFirestore(app);

export function addData(collectionName, data) {
  addDoc(collection(db, collectionName), data)
}

export async function getData() {

  return new Promise((resolve,reject)=>{
    const querySnapshot = query(collection(db, 'to-do-list'), where('userId','==',localStorage.getItem('userId')));
    getDocs(querySnapshot).then((querySnapshotData) => {
      let data = [];
      querySnapshotData.forEach((doc) => {
        data.push({fid:doc.id,...doc.data()});
      });
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  })

}

export async function updateData(collectionName,id,data){
  const documentRef = doc(db, collectionName, id)
  await updateDoc(documentRef,data)
}

export async function deleteData(id){
  await deleteDoc(doc(db,'to-do-list',id))
}

const provider = new GoogleAuthProvider()

export const signInWithGoogle = (callback) => {
  signInWithPopup(auth, provider).then((result) => {
    const name = result.user.displayName
    const email = result.user.email
    const userId = result.user.uid
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    localStorage.setItem('userId', userId)
    callback()
  }).catch((error) => {
    return error
  })
}

export const signOutGoogle = () => {
  signOut(auth).then(() => {
    localStorage.clear()
  }).catch((error) => console.log(error))
}