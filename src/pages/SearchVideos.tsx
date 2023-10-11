import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { searchVideos } from "../apis/data";
import { YoutubeResultType } from "./Home";
import ListVideos from "../components/ ListVideos";
import { styled } from "styled-components";

const SearchVideos = () => {
  const { searchText } = useParams();

  const { data, isLoading, isError, error } = useQuery<YoutubeResultType[], Error>({
    queryKey: ["searchVideos", searchText],
    queryFn: () => searchVideos(searchText as string),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  console.log(data);
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>{error.message}</span>;
  return (
    <Container>
      <ItemList>
        {data?.map((video: YoutubeResultType) => {
          return <ListVideos key={video.etag} video={video} />;
        })}
      </ItemList>
    </Container>
  );
};

export default SearchVideos;
const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const ItemList = styled.div`
  display: grid;
  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 1024px) and (max-width: 1599px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 480px) and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
