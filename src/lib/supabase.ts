import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to upload images
export const uploadCarImage = async (file: File, carId: string, imageIndex: number) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${carId}_${imageIndex}.${fileExt}`;
  const filePath = `car-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('car-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('car-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

// Helper function to delete image
export const deleteCarImage = async (imageUrl: string) => {
  const path = imageUrl.split('/').pop();
  if (!path) return;

  const { error } = await supabase.storage
    .from('car-images')
    .remove([`car-images/${path}`]);

  if (error) {
    throw error;
  }
};</parameter>