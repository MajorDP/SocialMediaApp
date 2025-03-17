export const handleGetChats = async (userId, friendId) => {
  const res = await fetch(
    `http://localhost:5000/chat/get?uid=${userId}&fid=${friendId}`
  );

  if (!res.ok) {
    return { success: false, data: null };
  }

  const data = await res.json();
  console.log(data);
  return { success: true, data: data };
};
