import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalFooter,
  VStack,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { defaultHeader } from '../asset';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';

const EditProfile = ({ userData }) => {
  const { uid, name, bio, website, photoURL, headerImage } = userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    name: name,
    bio: bio,
    website: website,
  });
  const [media, setMedia] = useState({
    headerImgURL: headerImage,
    profileImgURL: photoURL,
    headerImg: '',
    profileImg: '',
  });

  const handleInputChange = e => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleMediaPreview = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < 5000000) {
        setMedia(prev => ({
          ...prev,
          [e.target.name]: URL.createObjectURL(file),
          [e.target.id]: file,
        }));
      } else {
        toast.error('Image size should not exceed 5MB');
      }
    }
  };

  const handleRemoveHeader = () => {
    setMedia(prev => ({ ...prev, headerImgURL: '' }));
  };

  const handleSaveProfile = () => {
    dispatch(
      updateProfile({
        uid,
        profileData,
        media,
        profileCheck: photoURL,
        headerCheck: headerImage,
      })
    );
  };
  return (
    <>
      <Button variant="outline" marginRight={4} onClick={onOpen}>
        Edit profile
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EditProfile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative">
              <Image
                src={media.headerImgURL}
                fallbackSrc={defaultHeader}
                borderRadius="md"
                width="full"
                height="150px"
                objectFit="cover"
              />
              <Flex
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                alignItems="center"
              >
                <FormLabel margin={0}>
                  <Box
                    as="span"
                    className="material-icons-outlined"
                    color="#fff"
                    backgroundColor="rgba(0,0,0,0.5)"
                    borderRadius="full"
                    padding={2}
                    marginRight={4}
                    cursor="pointer"
                  >
                    camera_enhance
                  </Box>
                  <Input
                    type="file"
                    display="none"
                    name="headerImgURL"
                    id="headerImg"
                    accept="image/jpg, image/png, image/jpeg"
                    onChange={e => handleMediaPreview(e)}
                  />
                </FormLabel>
                <Box
                  as="span"
                  className="material-icons"
                  color="#fff"
                  backgroundColor="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  padding={2}
                  cursor="pointer"
                  onClick={handleRemoveHeader}
                >
                  close
                </Box>
              </Flex>
            </Box>
            <VStack width="full" alignItems="flex-start" padding={4}>
              <Box
                width="120px"
                height="120px"
                marginTop="-60px"
                position="relative"
              >
                <Avatar src={media.profileImgURL} name={name} size="xl" />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  <FormLabel>
                    <Box
                      as="span"
                      className="material-icons-outlined"
                      color="#fff"
                      backgroundColor="rgba(0,0,0,0.5)"
                      borderRadius="full"
                      padding={2}
                      marginRight={4}
                      cursor="pointer"
                    >
                      camera_enhance
                    </Box>
                    <Input
                      type="file"
                      display="none"
                      accept="image/jpg, image/png, image/jpeg"
                      name="profileImgURL"
                      id="profileImg"
                      onChange={e => handleMediaPreview(e)}
                    />
                  </FormLabel>
                </Box>
              </Box>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter name"
                  name="name"
                  value={profileData.name}
                  onChange={e => handleInputChange(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  placeholder="Enter bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={e => handleInputChange(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  placeholder="Enter website"
                  name="website"
                  value={profileData.website}
                  onChange={e => handleInputChange(e)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              borderRadius="full"
            >
              Cancel
            </Button>
            <Button
              borderRadius="full"
              backgroundColor="#6D28D9"
              color="#fff"
              variant="solid"
              _hover={{ backgroundColor: '#6d28d9' }}
              onClick={handleSaveProfile}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditProfile };
