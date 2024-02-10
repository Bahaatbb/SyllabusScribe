import { Container, LoadingForm, ProfileCard, ProfileForm } from '@/components';
import { UserService } from '@/services/user.service';
import { IUser } from '@/types/user';
import { Box, Button, Card, Divider, Flex, rem, Text } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';

const userservice = new UserService();
const getUser = () => {
  return userservice.currentUser();
};

export const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState<IUser>({} as IUser);
  const containerVariants = {
    hidden: { opacity: 0,  },
    visible: { opacity: 1,  transition: { duration: 0.5 } },
  };
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
  };
  const { isLoading } = useQuery<IUser>({
    queryKey: 'user',
    queryFn: getUser,
    onSuccess(data) {
      setFormData(data);
    },
  });
  

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="User Profile" has_parent>
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
          {edit ? 'Edit Profile' : 'Profile'}
          </Text>
          <Button
            leftSection={
              <IconPencil
                style={{
                  width: rem(20),
                  height: rem(20),
                }}
              />
            }
            onClick={() => setEdit(!edit)}
            bg="#2951dc"
            c="#fff"
          >
            {edit ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Flex>
        <Divider />
        <Flex mt="lg" align={'center'} justify={'center'} w={rem(800)} h={'100%'} m="auto">
          <Card radius={'md'} shadow="sm" w={'100%'} h={'100%'}>
            <motion.div
              variants={formVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Box style={{ width: 400, flex: 1 }}>
                <LoadingForm loading={isLoading}>
                  {edit ? <ProfileForm data={formData} /> : <ProfileCard data={formData} />}
                </LoadingForm>
              </Box>
            </motion.div>
          </Card>
        </Flex>
        <Flex align={'center'} justify={'space-between'}></Flex>
      </Container>
    </motion.div>
  );
};
