import React from 'react';
import { Box, Flex, Image, Input, useBreakpointValue, InputGroup, InputLeftElement } from '@chakra-ui/react';

const Header: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const searchBarWidth = useBreakpointValue({ base: '80%', md: '60%' });
  const logoSize = useBreakpointValue({ base: '75px', md: '75px' });
  const logoSrc = useBreakpointValue({ base: '/assets/logo-plain.svg', md: '/assets/logo.svg' });

  return (
    <Flex alignItems="center" justifyContent="space-between" p="0 24px" borderBottom="1px solid #2A2C2E">
      <Image
        src={logoSrc}
        alt="Logo"
        boxSize={logoSize}
        objectFit="contain"
      />
      <Box flex="1" textAlign="center">
        <InputGroup width={searchBarWidth} mx="auto">
          <InputLeftElement pointerEvents="none">
            <Image src="/assets/search.svg" alt="Search" boxSize="16px" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            onChange={handleSearch}
            color="white"
          />
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default Header;
