import { Container } from '@/components/Container/Container';
import { useMobxStore } from '@/lib/mobx/store-provider';
import APIService from '@/services/api.service';
import { AuthService } from '@/services/auth.service';
import { motion } from 'framer-motion';
import react from 'react';

const user = new AuthService();
export function HomePage() {
  console.log(user.getAccessToken());
  return (
    <Container title="Home Page">
        hello
    </Container>
  );
}
