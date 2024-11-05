// src/service/batikService.js
import axios from 'axios';

// URL API Firebase untuk mendapatkan data batik
const API_URL = 'https://batikapi-4e2b9-default-rtdb.asia-southeast1.firebasedatabase.app/batik.json';

export const getBatikImages = async () => {
  try {
    const response = await axios.get(API_URL);
    
    // Mengembalikan data sebagai array
    return Object.values(response.data) || [];
  } catch (error) {
    console.error("Kesalahan saat memuat gambar batik:", error);
    throw error;
  }
};
