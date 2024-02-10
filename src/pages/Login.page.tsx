import { Login } from '@/components';
import { Box, Container, Flex, Image } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Flex h={'100vh'} align={'center'} justify={'center'} direction={'column'}>
        <Image
          src={'../../assets/logo-2.svg'}
          w={300}
          h={300}
          mb={'xl'}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <Login />
      </Flex>
    </Container>
  );
};

export { LoginPage };
