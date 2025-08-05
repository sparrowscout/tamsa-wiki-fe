import Image from 'next/image';
import { ImageArray } from './ImageUploader';

export default function SingleImage({ name, src }: ImageArray) {
  return (
    <div className="size-[600px] flex relative" key={name}>
      <Image src={src} fill alt={name} style={{ objectFit: 'contain' }} />
    </div>
  );
}
