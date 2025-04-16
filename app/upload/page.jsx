'use client';
import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import SuggestionBox from '@/components/SuggestionBox';

export default function Upload() {
  const [result, setResult] = useState(null);

  const handleAnalyze = async (imageUrl) => {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ imageUrl })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="upload-container">
      <ImageUpload onUpload={handleAnalyze} />
      {result && <SuggestionBox {...result} />}
    </div>
  );
}
