import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const initialState = {
  userData: null,
  status: 'idle',
};

export const userSignUp = createAsyncThunk(
  'auth/userSignUp',
  async ({ email, fullName, username, password }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDetails = {
        uid: response.user.uid,
        email,
        name: fullName,
        username,
        photoURL: '',
        headerImage: '',
        bio: '',
        website: '',
        posts: [],
        followers: [],
        following: [],
        bookmarks: [],
      };
      const userRef = doc(collection(db, 'users'), response.user.uid);
      const postRef = doc(collection(db, 'posts'), response.user.uid);
      const likedPostRef = doc(db, 'likedPosts', response.user.uid);
      const bookmarksRef = doc(db, 'bookmarks', response.user.uid);
      await setDoc(userRef, { ...userDetails });
      await setDoc(postRef, { posts: [] });
      await setDoc(likedPostRef, { likedPosts: [] });
      await setDoc(bookmarksRef, { bookmarks: [] });
      return userDetails;
    } catch (err) {
      console.error('signup', err);
      toast.error(err.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(collection(db, 'users'), response.user.uid);
      const userDetails = await getDoc(userRef);
      return userDetails.data();
    } catch (err) {
      console.error('login', err);
      toast.error(err.message);
    }
  }
);

export const userLogout = createAsyncThunk('auth/userLogout', async () => {
  try {
    await signOut(auth);
    toast.success('logged out');
  } catch (err) {
    console.error('logout', err);
    toast.error(err.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [userSignUp.pending]: state => {
      state.status = 'loading';
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = 'fulfilled';
    },
    [userLogin.pending]: state => {
      state.status = 'loading';
    },
    [userLogin.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = 'fulfilled';
    },
    [userLogout.fulfilled]: state => {
      state.userData = null;
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
