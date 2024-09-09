import React, { ReactElement } from 'react';

interface IModalProps { 
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>> 
  selectedImg: string
}

const Modal: React.FC<IModalProps> = ({ setSelectedImg, selectedImg }): ReactElement => {

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList?.contains('backdrop')){
      setSelectedImg(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<Document>) => {
    if(e.key === 'Escape')
      setSelectedImg(null)
  }

  return (
    <div className="backdrop" onClick={handleClick}
    >
      <img src={selectedImg} alt="enlarged pic" 
      />
    </div>
  )
}

export default Modal;