/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'pexels';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import ImageModal from './components/ImageModal';
import { PexelPhoto, PexelResponse } from './types';

const App = () => {
  const [photos, setPhotos] = useState<PexelPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PexelPhoto | null>(null);

  useEffect(() => {
    (async () => {
      const client = createClient(import.meta.env.VITE_API_KEY);
      const query = 'Nature';

      const response = (await client.photos.search({ query, per_page: 51 })) as PexelResponse;
      setPhotos(response.photos);
    })();
  }, []);

  const selectPhoto = (photo: PexelPhoto | null) => {
    if (!(document as any).startViewTransition) {
      return setSelectedPhoto(photo);
    }

    const photoElement = document.getElementById(`photo-${photo ? photo.id : selectedPhoto!.id}`);

    if (photoElement) {
      (photoElement.style as any).viewTransitionName = 'photo';
    }

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setSelectedPhoto(photo);
      });
    });
  };

  return (
    <>
      {selectedPhoto && <ImageModal photo={selectedPhoto} onClose={() => selectPhoto(null)} />}
      <div className="grid">
        {photos.map((photo) => (
          <div key={photo.id}>
            {selectedPhoto?.id !== photo.id && (
              <img
                id={`photo-${photo.id}`}
                src={photo.src.large}
                draggable={false}
                loading="lazy"
                onClick={() => selectPhoto(photo)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
