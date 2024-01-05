import { Login } from '@/components';
import { Box, Container, Flex, Image } from '@mantine/core';
import React from 'react';

const LoginPage = () => {
  return (
    <Container>
      <Flex  h={'100vh'} align={'center'} justify={'center'} direction={'column'}>
        <Image src={'../../assets/logo-2.svg'} w={300} h={300} mb={'xl'} />
        <Login />
      </Flex>
    </Container>
  );
};

export { LoginPage };
