
import { insertShortenedUrl } from "../Services/apiLinks"; // Adjust the path
import { supabase } from "../Services/supabase";

jest.mock("../path/to/your/supabaseClient");

describe("insertShortenedUrl", () => {
  it("should insert a shortened URL and return the uniqueString", async () => {
    // Mock the supabase.from("links").insert() method chain
    const mockInsert = jest.fn().mockResolvedValueOnce({ error: null });
    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const originalUrl = "https://example.com";
    const uniqueString = "scissor/abc123";

    // Call the function
    const result = await insertShortenedUrl(originalUrl, uniqueString);

    // Assertions
    expect(supabase.from).toHaveBeenCalledWith("links");
    expect(mockInsert).toHaveBeenCalledWith([
      { original_url: originalUrl, shortened_url: uniqueString },
    ]);
    expect(result).toBe(uniqueString);
  });

  it("should throw an error if insertion fails", async () => {
    // Mock the supabase.from("links").insert() method chain with an error
    const mockInsert = jest
      .fn()
      .mockResolvedValueOnce({ error: { message: "Insertion failed" } });
    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const originalUrl = "https://example.com";
    const uniqueString = "scissor/abc123";

    // Expect an error to be thrown
    await expect(insertShortenedUrl(originalUrl, uniqueString)).rejects.toThrow(
      "Insertion failed"
    );
  });
});
