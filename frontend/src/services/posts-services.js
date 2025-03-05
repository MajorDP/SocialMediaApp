const mockPosts = [
  {
    id: "0",
    datePosted: "2025-02-20",
    user: {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      username: "user1",
    },
    message: "This is my 0 post!",
    likes: 200,
    comments: [],
  },
  {
    id: "1",
    datePosted: "2025-02-20",
    user: {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      username: "user1",
    },
    message: "This is my first post!",
    likes: 200,
    comments: [],
  },
  {
    id: "2",
    datePosted: "2025-02-21",
    user: {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      username: "user1",
    },
    message: "This is my second post!",
    likes: 100,
    comments: [],
  },
  {
    id: "3",
    datePosted: "2025-02-23",
    user: {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      username: "user1",
    },
    message: "This is my third post!",
    likes: 20,
    comments: [],
  },
];

export const updateVote = async (uid, pid, voteType) => {
  //TODO: Post-rating functionality
  return { data: {}, error: null };
};

export const postComment = async (uid, pid, comment) => {
  //TODO: Commenting functionality
  return { data: {}, error: null };
};

export const getPosts = async (sortValue, userId) => {
  //TODO: get posts with filters/sort values
  return { data: mockPosts, error: null };
};
