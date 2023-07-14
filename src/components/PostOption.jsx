import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { EditPost } from './index';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { deletePost } from '../features/post/postSlice';

const PostOption = ({ postData }) => {
  const { uid, id } = postData;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDeletePost = () => {
    dispatch(deletePost({ uid, id, currentLocation: location.pathname }));
  };
  return (
    <Menu>
      <MenuButton>
        <Box as="span" className="material-icons">
          more_vert
        </Box>
      </MenuButton>
      <MenuList minWidth={140}>
        <EditPost postData={postData} />
        <MenuItem color="red.600" onClick={handleDeletePost}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export { PostOption };
