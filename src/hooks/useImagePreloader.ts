"use client";

import { useState, useEffect, useRef } from "react";

export function useImagePreloader(frameCount: number) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading || loaded || imagesRef.current.length > 0) return;

    setIsLoading(true);
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / frameCount) * 100);
      setProgress(newProgress);

      if (loadedCount === frameCount) {
        setLoaded(true);
        setIsLoading(false);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      img.src = src;
      img.onload = updateProgress;
      img.onerror = () => {
        console.error(`Failed to load: ${src}`);
        updateProgress();
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [frameCount, isLoading, loaded]);

  return { images: imagesRef.current, progress, loaded };
}
