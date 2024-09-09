import React, { ReactElement, useState } from 'react'

type TMessage = '' | 'Please select an image file (png or jpg)'
type TImgFormate = 'image/png' | 'image/jpeg'


interface IUploadFormProps {
	setDataImages: React.Dispatch<
		React.SetStateAction<
			{
				id: number
				src: string
			}[]
		>
	>
}

const UploadForm: React.FC<IUploadFormProps> = ({ setDataImages }): ReactElement => {
	const [error, setError] = useState<TMessage>('')
  const storedData = localStorage.getItem('dataImgs');
  const data: Array<{id: number, src: string} | []> = (storedData) ? JSON.parse(storedData) : []


	const types: readonly TImgFormate[] = ['image/png', 'image/jpeg']

  const imgId = React.useRef<number>((data.length !== 0) ? data[data.length - 1].id : 0)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ++imgId.current
		const selected = e.target.files?.[0]

		if (selected && types.includes(selected.type as TImgFormate)) {
			setError('')
			const reader = new FileReader()
			reader.onloadend = function () {
				if (typeof reader.result === 'string') {
					const base64data = reader.result
						.replace('data:', '')
						.replace(/^.+,/, '')

          setDataImages((prevData) => [...prevData, {
            id: imgId.current,
            src: `data:${selected.type};base64,${base64data}`
          }])

          localStorage.setItem('dataImgs', JSON.stringify([...data, {
            id: imgId.current,
            src: `data:${selected.type};base64,${base64data}`
          }]))

				}
			}
      reader.readAsDataURL(selected)
		} else {
			setError('Please select an image file (png or jpg)')
		}
	}

	return (
		<form>
			<label>
				<input type='file' onChange={handleChange} />
				<span>+</span>
			</label>
			<div className='output'>
				{error && <div className='error'>{error}</div>}
			</div>
		</form>
	)
}

export default UploadForm
