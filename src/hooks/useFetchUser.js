import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useFetchUser = (uid, errorTitle) => {
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUser = async uid => {
      try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const newData = userSnap.data();
          setUpdatedUser(() => ({
            name: newData.name,
            photoURL: newData.photoURL,
          }));
        }
      } catch (err) {
        console.error(errorTitle, err);
      }
    };
    fetchUser(uid);
  }, [uid, errorTitle]);
  return updatedUser;
};

export { useFetchUser };
