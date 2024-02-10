import { IUser } from '@/types/user';
import { Avatar, Box, Divider, Flex, Group, Text, rem } from '@mantine/core';
import { IconAt, IconInfoCircle, IconTag } from '@tabler/icons-react';

export const ProfileCard = ({ data }: { data: IUser }) => {
  return (
    <Box>
      <Flex justify={'center'} direction={'column'} align={'center'}>
        <Avatar w={rem(100)} h={rem(100)} src={`${import.meta.env.VITE_API_URL}/${data?.avatar}`} />
        <Flex align={'center'} justify={'center'}>
          <IconAt
            style={{
              marginRight: rem(3),
              color: '#bababa',
              width: rem(20),
            }}
          />
          <Text>{data?.first_name + ' ' + data?.last_name}</Text>
        </Flex>
      </Flex>
      <Flex>
        <IconTag
          color="#2951dc"
          style={{
            marginRight: rem(5),
            marginBottom: rem(4)
          }}
        />
        <Text fw={600}>Bio: </Text>
      </Flex>
      <Divider />

      <Text mt="sm">
        {data.bio ||
          `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas dolorum reprehenderit optio
        repudiandae! Qui quaerat inventore exercitationem. Harum officiis animi exercitationem
        deleniti maxime ducimus sunt iure. Eius maxime deserunt quae.`}
      </Text>
      <Flex mt={'lg'}>
        <IconInfoCircle
          color="#2951dc"
          style={{
            marginRight: rem(5),
            marginBottom: rem(4)
          }}
        />
        <Text fw={600}>Info:</Text>
      </Flex>
      <Divider />
      <Group mt="sm" align="center">
        <Text fw={600}>Email:</Text>
        <Text>{data?.email}</Text>
      </Group>
      <Group align="center">
        <Text fw={600}>Username:</Text>
        <Text>{data?.username}</Text>
      </Group>
    </Box>
  );
};
