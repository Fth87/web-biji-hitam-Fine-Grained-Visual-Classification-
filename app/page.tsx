'use client';

import { useState, useRef } from 'react';
import { Upload, Search, X, Sprout } from 'lucide-react';
import Image from 'next/image';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import { useImagePrediction } from '@/hooks/useImagePrediction';

interface CoffeeResult {
  name: string;
  score: string;
}

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<CoffeeResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { prediction, loading: isScanning, error, predictImage } = useImagePrediction();

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setImageFile(file);
    setResult(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const processImage = async () => {
    if (!imageFile) return;
    try {
      const prediction = await predictImage(imageFile);
      setResult({
        name: prediction.class_name,
        score: prediction.confidence.toFixed(1),
      });
    } catch (err) {
      console.error('Prediction failed:', err);
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Navbar />
      {/* Main Content */}
      <main className="grow pt-28 pb-12 px-6 flex flex-col items-center relative z-10 min-h-screen">
        <div className="text-center mb-10 max-w-2xl animate-fadeIn">
          <span className="text-emas-600 text-xs tracking-[0.3em] uppercase mb-2 block font-display">Kekayaan Alam Indonesia</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 gold-gradient-text">Identifikasi Varietas</h2>
          <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed px-4">Menggabungkan warisan leluhur dengan kecerdasan buatan. Kenali 54 jenis biji kopi asli dari Sabang sampai Merauke.</p>
        </div>

        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload Card */}
          <div className="premium-card rounded-xl p-1 relative group">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-emas-600/50 rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-emas-600/50 rounded-br-xl"></div>

            <div className="bg-[#15100b] rounded-lg p-6 md:p-8 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-white text-xl">Unggah Citra Biji</h3>
                <div className="px-3 py-1 bg-kopi-800 rounded border border-kopi-600 text-[10px] text-emas-500 tracking-wider">AI MODEL</div>
              </div>

              <div
                className="relative w-full aspect-4/3 rounded border bogradientrder-dashed border-kopi-600 bg-kopi-900/50 hover:bg-kopi-800/50 hover:border-emas-500 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center overflow-hidden"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => !preview && fileInputRef.current?.click()}
              >
                {!preview ? (
                  <div className="flex flex-col items-center gap-4 text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-kopi-700 to-kopi-800 flex items-center justify-center shadow-lg border border-kopi-600">
                      <Upload className="w-6 h-6 text-emas-400" />
                    </div>
                    <div>
                      <p className="text-gray-300 font-display tracking-wide mb-1">Pilih Gambar</p>
                      <p className="text-xs text-gray-600 font-light">Mendukung JPG, PNG (Maks 5MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full">
                    <Image src={preview} alt="Preview" fill className="object-cover opacity-80" />
                    {isScanning && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-full h-1/2 scan-overlay animate-scan"></div>
                      </div>
                    )}
                    <button onClick={reset} className="absolute top-3 right-3 bg-black/60 hover:bg-red-900/80 text-white p-2 rounded-full transition-colors border border-white/10 z-20">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>

              <button
                onClick={processImage}
                disabled={!preview || isScanning}
                className="mt-6 w-full btn-nusantara py-4 text-emas-100 font-display tracking-widest text-sm uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                {isScanning ? (
                  <span className="animate-pulse">MEMINDAI SERAT BIJI...</span>
                ) : (
                  <>
                    <span>Mulai Identifikasi</span>
                    <Search className="w-4 h-4 text-emas-500" />
                  </>
                )}
                {/* Hover Effect Layer */}
                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-emas-400/20 to-transparent transition-all duration-500 group-hover/btn:left-full"></div>
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className={`premium-card rounded-xl p-1 h-full min-h-[400px] flex flex-col relative transition-opacity duration-500 ${result ? 'opacity-100' : 'opacity-80'}`}>
            <div className="absolute inset-0 bg-batik-pattern opacity-10 pointer-events-none rounded-xl"></div>

            <div className="bg-[#15100b] rounded-lg p-6 md:p-8 grow flex flex-col relative z-10 justify-center">
              {!result ? (
                <div className="grow flex flex-col items-center justify-center text-center py-10">
                  <Sprout className="w-12 h-12 text-kopi-700 mb-4 stroke-1" />
                  <h4 className="font-display text-kopi-500 text-lg">Menunggu Data</h4>
                  <p className="text-xs text-kopi-600 mt-2 font-light max-w-xs">Hasil analisis akan menampilkan varietas dan confidence score.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full animate-fadeIn">
                  <div className="mb-8">
                    <p className="text-xs text-emas-500 uppercase tracking-[0.2em] mb-3">Teridentifikasi Sebagai</p>
                    <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight gold-gradient-text">{result.name}</h2>
                  </div>
                  <div className="relative inline-block p-4 border border-kopi-600 rounded-lg bg-kopi-900/40">
                    <div className="text-4xl font-display font-bold text-emas-400 mb-1">{result.score}%</div>
                    <div className="text-[10px] text-kopi-500 uppercase tracking-widest">Confidence Score</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
