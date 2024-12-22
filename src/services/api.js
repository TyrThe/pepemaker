const API_URL = 'https://pepemaker-backend.onrender.com';

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
      const errorData = await response.json();
      throw new Error(errorData.details || errorData.error || 'Error en el servidor');
    }

    const data = await response.json();
    
    if (!data.imageUrl) {
      throw new Error('No se recibió URL de imagen');
    }

    return data.imageUrl;
  } catch (error) {
    console.error('Error en la API:', error);
    throw error;
  }
};
