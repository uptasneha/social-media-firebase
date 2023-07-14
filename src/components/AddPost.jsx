import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea, useDisclosure, Avatar, Box, Image, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPost } from '../features/post/postSlice';
import { storage } from '../firebase';
import ReactPlayer from 'react-player';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const { uid, name, username, photoURL } = currentUser;
  const dispatch = useDispatch();

  const handlePostImage = e => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };

  const handleRemoveImage = () => {
    setPostImage(null);
  };

  const uploadMedia = async () => {
    try {
      const storageRef = ref(storage, `media/${postImage.name}`);
      const snapshot = await uploadBytes(storageRef, postImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw new Error('Error uploading media');
    }
  };

  const handleAddPost = async () => {
    try {
      let postImageURL = '';
      if (postImage) {
        postImageURL = await uploadMedia();
      }

      const postData = {
        uid,
        postText,
        name,
        username,
        photoURL,
        postImage: postImageURL,
      };

      dispatch(addPost(postData));
      onClose();
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Error adding post');
    }
  };

  return (
    <>
      <Button
        size="lg"
        width="full"
        borderRadius="full"
        backgroundColor="#6D28D9"
        color="#fff"
        display={['none', 'none', 'block']}
        variant="solid"
        _hover={{ backgroundColor: '#6d28d9' }}
        onClick={onOpen}
      >
        Add Post
      </Button>
      <Button
        size="lg"
        borderRadius="full"
        backgroundColor="#6D28D9"
        color="#fff"
        display={['block', 'block', 'none']}
        position="fixed"
        right="16px"
        bottom="72px"
        padding={3}
        variant="solid"
        _hover={{ backgroundColor: '#6d28d9' }}
        onClick={onOpen}
      >
        <Box as="span" className="material-icons">
          add
        </Box>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Avatar name={name} src={photoURL} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Tell your Insight..."
              resize="none"
              value={postText}
              onChange={e => setPostText(e.target.value)}
            />
            {postImage && (
              <Box position="relative" paddingTop={2}>
                {ReactPlayer.canPlay(postImage.name) ? 
                  <ReactPlayer url={URL.createObjectURL(postImage)} controls={true} width="100%" height="250px" />
                : 
                  <Image src={URL.createObjectURL(postImage)} width="full" height="250px" objectFit="contain" />
                }

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
                accept="image/jpg, image/png, image/jpeg, video/mp4, video/quicktime"
                onChange={e => handlePostImage(e)}
              />
            </FormLabel>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              _hover={{ backgroundColor: '#6d28d9' }}
              isDisabled={postText.trim().length === 0}
              onClick={handleAddPost}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddPost };
