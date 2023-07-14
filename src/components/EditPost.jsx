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
  Box,
  Image,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { editPost } from '../features/post/postSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPost = ({ postData }) => {
  const { uid, id, postText, postImage } = postData;
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postNewText, setPostNewText] = useState(postText);
  const [postNewImage, setPostNewImage] = useState({
    postImgURL: postImage,
    postImg: '',
  });

  const handlePostImage = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < 5000000) {
        setPostNewImage(() => ({
          postImgURL: URL.createObjectURL(file),
          postImg: file,
        }));
      } else {
        toast.error('Image size should not exceed 5MB');
      }
    }
  };

  const handleRemoveImage = () => {
    setPostNewImage(() => ({ postImgURL: '', postImg: '' }));
  };

  const handleSavePost = () => {
    dispatch(
      editPost({
        uid,
        id,
        postNewText,
        postNewImage,
        currentLocation: location.pathname,
      })
    );
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Tell your Insight..."
              resize="none"
              value={postNewText}
              onChange={e => setPostNewText(e.target.value)}
            />
            {postNewImage.postImgURL && (
              <Box position="relative" paddingTop={2}>
                <Image
                  src={postNewImage.postImgURL}
                  width="full"
                  height="250px"
                  objectFit="contain"
                />
                <Box
                  as="span"
                  className="material-icons"
                  color="#fff"
                  backgroundColor="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  padding={2}
                  cursor="pointer"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  onClick={handleRemoveImage}
                >
                  close
                </Box>
              </Box>
            )}
            <FormLabel margin={0}>
              <Box
                as="span"
                className="material-icons-outlined"
                paddingTop={2}
                cursor="pointer"
              >
                image
              </Box>
              <Input
                type="file"
                display="none"
                accept="image/jpg, image/png, image/jpeg"
                onChange={e => handlePostImage(e)}
              />
            </FormLabel>
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
              isDisabled={postNewText.trim().length === 0}
              onClick={handleSavePost}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditPost };
