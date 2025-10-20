import axios from "axios";

const API_URL = "http://localhost:5000/api/emails";

export const fetchEmails = async (query = "") => {
  const res = await axios.get(`${API_URL}?query=${query}`);
  return res.data;
};
