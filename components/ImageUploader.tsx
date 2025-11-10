'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import UploadedImg from './UploadedImg';
import useOCRTextStore from '@/store/useOCRTextStore';
import LoadingProcess from './LoadingProcess';

export type ImageArray = {
  src: string;
  name: string;
};

export default function ImageUploader() {
  const [images] = useState<ImageArray[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTextMap } = useOCRTextStore();
  const [websocket, setWebSocket] = useState<WebSocket>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!websocket) return;

    websocket.onmessage = function (event) {
      const { data } = event;
      const result = JSON.parse(data);

      if (result.status === 'done') {
        websocket.close();
        setIsLoading(false);
        return;
      }

      setTextMap(result.index, {
        id: result.id,
        content: {
          body: result.text,
          source: {
            title: result.source.title,
            author: result.source.author,
            episode: result.source.episode,
          },
        },
      });
      setCurrent(Number(result.index) + 1);
    };
  }, [websocket]);

  const onChangeImgInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setIsLoading(true);

    Array.from(files).forEach((element) => {
      images.push({ src: URL.createObjectURL(element), name: element.name });
    });

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      formData.append('files', file);
      formData.append('ids', file.name);
      formData.append('indexes', `${i}`);
    }

    setWebSocket(new WebSocket('ws://localhost:8000/'));

    await fetch('http://localhost:8000/ocr/start', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <input type="file" accept="image/*" onChange={onChangeImgInput} multiple />
      {isLoading ? <LoadingProcess current={current} entire={images.length} /> : null}
      <UploadedImg images={images} />
    </div>
  );
}
