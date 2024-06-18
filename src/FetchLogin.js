import axios from 'axios';

export default async function FetchLogin(typeAccess, params) {
  try {
    const response = await axios.post(typeAccess, params);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
