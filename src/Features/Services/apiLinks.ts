import { supabase } from "./supabase";

// interface ShortenLinkProps {
//   originalUrl: string;
//   shortenedUrl: string;
// }

export const fetchShortenedUrl = async (originalUrl: string) => {
  const { data, error } = await supabase
    .from("links")
    .select("shortened_url")
    .eq("original_url", originalUrl);

  if (error) throw new Error(error.message);
  return data?.[0]?.shortened_url || null;
};

export const fetchOriginalUrl = async (
  shortUrl: string
): Promise<string | null> => {
  const { data, error } = await supabase
    .from("links")
    .select("original_url")
    .eq("shortened_url", shortUrl)
    .single(); // We expect only one match

  if (error || !data) {
    console.error("Error fetching original URL:", error);
    return null;
  }

  return data.original_url;
};

export const insertShortenedUrl = async (
  originalUrl: string,
  uniqueString: string
) => {
  const { error } = await supabase
    .from("links")
    .insert([{ original_url: originalUrl, shortened_url: uniqueString }]);

  if (error) throw new Error(error.message);
  return uniqueString;
};

export const getLinks = async () => {
  const { data, error } = await supabase.from("links").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const deleteLink = async (id: string) => {
  const { data, error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
