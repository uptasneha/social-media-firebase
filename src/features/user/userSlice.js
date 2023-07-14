import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { toast } from 'react-toastify';

const initialState = {
  currentUser: {},
  userProfile: {},
  allUsers: [],
  status: 'idle',
  followStatus: 'idle',
  error: null,
};

export const getAllUsers = createAsyncThunk('user/getAllusers', async () => {
  let allUsers = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach(doc => {
      allUsers.push(doc.data());
    });
    return allUsers;
  } catch (err) {
    console.error('get all users', err);
  }
});

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (uid, thunkAPI) => {
    try {
      const userProfile = {};
      const userRef = doc(db, 'users', uid);
      const postRef = doc(db, 'posts', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userProfile.userData = userSnap.data();
      }
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        userProfile.userPosts = postSnap.data().posts;
      }
      return userProfile;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (
    {
      suggest,
      currentLocation,
      currentUserData,
      uid,
      name,
      username,
      photoURL,
    },
    thunkAPI
  ) => {
    try {
      // Add current user to user followers
      const followUserRef = doc(db, 'users', uid);
      const userData = {
        uid: currentUserData.uid,
        name: currentUserData.name,
        username: currentUserData.username,
        photoURL: currentUserData.photoURL,
      };
      await updateDoc(followUserRef, {
        followers: arrayUnion(userData),
      });
      // Add user to current user following
      const currentUserRef = doc(db, 'users', currentUserData.uid);
      const followUserData = { uid, name, username, photoURL };
      await updateDoc(currentUserRef, {
        following: arrayUnion(followUserData),
      });
      return { userData, followUserData, currentLocation, suggest };
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async ({ currentUserData, unfollowUserData }, thunkAPI) => {
    try {
      // remove current user from user followers
      const unfollowUserRef = doc(db, 'users', unfollowUserData.uid);
      await updateDoc(unfollowUserRef, {
        followers: unfollowUserData.followers.filter(
          user => user.uid !== currentUserData.uid
        ),
      });
      // remove user from current user following
      const currentUserRef = doc(db, 'users', currentUserData.uid);
      await updateDoc(currentUserRef, {
        following: currentUserData.following.filter(
          user => user.uid !== unfollowUserData.uid
        ),
      });
      return {
        currentUserId: currentUserData.uid,
        unfollowUserId: unfollowUserData.uid,
      };
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ uid, profileData, media }) => {
    let headerDownloadURL = media.headerImgURL;
    let profileDownloadURL = media.profileImgURL;
    try {
      // upload header image
      if (media.headerImg) {
        const headerRef = ref(storage, `headerImages/${media.headerImg.name}`);
        const uploadHeaderImg = await uploadBytesResumable(
          headerRef,
          media.headerImg
        );
        headerDownloadURL = await getDownloadURL(uploadHeaderImg.ref);
      }
      // upload profile image
      if (media.profileImg) {
        const profileRef = ref(
          storage,
          `profileImages/${media.profileImg.name}`
        );
        const uploadProfileImg = await uploadBytesResumable(
          profileRef,
          media.profileImg
        );
        profileDownloadURL = await getDownloadURL(uploadProfileImg.ref);
      }
      // update user data
      const updatedDetails = {
        name: profileData.name,
        bio: profileData.bio,
        website: profileData.website,
        headerImage: headerDownloadURL,
        photoURL: profileDownloadURL,
      };
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updatedDetails,
      });
      toast.success('Profile updated successfully');
      return updatedDetails;
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [getUserProfile.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateProfile.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.userProfile.userData = {
        ...state.userProfile.userData,
        ...action.payload,
      };
      state.currentUser = {
        ...state.currentUser,
        name: action.payload.name,
        photoURL: action.payload.photoURL,
      };
      state.status = 'fulfilled';
    },
    [followUser.pending]: state => {
      state.followStatus = 'pending';
      state.error = null;
    },
    [followUser.fulfilled]: (state, action) => {
      if (
        action.payload.currentLocation.includes(action.payload.userData.uid)
      ) {
        state.userProfile.userData.following.push(
          action.payload.followUserData
        );
      }
      if (
        action.payload.currentLocation.includes('user') &&
        !action.payload.currentLocation.includes(action.payload.userData.uid)
      ) {
        if (action.payload.suggest) {
          state.currentUser.following.push(action.payload.followUserData);
          if (
            action.payload.currentLocation.includes(
              action.payload.followUserData.uid
            )
          ) {
            state.userProfile.userData.followers.push(action.payload.userData);
          }
        } else {
          state.userProfile.userData.followers.push(action.payload.userData);
          state.currentUser.following.push(action.payload.followUserData);
        }
      } else {
        if (
          action.payload.currentLocation.includes('/') ||
          action.payload.currentLocation.includes('explore')
        ) {
          state.currentUser.following.push(action.payload.followUserData);
        }
      }

      state.followStatus = 'fulfilled';
      state.error = null;
    },
    [followUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [unfollowUser.pending]: state => {
      state.followStatus = 'pending';
      state.error = null;
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.userProfile.userData.followers =
        state.userProfile.userData.followers.filter(
          user => user.uid !== action.payload.currentUserId
        );
      state.currentUser.following = state.currentUser.following.filter(
        user => user.uid !== action.payload.unfollowUserId
      );
      state.followStatus = 'fulfilled';
      state.error = null;
    },
    [unfollowUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
      state.error = null;
    },
  },
});

export const { saveCurrentUser } = userSlice.actions;
export default userSlice.reducer;
