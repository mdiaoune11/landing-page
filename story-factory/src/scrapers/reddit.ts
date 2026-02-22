import axios from 'axios';

interface RedditPost {
  title: string;
  selftext: string;
  score: number;
  url: string;
}

export async function fetchTrendingStories(subreddit: string = 'AmItheAsshole', limit: number = 5): Promise<RedditPost[]> {
  try {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=all`);
    const posts = response.data.data.children.map((child: any) => ({
      title: child.data.title,
      selftext: child.data.selftext,
      score: child.data.score,
      url: `https://reddit.com${child.data.permalink}`,
    }));

    // Filter out posts without text or too short
    return posts.filter((post: RedditPost) => post.selftext && post.selftext.length > 200);
  } catch (error) {
    console.error('Error fetching Reddit stories:', error);
    return [];
  }
}

