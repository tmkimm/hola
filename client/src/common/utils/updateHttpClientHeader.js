import httpClient from 'service/http_client';

export const updateHttpClientHeader = (accessToken) => {
  if (accessToken) httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
