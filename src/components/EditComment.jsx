import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  MenuItem,
  Button,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, editCommentToState } from '../features/post/postSlice';

const EditComment = ({ commentData, postData }) => {
  const { id, commentText } = commentData;
  const { uid: userId, id: postId } = postData;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentNewText, setCommentNewText] = useState(commentText);

  const handleSaveComment = () => {
    dispatch(editCommentToState({ id, commentNewText }));
    dispatch(editComment({ userId, postId, id, commentNewText }));
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Add your reply"
              resize="none"
              rows="5"
              value={commentNewText}
              onChange={e => setCommentNewText(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              borderRadius="full"
            >
              Close
            </Button>
            <Button
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              variant="solid"
              _hover={{ backgroundColor: '#6d28d9' }}
              isDisabled={commentNewText.trim().length === 0}
              onClick={handleSaveComment}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditComment };
