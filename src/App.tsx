import React, { useState } from 'react';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';

function App() {
  const [selectedImg, setSelectedImg] = useState<null | string>(null);
  const [dataImages, setDataImages] = React.useState<Array<{ id: number; src: string }>>(() => {
    const storedData = localStorage.getItem('dataImgs');
    return storedData ? JSON.parse(storedData) : [];
  });

  
  return (
    <div className="App">
      <Title/>
      <UploadForm setDataImages = {setDataImages}/>
      <ImageGrid setSelectedImg={setSelectedImg} dataImages={dataImages} setDataImages = {setDataImages}/>
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
