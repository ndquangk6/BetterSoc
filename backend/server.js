require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
// ⚠️ QUAN TRỌNG: Thay BASE_URL bằng endpoint thực tế của Bzzoiro
const BASE_URL = 'https://sports.bzzoiro.com'; // Giả định

// Proxy chung
app.get('/api/:endpoint', async (req, res) => {
  try {
    const { endpoint } = req.params;
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: { 'X-API-Key': API_KEY },
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Lấy danh sách trận đấu live
app.get('/api/live', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/matches/live`, {
      headers: { 'X-API-Key': API_KEY },
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy chi tiết trận đấu + odds + prediction
app.get('/api/match/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchRes = await axios.get(`${BASE_URL}/matches/${id}`, {
      headers: { 'X-API-Key': API_KEY }
    });
    let oddsData = null;
    try {
      const oddsRes = await axios.get(`${BASE_URL}/matches/${id}/odds`, {
        headers: { 'X-API-Key': API_KEY }
      });
      oddsData = oddsRes.data;
    } catch (e) {}

    let predData = null;
    try {
      const predRes = await axios.get(`${BASE_URL}/matches/${id}/prediction`, {
        headers: { 'X-API-Key': API_KEY }
      });
      predData = predRes.data;
    } catch (e) {}

    res.json({
      match: matchRes.data,
      odds: oddsData,
      prediction: predData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
