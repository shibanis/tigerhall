import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

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

const ContentCard: React.FC<ContentCardProps> = ({ name, imageUri, categories, participants }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Image src={imageUri} alt={name} />
      <Box p="6">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {name}
        </Text>
        <Text mb="2">Categories: {categories.join(', ')}</Text>
        <Text>Participants:</Text>
        {participants.map((participant, index) => (
          <Box key={index} ml="4">
            <Text>
              {participant.firstName} {participant.lastName}
            </Text>
            {participant.jobTitle && <Text>Title: {participant.jobTitle}</Text>}
            {participant.company && <Text>Company: {participant.company}</Text>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContentCard;
