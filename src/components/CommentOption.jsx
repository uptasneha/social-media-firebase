import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { EditComment } from './index';
import { useDispatch } from 'react-redux';
import {
  deleteComment,
  deleteCommentToState,
} from '../features/post/postSlice';

const CommentOption = ({ commentData, postData }) => {
  const { id } = commentData;
  const { uid: userId, id: postId } = postData;
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteCommentToState({ id }));
    dispatch(deleteComment({ userId, postId, id }));
  };
  return (
    <Menu>
      <MenuButton>
        <Box as="span" className="material-icons">
          more_vert
        </Box>
      </MenuButton>
      <MenuList minWidth={140}>
        <EditComment commentData={commentData} postData={postData} />
        <MenuItem color="red.600" onClick={handleDeleteComment}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export { CommentOption };
