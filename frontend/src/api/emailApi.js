export const fetchEmails = async () => {
  try {
    const url = "http://127.0.0.1:5000/api/emails";
    console.log("📡 Fetching from:", url);

    const response = await fetch(url);
    console.log("🌐 Response status:", response.status);

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    console.log("✅ Received emails:", data);
    return data;
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    return [];
  }
};
