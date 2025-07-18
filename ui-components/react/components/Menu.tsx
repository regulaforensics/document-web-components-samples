import { ChangeEvent, FC, useRef, MouseEvent } from 'react';
import passport from '../static/passport.jpg';
import visa from '../static/visa.jpg';

interface MenuProps {
  setProcessingData: (processingData: { mode: 'sample' | 'upload', base64: string }) => void
}

export const Menu: FC<MenuProps> = ({
  setProcessingData,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    convertToBase64({ file: event.target.files?.[0], mode: 'upload' });
  };

  const convertToBase64 = ({ file, mode }: { file: File, mode: 'sample' | 'upload' }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const [_, result] = reader.result.split(',');
        setProcessingData({ mode, base64: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = async (event: MouseEvent<HTMLImageElement>) => {
    const response = await fetch(event.currentTarget.src);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    convertToBase64({ file, mode: 'sample' });
  };

  return (
    <div className='menu'>
      <div className='samples'>
        <div className='title'>Choose image:</div>
        <div className='images'>
          <img src={ passport } onClick={ handleImageClick } alt='passport'/>
          <img src={ visa } onClick={ handleImageClick } alt='visa'/>
        </div>
      </div>
      <div className='upload'>
        <button
          className='button'
          onClick={ handleButtonClick }
        >
          Upload your own
        </button>
        <input
          ref={ inputRef }
          style={{ display: 'none' }}
          type='file'
          accept='image/*'
          onChange={ handleImageUpload }
        />
      </div>
    </div>
  )
}
