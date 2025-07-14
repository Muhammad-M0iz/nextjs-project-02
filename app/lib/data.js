export async function fetchPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}?_limit=10`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

export async function fetchPostById(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return await res.json();
  } catch (err) {
    console.error("Error fetching post:", err);
    throw err;
  }
}

export async function fetchCommentsByPostId(postId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${postId}/comments`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return await res.json();
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw err;
  }
}

