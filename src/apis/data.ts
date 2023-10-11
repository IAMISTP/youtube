import axios from "axios";
export const getVideos = async () => {
  try {
    const { data } = await axios.get(`/data/youtubeData.json`);
    return data.items;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
export const searchVideos = async (text: string) => {
  try {
    const { data } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${text}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    return data.items;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const getVideo = async (id: string) => {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    const result = await response.data;
    return result.items[0];
  } catch (error) {
    console.log(error);
  }
};

export const Videos = async () => {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    const result = response.data;
    return result.items;
  } catch (error) {}
};
