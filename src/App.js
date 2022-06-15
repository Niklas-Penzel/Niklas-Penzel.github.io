import { ImageUpload } from './components/ImageUpload';
import { InterBox } from "./components/InterBox";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [interpretation, setInterpretation] = useState("")
  const [groundtruth, setGroundtruth] = useState("")
  const API_URL = 'http://38.242.233.5:5000'

  const imageChange = (img) => {
    console.log(img)
    setImage(img)
    setLoading(true)
  }

  const interpretImage = (file) => {
    if (file){
      const payload = new FormData();
      payload.append("name", image.path);
      payload.append("image", file);

      setImage(undefined)
      console.log(payload)

      axios.post(`${API_URL}/api/interpret`, payload, 
      {headers: {
        'Content-Type': 'multipart/form-data'
      }}).then((response) => {
        console.log(response)
        setInterpretation(response.data["interpretation"])
        setGroundtruth(response.data["groundtruth"])
        setLoading(false)
      }).catch((error) => {
        console.log(error);
        setLoading(false)
      });
    }
  }

  const readImage = () => {
    if (image){
      const reader = new FileReader();
      reader.onload = async (e) => { 
        interpretImage(e.target.result)
      };
      reader.readAsDataURL(image);
    }
  }
  

  useEffect(() => {
    readImage();
    interpretImage();
  }, [loading]);


  return (
    <div className="bg-black">
      <div className='grid grid-cols-5 gap-1 h-screen w-screen'>
        <div className={interpretation.trim().length > 0? 
            'col-span-4 text-white bg-gray-800 px-8' 
            : 
            'col-span-5 text-white bg-gray-800 px-8'}>
          <ImageUpload onImageChange={imageChange} loading={loading}></ ImageUpload>
        </div>
        {interpretation.trim().length > 0 &&
        <InterBox interpretation={interpretation} groundtruth={groundtruth} loading={loading}></InterBox>}
      </div>
    </div>
  );
}

export default App;