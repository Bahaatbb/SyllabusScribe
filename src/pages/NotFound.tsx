import { Container } from '@/components';
import { Text, Button, Box } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container title="Not Found">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <IconAlertCircle size={50} stroke={1.5} color="red" />
        <Text ta="center" size="lg" fw={500} mt="md">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button variant="outline" color="#2951DC" size="md" mt="lg" onClick={() => navigate(-1)}>
          Go back home
        </Button>
      </Box>
    </Container>
  );
};

export { NotFound };
