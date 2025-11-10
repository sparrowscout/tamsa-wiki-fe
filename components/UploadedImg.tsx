import { ImageArray } from './ImageUploader';
import React, { MouseEvent } from 'react';
import SingleImage from './SingleImage';
import styled from 'styled-components';
import useOCRTextStore from '@/store/useOCRTextStore';
import OCRQuotes from './OCRQuotes';
import useCurrentIndexStore from '@/store/useCurrentIndexStore';

interface UploadedImgProps {
  images: ImageArray[];
}

export default function UploadedImg({ images }: UploadedImgProps) {
  const { currentIndex, setCurrentIndex } = useCurrentIndexStore();
  const { textMap } = useOCRTextStore();

  const onClickSlide = (e: MouseEvent) => {
    console.log(e);
    const { clientX, currentTarget } = e;
    const isForward = currentTarget.clientWidth * 0.5 < clientX;

    if (isForward && currentIndex !== images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (!isForward && currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex justify-center items-center">
      <div id="center" className="w-full h-dvh relative" onClick={onClickSlide} />
      {images.map((item, index) => {
        const isForward = currentIndex > index ? -1 : 1;
        const distance = Math.abs(currentIndex - index);
        const isCurrentIndex = currentIndex === index;
        const currentItem = textMap.get(currentIndex);

        return (
          <ImageDummy
            key={item.name}
            $left={distance * isForward * 50 - 50}
            $top={distance * 10}
            $isCurrent={isCurrentIndex}
            $distance={distance}
          >
            <div className="w-dvwㅋ h-[600px]  bg-blue-50">
              <SingleImage name={item.name} src={item.src} />
            </div>

            {isCurrentIndex && currentItem ? (
              <OCRQuotes body={currentItem.content.body} source={currentItem.content.source} />
            ) : null}
          </ImageDummy>
        );
      })}
    </div>
  );
}

const ImageDummy = styled.div<{
  $left: number;
  $top: number;
  $isCurrent: boolean;
  $distance: number;
}>`
  height: 100%;
  position: absolute;
  left: 50%;
  transform: ${({ $left, $top }) => `translate(${$left}%,${$top}%)`};
  z-index: ${({ $isCurrent, $distance }) => ($isCurrent ? 0 : `-${$distance}`)};
  pointer-events: ${({ $isCurrent }) => ($isCurrent ? 'auto' : 'none')};
  filter: ${({ $isCurrent }) => ($isCurrent ? 'blur(0)' : 'blur(2px)')};
  transition: transform 0.3s ease;
  transition-duration: 0.3s;
  background-color: red;
`;
