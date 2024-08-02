import React from 'react';
import { Box, Flex, Image, Input, useBreakpointValue } from '@chakra-ui/react';

const Header: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const searchBarWidth = useBreakpointValue({ base: '80%', md: '60%' });
  const logoSize = useBreakpointValue({ base: '50px', md: '75px' });

  return (
    <Flex alignItems="center" justifyContent="space-between" p="0 24px"       borderBottom="1px solid #2A2C2E"
>
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        boxSize={logoSize}
        objectFit="contain"
      />
      <Box flex="1" textAlign="center">
        <Input
          placeholder="Search..."
          onChange={handleSearch}
          width={searchBarWidth}
          mx="auto"
        />
      </Box>
    </Flex>
  );
};

export default Header;
