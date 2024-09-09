import React, { ReactElement } from 'react';

interface IimageGridProps {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>> 
  dataImages: {
    id: number;
    src: string;
  }[] | []
  setDataImages: React.Dispatch<
		React.SetStateAction<
			{
				id: number
				src: string
			}[]
		>
	>
}

const ImageGrid: React.FC<IimageGridProps> = React.memo(({ setSelectedImg, dataImages, setDataImages }): ReactElement => {


  function deleteImg(e) {
    const tmpData = dataImages
    const newArray = tmpData.filter(item => item.id !== +e.currentTarget.firstChild.textContent)
    setDataImages(newArray)
    localStorage.setItem('dataImgs', JSON.stringify(newArray))
  }

  return (
    <div className="img-grid">
      {dataImages && dataImages.map(img => (
        <div key={img.id}>
          <div className="img-wrap" 
            onClick={() => setSelectedImg(img.src)}
          >
            <img src={img.src} alt="uploaded pic" />
          </div>
          <div className='deleteBlock'>
            <div onClick={deleteImg}>
              <span style={{display: "none"}}>{img.id}</span>
              <img src="/public/images/trash.svg" alt="delete" width={30} />
            </div>
          </div> 
        </div>
      ))}
    </div>
  )
})

export default ImageGrid;