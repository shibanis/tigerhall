import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, Box, SimpleGrid, Center, Text, Spinner, ColorModeScript, Flex } from '@chakra-ui/react';
import Lottie from 'react-lottie-player';
import client from './services/apolloClient';
import ContentCard from './components/ContentCard';
import Header from './components/Header';
import { fetchContentCards } from './services/fetchContentCards';
import theme from './theme'; // Import your custom theme
import lottieJson from './components/loading-animation.json'; // Import your Lottie JSON file
import ShimLoader from './components/ShimLoader'; // Import ShimLoader

const ContentList: React.FC<{
  searchQuery: string;
  content: any[];
  setContent: React.Dispatch<React.SetStateAction<any[]>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ searchQuery, content, setContent, offset, setOffset, hasMore, setHasMore }) => {
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // Add state to track no results
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const newContent = await fetchContentCards(searchQuery, 20, offset);
      setContent((prevContent) => [...prevContent, ...newContent]);
      setLoading(false);

      // If no new content is fetched, set hasMore to false
      if (newContent.length === 0) {
        setHasMore(false);
        if (searchQuery) {
          setNoResults(true); // Set noResults to true if search query was used
        }
      } else {
        setNoResults(false); // Reset noResults if content is fetched
      }
    };

    if (hasMore && !loading) {
      loadContent();
    }
  }, [offset, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <Box p="60px 62px">
      <Text
        fontSize="24px"
        fontWeight="700"
        lineHeight="28.8px"
        letterSpacing="0.015em"
        textAlign="left"
        color="#F4F3F0"
        pb="40px"
      >
        Tigerhall Library
      </Text>
      {loading && searchQuery ? (
        <Center py="4">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 150, height: 150 }}
          />
        </Center>
      ) : noResults ? (
        <Center py="4">
          <Text color="#FFFFFF">
            {searchQuery ? "Oops! No results found. Try refining your search." : "Mission accomplished! You've browsed through everything. Take a victory lap!"}
          </Text>
        </Center>
      ) : (
        <>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="4">
            {content.map((item, index) => (
              <ContentCard
                key={index}
                name={item.name}
                timeSpentOnByUsers={item.timeSpentOnByUsers}
                length={item.length}
                imageUri={item.image.uri}
                categories={item.categories.map((cat: any) => cat.name)}
                participants={item.participants.map((participant: any) => ({
                  firstName: participant.firstName,
                  lastName: participant.lastName,
                  jobTitle: participant.jobTitle,
                  company: participant.company,
                }))}
              />
            ))}
            {loading && Array.from({ length: 4 }).map((_, index) => (
              <ShimLoader key={`shim-${index}`} />
            ))}
          </SimpleGrid>
          <Center ref={sentinelRef} py="4">
            {loading ? (
              <Spinner color="#FFFFFF" />
            ) : hasMore ? (
              <Text color="#FFFFFF">Loading more content...</Text>
            ) : (
              <Text color="#FFFFFF">Mission accomplished! You've browsed through everything. Take a victory lap!"</Text>
            )}
          </Center>
        </>
      )}
    </Box>
  );
};


const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true); // State to track if more content is available

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setOffset(0);
    setContent([]); // Clear content when a new search is performed
    setHasMore(true); // Reset hasMore when a new search is performed
  };

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Box color="brand.dark_grey">
          <Header onSearch={handleSearch} />
          <ContentList
            searchQuery={searchQuery}
            content={content}
            setContent={setContent}
            offset={offset}
            setOffset={setOffset}
            hasMore={hasMore}
            setHasMore={setHasMore}
          />
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
};

render(<App />, document.getElementById('root'));
