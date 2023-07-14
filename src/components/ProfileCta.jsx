import { Button } from '@chakra-ui/react';
import { userLogout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../features/user/userSlice';
import { EditProfile } from './index';
import { useLocation } from 'react-router-dom';

const ProfileCta = ({ followUserData, userData }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser, userProfile, followStatus } = useSelector(
    state => state.user
  );
  const currentUserData = { ...currentUser };
  const unfollowUserData = { ...userProfile.userData };

  const FollowOrUnfollow = () => {
    return (
      <>
        {currentUser.following.some(user => user.uid === followUserData.uid) ? (
          <Button
            variant="outline"
            isLoading={followStatus === 'pending'}
            onClick={() =>
              dispatch(unfollowUser({ currentUserData, unfollowUserData }))
            }
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="outline"
            isLoading={followStatus === 'pending'}
            onClick={() =>
              dispatch(
                followUser({
                  suggest: false,
                  currentLocation: location.pathname,
                  currentUserData,
                  ...followUserData,
                })
              )
            }
          >
            Follow
          </Button>
        )}
      </>
    );
  };
  return (
    <>
      {currentUser.uid === followUserData.uid ? (
        <>
          <EditProfile userData={userData} />
          <Button colorScheme="red" onClick={() => dispatch(userLogout())}>
            Logout
          </Button>
        </>
      ) : (
        <FollowOrUnfollow />
      )}
    </>
  );
};

export { ProfileCta };
