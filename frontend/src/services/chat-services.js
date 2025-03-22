export const handleGetChats = async (userId, friendId) => {
  const res = await fetch(
    `http://localhost:5000/chat/get?uid=${userId}&fid=${friendId}`
  );

  if (!res.ok) {
    return { success: false, data: null };
  }

  const data = await res.json();

  return { success: true, data: data };
};

export const handleSendMessage = async (uid, fid, message, image) => {
  const res = await fetch("http://localhost:5000/chat/send", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sentBy: uid,
      fid: fid,
      message: message,
      image: image,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, chat: null };
  }

  return { success: true, chat: data };
};

export const handleCreateTempChat = async (uid, fid) => {
  const res = await fetch("http://localhost:5000/chat/createTemp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: uid, friendId: fid }),
  });

  const data = await res.json();

  if (!data.success) {
    return { success: false };
  }

  return { success: true };
};

export const handleGetTempChats = async (uid) => {
  const res = await fetch("http://localhost:5000/chat/getTemp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, chats: null };
  }

  return { success: true, chats: data.chats };
};
