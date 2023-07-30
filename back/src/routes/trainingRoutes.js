import {google} from "googleapis";


const key = "AIzaSyCx04qgNh6RyzphcWq8zFXHc--6h_ALpH0";

const youtube = google.youtube({
  version: "v3",
  auth: key 
})


export const searchVideoGoogleApi = async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
      type: "video",
      maxResults: 16,
      order: "date",
      regionCode: "FR",
    });

    // Map through the response items and extract the relevant information
    const videos = response.data.items.map((item) => {
      return {
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
      };
    });

    // Renvoie les vidéos dans la réponse
    res.send(videos);
  } catch (error) {
    next(error);
  }
};