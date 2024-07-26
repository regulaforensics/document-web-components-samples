import { ChangeEvent, FC, useRef, MouseEvent } from 'react';
import passport from '../static/passport.jpg';
import visa from '../static/visa.jpg';

interface MenuProps {
  setBase64: (base64: string) => void
}

export const Menu: FC<MenuProps> = ({
  setBase64,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    convertToBase64(event.target.files?.[0]);
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const [_, result] = reader.result.split(',');
        setBase64(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = async (event: MouseEvent<HTMLImageElement>) => {
    const response = await fetch(event.currentTarget.src);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    convertToBase64(file);
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
