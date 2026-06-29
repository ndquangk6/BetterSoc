import axios from 'axios';

const API_BASE = '/api';

export const getLiveMatches = async (params = {}) => {
  const res = await axios.get(`${API_BASE}/live`, { params });
  return res.data;
};

export const getMatchDetail = async (matchId) => {
  const res = await axios.get(`${API_BASE}/match/${matchId}`);
  return res.data;
};