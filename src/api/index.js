import axios from "axios";
const key = "AIzaSyAFl_vy-ZylzJRPCO2eUsuoota9cdYP-gc";

export const youTubeQuerry = async (text) => {
  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
  });
  try {
    const {
      data: { items },
    } = await youtube.get("/search", {
      params: {
        q: text,
        type: "video",
        part: "snippet",
        maxResults: 50,
        key: key,
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
  } catch (error) {
    console.log(error);
    return [];
  }
};
