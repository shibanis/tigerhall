import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, Box, SimpleGrid, Center, Text, Spinner } from '@chakra-ui/react';
import client from './services/apolloClient';
import SearchBar from './components/SearchBar';
import ContentCard from './components/ContentCard';
import { fetchContentCards } from './services/fetchContentCards';

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
    <Box>
      <SimpleGrid columns={[1, 2, 3]} spacing="4">
        {content.map((item, index) => (
          <ContentCard
            key={index}
            name={item.name}
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
      </SimpleGrid>
      <Center ref={sentinelRef} py="4">
        {loading ? <Spinner /> : hasMore ? <Text>Loading more content...</Text> : <Text>No more content to load.</Text>}
      </Center>
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
      <ChakraProvider>
        <Box p="4">
          <SearchBar onSearch={handleSearch} />
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
