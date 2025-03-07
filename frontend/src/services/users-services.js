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
  const res = await fetch(`http://localhost:5000/auth/friends/${uid}`);

  if (!res.ok) {
    const errorData = await res.json();
    return { data: null, error: errorData.message };
  }

  const data = await res.json();
  return { data: data, error: null };
};

export const sendFriendRequest = async (id, username) => {
  const res = await fetch(`http://localhost:5000/auth/friends/add`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, username }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, message: errorData.message };
  }

  const data = await res.json();
  return { success: true, message: data.message };
};

export const handleFriendRequests = async (type, userId, friendId) => {
  const res = await fetch("http://localhost:5000/auth/friends/handle", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      friendId: friendId,
      type: type,
    }),
  });

  if (!res.ok) {
    return { success: false, data: null };
  }

  const data = await res.json();
  return { success: true, data: data };
};
export const handleRemoveFriend = async (userId, friendId) => {
  //TODO: Handle removing a user from friends list
  return { success: true, data: {} };
};

export const handleFollow = async (type, userId, friendId) => {
  //TODO: Handle following/unfollowing users
  return { success: true, data: {} };
};
