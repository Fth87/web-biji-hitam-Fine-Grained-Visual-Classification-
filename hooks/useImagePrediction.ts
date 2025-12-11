import { useState, useCallback } from 'react';

interface PredictionResponse {
  class_name: string;
  confidence: number;
  index: number;
}

interface UseImagePredictionReturn {
  prediction: PredictionResponse | null;
  loading: boolean;
  error: string | null;
  predictImage: (image: File | Blob) => Promise<PredictionResponse>;
}

export const useImagePrediction = (): UseImagePredictionReturn => {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predictImage = useCallback(async (image: File | Blob): Promise<PredictionResponse> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      // Coba dengan field name 'file' instead of 'image'
      formData.append('file', image, image instanceof File ? image.name : 'image.jpg');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: PredictionResponse = await response.json();

      // Validate response structure
      if (!data.class_name || typeof data.confidence !== 'number' || typeof data.index !== 'number') {
        throw new Error('Invalid response format from API');
      }

      setPrediction(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { prediction, loading, error, predictImage };
};
