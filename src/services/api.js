const API_URL = 'http://localhost:3000';

export const generatePepe = async (prompt) => {
  try {
    const response = await fetch(`${API_URL}/generate-pepe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error generando la imagen:', error);
    throw error;
  }
};