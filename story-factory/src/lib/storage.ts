import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const bucketName = 'videos'; // You need to create this bucket in Supabase and set it to PUBLIC

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadVideo(filePath: string, fileName: string) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not found in .env');
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`☁️ Uploading ${fileName} to Supabase Storage...`);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: 'video/mp4',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    console.log(`✅ File uploaded! Public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading to Supabase:', error.message);
    return null;
  }
}

