import axios from 'axios';

async function API_SERVICES({
  url,
  metode = 'GET',
  header = {},
  body = null,
  token = null,
  contentType = 'application/json',
  refreshToken = null,
  timeout = 5000,
}) {
  try {
    if (token && token.trim() !== '') {
      header['Authorization'] = `Bearer ${token}`;
    }

    header['Content-Type'] = contentType;

    if (refreshToken && refreshToken.trim() !== '') {
      header['Cookie'] = `access_token=${token}; refresh_token=${refreshToken}`;
    }

    const response = await axios({
      url: url,
      method: metode,
      headers: header,
      data: body,
      timeout: timeout,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      throw new Error(error.response.data); // Contoh melempar error dengan pesan dari server
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('No response from server'); // Contoh melempar error ketika tidak ada respons
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message); // Contoh melempar error umum
    }
  }
}

export default API_SERVICES;
