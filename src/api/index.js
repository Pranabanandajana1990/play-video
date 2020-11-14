import axios from "axios";
const key2 = "AIzaSyBlY8_gftan32DzZ1hINQYLQZiaoNP2iLU";

export const youTubeQuerry = async (text) => {
  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
  });

  const {
    data: { items },
  } = await youtube.get("/search", {
    params: {
      q: text,
      type: "video",
      part: "snippet",
      maxResults: 50,
      key: key2,
    },
  });

  const result = items.map(
    ({
      id: { videoId },
      snippet: { channelId, channelTitle, description, thumbnails, title },
    }) => ({
      channelId,
      videoId,
      description,
      channelTitle,
      thumbnails,
      title,
    })
  );

  return result;
};
