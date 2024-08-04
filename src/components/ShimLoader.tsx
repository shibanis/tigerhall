import React from 'react';
import { Box, Image, Text, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

const ShimLoader: React.FC = () => {
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
      <Skeleton height="120px" />
      <Box p="2" color="brand.dark_grey">
        <SkeletonText noOfLines={1} spacing="1" mb="1" />
        <SkeletonText noOfLines={1} spacing="1" mb="1" />
        <SkeletonText noOfLines={1} spacing="1" />
      </Box>
      <Box
        position="absolute"
        top="118px"
        height="2px"
        bg="grey"
        width="244px"
        opacity="1"
      />
      <Flex position="absolute" bottom="2" right="2">
        <Skeleton boxSize="16px" />
        <Skeleton boxSize="16px" ml="2" />
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
        opacity="0.8"
        zIndex="1"
        height="28px"
      >
        <Skeleton boxSize="12px" />
        <SkeletonText noOfLines={1} spacing="1" width="40px" />
      </Box>

      {/* Bottom left headphone icon */}
      <Skeleton
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
        height="24px"
      >
        <Skeleton boxSize="12px" />
        <SkeletonText noOfLines={1} spacing="1" width="40px" />
      </Box>
    </Box>
  );
};

export default ShimLoader;
