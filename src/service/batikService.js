// src/service/batikService.js
import axios from 'axios';

const API_URL = 'https://api.jsonbin.io/v3/b/638580dba3c728450eda30e6?meta=false';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export const getBatikImages = async () => {
  try {
    const response = await api.get('');
    console.log('Raw API Response:', response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching batik images:", error);
    throw error;
  }
};