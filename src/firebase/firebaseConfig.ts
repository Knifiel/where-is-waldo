import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyACVDpEvH3qeqK3wOFfhSh-dRIQw1e_3KY',
  authDomain: 'todolist-76d1c.firebaseapp.com',
  projectId: 'todolist-76d1c',
  storageBucket: 'todolist-76d1c.appspot.com',
  messagingSenderId: '163980906320',
  appId: '1:163980906320:web:3e102e2e61b79c92042655',
}

export const app = initializeApp(firebaseConfig)
