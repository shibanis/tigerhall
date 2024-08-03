import React from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import AnimatedLine from './AnimatedLine';
interface ContentCardProps {
  name: string;
  timeSpentOnByUsers: number;
  length: number;
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

const ContentCard: React.FC<ContentCardProps> = ({ name, imageUri, categories, participants, timeSpentOnByUsers, length }) => {
  const resizedImageUri = getResizedImageUrl(imageUri, 244, 120);
  const growToWidth=75;
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
      <Image
        src={resizedImageUri}
        alt={name}
        width="244px"
        height="120px"
        objectFit="cover"
      />
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
      <Box
        position="absolute"
        top="118px"
        height="2px"
        bg="grey"
        width="244px"
        opacity="1"
      />
      <AnimatedLine growToWidth={growToWidth} />
      <Flex position="absolute" bottom="2" right="2">
        <Image src="/assets/share.svg" alt="Share" boxSize="16px" />
        <Image src="/assets/bookmark.svg" alt="Bookmark" boxSize="16px" ml="2" />
      </Flex>


      {/* Top left content */}
      <Box
        position="absolute"
        top="8px"
        left="8px"
        bg="white"
        borderRadius="8px 0px 5px 0px"
        p="8px"
        display="flex"
        alignItems="center"
        gap="4px"
        opacity="0.8" // Adjust opacity if needed
        zIndex="1"
        height="28px" // Adjust height if needed
      >
        <Image src="/assets/content-status.svg" alt="Content Status" boxSize="12px" />
        <Text
          fontSize="10px"
          fontWeight="700"
          lineHeight="12px"
          letterSpacing="0.015em"
          color="#383733"
        >
          {length} completed
        </Text>
      </Box>

      {/* Bottom left headphone icon */}
      <Image
        src="/assets/podcast.svg"
        alt="{Podcast}"
        boxSize="16px"
        position="absolute"
        bottom="160px"
        left="4px"
        zIndex="1"
      />

      {/* Bottom right translucent tag */}
      <Box
        position="absolute"
        bottom="160px"
        right="4px"
        bg="rgba(0, 0, 0, 0.7)"
        borderRadius="100px"
        p="4px 8px"
        display="flex"
        alignItems="center"
        gap="4px"
        opacity="0.8"
        zIndex="1"
        height="24px" // Adjust height if needed
      >
        <Image src="/assets/time.svg" alt="Time" boxSize="12px" />
        <Text
          fontSize="10px"
          fontWeight="700"
          lineHeight="12px"
          letterSpacing="0.015em"
          color="#FFFFFF"
        >
          {timeSpentOnByUsers}m
        </Text>
      </Box>


    </Box>
  );
};

export default ContentCard;
