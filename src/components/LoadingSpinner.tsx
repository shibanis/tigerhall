import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => (
  <Center h="100vh">
    <Spinner size="xl" color="#FFFFFF"/>
  </Center>
);

export default LoadingSpinner;
