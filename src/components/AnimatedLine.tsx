import React from 'react';
import { Box, keyframes } from '@chakra-ui/react';

interface AnimatedLineProps {
  growToWidth: number;
}

const growWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: var(--grow-to-width);
  }
`;

const AnimatedLine: React.FC<AnimatedLineProps> = ({ growToWidth }) => {
  return (
    <Box
      position="absolute"
      top="118px"
      height="2px"
      bg="orange"
      animation={`${growWidth} 2s forwards`}
      sx={{
        '--grow-to-width': `${growToWidth}px`,
      }}
      width="0" // initial width
      opacity="1"
    />
  );
};

export default AnimatedLine;
