import * as cheerio from "cheerio";

async function fetchTelegramURL(url) {
  console.log(url, "fetch url");
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const videos = [];
    $("video").each((_, element) => {
      const src = $(element).attr("src");
      if (src) videos.push(src);
    });

    return videos;
  } catch (error) {
    console.error("Failed to fetch Telegram video:", error);
    throw error;
  }
}

export default fetchTelegramURL;
