'use client';
import { ChangeEvent, useState } from 'react';
import { createWorker, ImageLike } from 'tesseract.js';

export default function ImageUploader() {
  const [OCRText, setOCRText] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeOCR = async (image: ImageLike) => {
    const worker = await createWorker('kor');

    // await worker.setParameters({
    //   tessedit_char_whitelist: '가-힣ㄱ-ㅎㅏ-ㅣ .,!?\'"“”‘’()[]{}:;|/\\1234567890\n',
    //   preserve_interword_spaces: '1',
    // });

    const ret = await worker.recognize(image);
    console.log(ret);
    console.log(ret.data.text);

    await worker.terminate();
    return ret.data.text;
  };

  const onChangeImgInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;
    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:8000/ocr', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    const result = await fixOcrTextWithGPT(data.text);
    setIsLoading(false);
    setOCRText(result);
  };

  async function fixOcrTextWithGPT(rawText: string): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'OCR로 인식된 텍스트를 네가 고쳐줘야돼. 한글이고 오타만 고쳐줘. ',
          },
          {
            role: 'user',
            content: rawText,
          },
        ],
        temperature: 0.4,
        max_tokens: 1024,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? '';
  }

  return (
    <>
      <input type="file" accept="image/*" onChange={onChangeImgInput} />
      {OCRText}
    </>
  );
}
