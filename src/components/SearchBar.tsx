import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Search content..."
    />
  );
};

export default SearchBar;
