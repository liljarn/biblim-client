import React, { useState, useEffect } from 'react';
import { Icon, Button, Avatar } from '@gravity-ui/uikit';
import { Camera, Person } from '@gravity-ui/icons';

import block from 'bem-cn-lite';
import './ImageUpload.scss';
const b = block('imageUpload');

interface ImageUploadProps {
    placeholder: string;
    onFileChange: (file: File | null) => void;
    value?: string;
    initialValue?: string; // URL изначального изображения
}

export const ImageUpload = ({ placeholder, onFileChange, value, initialValue }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || initialValue || null);

  // Обновляем preview при изменении initialValue
  useEffect(() => {
    if (initialValue && !value) {
      setPreview(initialValue);
    }
  }, [initialValue, value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileChange(null);
    // Сбрасываем значение input для возможности повторного выбора того же файла
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className={b()}>
      <input
        type="file"
        accept="image/*"
        className="file-upload-input"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <div className={b('buttons')}>
        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          size="l"
          view="normal"
        >
          <Icon data={Camera} />{placeholder}
        </Button>
        {preview && (
          <Button size="l" view="flat" onClick={handleRemove}>
            Удалить
          </Button>
        )}
      </div>
      <Avatar
        className={b('preview')}
        imgUrl={preview || undefined}
        icon={Person}
        size='xl'
        theme='brand'
        view='outlined'
      />
    </div>
  );
};
