export const downloadImage = async (url, filename = 'pepe-custom.png') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
      throw new Error('No se pudo descargar la imagen');
    }
  };
  
  export const shareImage = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '¡Mi Pepe personalizado!',
          text: '¡Mira el Pepe que generé!',
          url: url
        });
      } catch (error) {
        console.error('Error al compartir:', error);
        // Fallback a copiar al portapapeles
        await navigator.clipboard.writeText(url);
        return 'URL copiada al portapapeles';
      }
    } else {
      await navigator.clipboard.writeText(url);
      return 'URL copiada al portapapeles';
    }
  };