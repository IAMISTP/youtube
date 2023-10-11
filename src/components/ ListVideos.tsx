import React from "react";
import { YoutubeResultType } from "../pages/Home";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

type PropsType = {
  video: YoutubeResultType;
};
const ListVideos = ({ video }: PropsType) => {
  const navigation = useNavigate();
  const onClickHandle = (videoId: string) => {
    if (videoId) {
      navigation(`/video/watch/${videoId}`);
    } else {
      alert("video 가 없습니다.");
    }
  };
  console.log(video.id);

  const { channelTitle, thumbnails, description } = video.snippet;

  return (
    <Item key={video.etag} onClick={() => onClickHandle(video.id.videoId)}>
      <Img
        src={`${thumbnails.medium.url}`}
        width={`${thumbnails.medium.width}`}
        height={`${thumbnails.medium.height}`}
      />
      <p>{description}</p>
      <p>{channelTitle}</p>
    </Item>
  );
};

export default ListVideos;

const Item = styled.div`
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
`;
