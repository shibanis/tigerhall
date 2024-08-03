import React from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';

interface ContentCardProps {
  name: string;
  imageUri: string;
  categories: string[];
  participants: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    company: string;
  }[];
}

const getResizedImageUrl = (url: string, width: number, height: number) => {
  const urlObj = new URL(url);
  urlObj.pathname = `/resize/${width}x${height}${urlObj.pathname}`;
  return urlObj.toString();
};

const ContentCard: React.FC<ContentCardProps> = ({ name, imageUri, categories, participants }) => {
  const resizedImageUri = getResizedImageUrl(imageUri, 244, 120);

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      width="244px"
      height="272px"
      boxShadow="0px 1px 8px 0px #0000004D"
      position="relative"
    >
      <Image src={resizedImageUri} alt={name} width="244px" height="120px" />
      <Box p="2" color="brand.dark_grey">
        <Text
          fontSize="12px"
          fontWeight="500"
          lineHeight="14.4px"
          letterSpacing="0.015em"
          color="#797670"
          mb="1"
        >
          {categories.join(', ')}
        </Text>
        <Text
          fontSize="16px"
          fontWeight="700"
          lineHeight="19.2px"
          letterSpacing="0.015em"
          mb="1"
        >
          {name}
        </Text>
        <Text
          fontSize="12px"
          fontWeight="500"
          lineHeight="14.4px"
          letterSpacing="0.015em"
          color="#4D4B46"
        >
          {participants[0].firstName} {participants[0].lastName}
        </Text>
        <Text
          fontSize="12px"
          fontWeight="700"
          lineHeight="14.4px"
          letterSpacing="0.015em"
          color="#797670"
        >
          {participants[0].company}
        </Text>
      </Box>
      <Flex position="absolute" bottom="2" right="2">
        <Image src="/assets/share.svg" alt="Share" boxSize="16px" />
        <Image src="/assets/bookmark.svg" alt="Bookmark" boxSize="16px" ml="2" />
      </Flex>
    </Box>
  );
};

export default ContentCard;
