import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbnailsType } from "./Home";
import { useQuery } from "@tanstack/react-query";
import { getVideo } from "../apis/data";

type SnippetType = {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  defaultLanguage: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: string;
  tags: string[];
  thumbnails: ThumbnailsType;
  title: string;
};

type DetailVideoType = {
  etag: string;
  id: string;
  kind: string;
  snippet: SnippetType;
};

const VideoDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery<DetailVideoType, Error>({
    queryKey: ["searchVideos", id],
    queryFn: () => getVideo(id as string),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <span>isLoading..</span>;
  if (isError) return <span>{error.message}</span>;

  console.log(data);

  return (
    <div>
      <iframe
        id="player"
        width="640"
        height="390"
        src={`http://www.youtube.com/embed/${data.id}?enablejsapi=1`}
      ></iframe>
      <h3>{data?.snippet?.title}</h3>
    </div>
  );
};

export default VideoDetail;
