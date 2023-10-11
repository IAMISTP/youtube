import { useQuery } from "@tanstack/react-query";
import { Videos } from "../apis/data";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import ListVideos from "../components/ ListVideos";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../App";

export type ThumbnailsType = {
  default: {
    url: string;
    width: number;
    height: number;
  };
  high: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
};

export type YoutubeResultType = {
  etag: string;
  id: { kind: string; videoId: string };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    publishTime: string;
    thumbnails: ThumbnailsType;
    title: string;
  };
};

type ModeType = {
  mode: boolean;
};

const Home = () => {
  const darkMode = useRecoilValue(darkModeState);
  const { isLoading, isError, data } = useQuery<YoutubeResultType[], Error>({
    queryKey: ["videos"],
    queryFn: Videos,
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <Container mode={darkMode}>
      <ItemContainer>
        <ItemList>
          {data?.map((video: YoutubeResultType) => {
            return <ListVideos key={video.etag} video={video} />;
          })}
        </ItemList>
      </ItemContainer>
    </Container>
  );
};

export default Home;
const Container = styled.div<ModeType>`
  background-color: ${(props) => (props.mode ? "white" : "black")};
`;
const ItemContainer = styled.div`
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
