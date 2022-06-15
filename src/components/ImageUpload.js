import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ImageUpload = ({onImageChange, loading}) => {
  const [image, setImage] = useState(undefined)

  const onDrop = (acceptedFiles) => {
    if (!loading){
      setImage(URL.createObjectURL(acceptedFiles[0]))
      onImageChange(acceptedFiles[0])
    }
  }

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop
  });

  return (
    <div className='flex h-screen' {...getRootProps()}>
        <div className='m-auto '>
        {!loading &&
          <input {...getInputProps()} />
        }
        {image? 
          <img className='max-w-screen max-h-screen p-3 shadow  hover:shadow-2xl cursor-pointer' src={image} /> 
          : 
          <div className='rounded-lg border-2 border-slate-400 hover:border-slate-200 border-dashed h-1/2 text-slate-400 p-32'>Drag and drop your image here.</div>
        }
        </div>
    </div>  
  )
}