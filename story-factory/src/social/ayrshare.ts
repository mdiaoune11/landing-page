import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AYRSHARE_API_URL = 'https://api.ayrshare.com/api/post';

export async function postToSocial(videoUrl: string, caption: string, platforms: string[] = ['tiktok', 'reels', 'youtube']) {
  const apiKey = process.env.AYRSHARE_API_KEY;
  if (!apiKey) {
    throw new Error('AYRSHARE_API_KEY is not set');
  }

  try {
    console.log(`📤 Sending to Ayrshare for platforms: ${platforms.join(', ')}...`);
    
    const response = await axios.post(
      AYRSHARE_API_URL,
      {
        post: caption,
        mediaUrls: [videoUrl],
        platforms: platforms,
        autoHashtags: true,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error posting to Ayrshare:', error.response?.data || error.message);
    return null;
  }
}

