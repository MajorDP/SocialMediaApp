export const getCurrentUser = async () => {
  const token = sessionStorage.getItem("session");
  if (!token) return null;

  try {
    const response = await fetch("http://localhost:5000/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    return {
      ...data,
    };
  } catch (error) {
    throw error;
  }
};

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
    return { data: null, error: data.message };
  }
  return { data: data, error: null };
};

export const setPreferences = async (preferences, userId) => {
  const res = await fetch("http://localhost:5000/auth/preferences", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ preferences: preferences, uid: userId }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, userResponse: null };
  }

  return { success: true, userResponse: data.userResponse };
};

export const getUser = async (userId) => {
  const res = await fetch(`http://localhost:5000/auth/getUser/${userId}`);

  const data = await res.json();

  return { success: true, user: data.user };
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

export const removeFriend = async (userId, friendId) => {
  const res = await fetch("http://localhost:5000/auth/friends/remove", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentUserId: userId,
      friendId: friendId,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    return { success: false, data: null };
  }
  return { success: true, data: data };
};

export const handleFollow = async (type, userId, friendId) => {
  //TODO: Handle following/unfollowing users
  return { success: true, data: {} };
};

export const handleUpdateUser = async (userData) => {
  const token = sessionStorage.getItem("session");
  if (!token) return null;

  const res = await fetch("http://localhost:5000/auth/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
    body: JSON.stringify({ userData: userData }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, data: data.message };
  }

  return { success: true, data: data };
};

export const changeStatus = async (uid, status) => {
  const res = await fetch("http://localhost:5000/auth/status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, status }),
  });

  if (!res.ok) {
    return { success: false, newStatus: null };
  }

  const data = await res.json();

  return { success: true, newStatus: data.newStatus };
};
