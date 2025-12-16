import { useState, useCallback } from 'react';

export interface PredictionResult {
  class_name: string;
  confidence: number;
  index: number;
}

interface APIResponse {
  predictions: PredictionResult[];
}

interface UseImagePredictionReturn {
  predictions: PredictionResult[];
  loading: boolean;
  error: string | null;
  predictImage: (image: File | Blob) => Promise<PredictionResult[]>;
}

export const useImagePrediction = (): UseImagePredictionReturn => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predictImage = useCallback(async (image: File | Blob): Promise<PredictionResult[]> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', image, image instanceof File ? image.name : 'image.jpg');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: APIResponse = await response.json();

      if (!data.predictions || !Array.isArray(data.predictions)) {
        throw new Error('Invalid response format from API: missing predictions array');
      }

      setPredictions(data.predictions);
      return data.predictions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { predictions, loading, error, predictImage };
};
