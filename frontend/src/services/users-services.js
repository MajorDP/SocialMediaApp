export const signIn = async (authData) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    return { data: null, error: data.message };
  }
  return { data: data, error: null };
};

export const signUp = async (authData) => {
  const res = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    return { data: null, error: data.message };
  }
  return { data: data, error: null };
};

export const getFriends = async (uid) => {
  //TODO: Get friends of current user
  return { data: {}, error: null };
};

export const sendFriendRequest = async (id, username) => {
  //TODO: Handle sending friend requests
  return { success: true, message: "" };
};

export const handleFriendRequests = async (type, userId, friendId) => {
  //TODO: Handle accepting/rejecting of friend requests
  return { success: true, data: {} };
};

export const handleRemoveFriend = async (userId, friendId) => {
  //TODO: Handle removing a user from friends list
  return { success: true, data: {} };
};

export const handleFollow = async (type, userId, friendId) => {
  //TODO: Handle following/unfollowing users
  return { success: true, data: {} };
};
