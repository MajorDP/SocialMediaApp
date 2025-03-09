export const getPostById = async (pid) => {
  const res = await fetch(`http://localhost:5000/posts/${pid}`);

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: { message: "Post was not found." } };
  }

  return { data: data, error: null };
};

export const createPost = async (post) => {
  const res = await fetch("http://localhost:5000/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: post }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { success: false, postId: null };
  }

  return { success: true, postId: data.postId };
};

export const editPost = async (post) => {
  const res = await fetch("http://localhost:5000/posts/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: post }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { success: false, postId: null };
  }

  return { success: true, postId: data.postId };
};

export const deletePost = async (pid) => {
  const token = sessionStorage.getItem("session");
  if (!token) {
    return { success: false };
  }

  const res = await fetch("http://localhost:5000/posts/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
    body: JSON.stringify({ pid: pid }),
  });

  if (!res.ok) {
    return { success: false };
  }
  return { success: true };
};

export const getPostsByUser = async (uid) => {
  const res = await fetch(`http://localhost:5000/posts/postedBy/${uid}`);

  if (!res.ok) {
    return { success: false, posts: null };
  }
  const data = await res.json();

  return { success: true, posts: data };
};

export const updateVote = async (uid, pid, voteType) => {
  const res = await fetch(`http://localhost:5000/posts/${voteType}/${pid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: uid }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData };
  }

  const data = await res.json();
  return { data: data, error: null };
};

export const postComment = async (uid, pid, comment) => {
  const res = await fetch(`http://localhost:5000/posts/comment/${pid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid, comment: comment }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData };
  }

  const data = await res.json();
  return { data: data, error: null };
};

export const getPosts = async (sortValue, uid) => {
  const res = await fetch(
    `http://localhost:5000/posts/?sortValue=${sortValue}${
      sortValue === "friends" ? `&uid=${uid}` : ""
    }`
  );

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData.message };
  }

  const data = await res.json();
  return { data, error: null };
};
