import { Register } from '@/components';
import { Container, Flex, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Flex h={'100vh'} align={'center'} justify={'center'} direction={'column'}>
        <Image src={'../../assets/logo-2.svg'} w={300} h={300} mb={'xl'}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <Register />
      </Flex>
    </Container>
  );
};

export { RegisterPage };
