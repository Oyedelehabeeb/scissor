import { getUserId } from "./apiAuth";
import { supabase } from "./supabase";

export async function fetchShortenedUrl(originalUrl: string) {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("links")
    .select("shortened_url")
    .eq("original_url", originalUrl)
    .eq("user_id", userId); // Ensure filtering by user ID

  if (error) throw new Error(error.message);
  return data?.[0]?.shortened_url || null;
}

export async function fetchOriginalUrl(
  shortUrl: string
): Promise<string | null> {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("links")
    .select("original_url")
    .eq("shortened_url", shortUrl)
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    console.error("Error fetching original URL:", error);
    return null;
  }

  return data.original_url;
}

export async function insertShortenedUrl(
  originalUrl: string,
  uniqueString: string,
  user_id: string
) {
  const { error } = await supabase
    .from("links")
    .insert([
      { original_url: originalUrl, shortened_url: uniqueString, user_id },
    ]);

  if (error) throw new Error(error.message);
  return uniqueString;
}

export async function fetchUserLinks() {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId); // Only fetch links for this user

  if (error) throw new Error(error.message);
  return data || [];
}

export const deleteLink = async (id: string, userId: string) => {
  const { data, error } = await supabase
    .from("links")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};
