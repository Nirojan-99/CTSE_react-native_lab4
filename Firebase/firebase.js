// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore/lite';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAJRj4AAAOA01tSjV9DzgMUGT9c0w6W8w4',
  authDomain: 'todo-react-native-1a8f3.firebaseapp.com',
  projectId: 'todo-react-native-1a8f3',
  storageBucket: 'todo-react-native-1a8f3.appspot.com',
  messagingSenderId: '968418614405',
  appId: '1:968418614405:web:3188365e34e021d178ddec',
  measurementId: 'G-Y80JEEJZTS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTodo() {
  const todoCol = collection(db, 'Todo');
  const todoSnapshot = await getDocs(todoCol);
  const todoList = todoSnapshot.docs.map(doc => doc.data());
  return todoList;
}

async function addTodo(title, isCompleted) {
  const id = new Date().toISOString();
  const docData = {
    title: title,
    isCompleted: isCompleted,
    id: id,
  };
  try {
    const res = await setDoc(doc(db, 'Todo', id), docData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function updateTodo(id, title, isCompleted) {
  try {
    const todoRef = doc(db, 'Todo', id);
    await updateDoc(todoRef, {
      title: title,
      isCompleted: isCompleted,
    });
    return true;
  } catch (error) {
    return false;
  }
}
async function deleteTodo(id) {
  try {
    const todoRef = doc(db, 'Todo', id);
    await deleteDoc(todoRef);
    return true;
  } catch (error) {
    return false;
  }
}

const auth = getAuth();
const register = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res.user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export {login, register, addTodo, getTodo, updateTodo, deleteTodo};
