import { useEffect, useState } from 'react'

import style from './ImageSlider.module.scss'

type ImageSliderProps = {
  image: string
}
export const ImageSlider = () => {
  const [images, setImages] = useState<string[]>([])
  const [selectImage, setSelectImage] = useState('')
  const [value, setValue] = useState(0)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')

        if (!response.ok) {
          throw new Error('Failed to fetch characters')
        }
        const data = await response.json()
        const imageUrls: string[] = data.results.map(
          (character: ImageSliderProps) => character.image
        )

        console.log(imageUrls)
        setImages(imageUrls)
        setSelectImage(imageUrls[0])
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    fetchCharacters()
  }, [])

  const handleSelectImage = (image: string, index: number) => {
    setValue(index)
    setSelectImage(image)
  }

  const handleNext = () => {
    const index = value < images.length - 1 ? value + 1 : value

    setValue(index)
    const nextImage = images[index]

    setSelectImage(nextImage)
  }
  const handlePrevious = () => {
    const index = value <= images.length - 1 && value > 0 ? value - 1 : value

    setValue(index)
    const nextImage = images[index]

    setSelectImage(nextImage)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.mainImageContainer}>
        <div className={`${style.invisibleArea} ${style.leftArea}`} onClick={handlePrevious}>
          <img alt={'Here is a bigger picture'} className={style.mainImage} src={selectImage} />
        </div>
        <img alt={'Here is a bigger picture'} className={style.mainImage} src={selectImage} />
        <div className={`${style.invisibleArea} ${style.rightArea}`} onClick={handleNext}>
          <img alt={'Here is a bigger picture'} className={style.mainImage} src={selectImage} />
        </div>
      </div>

      <div className={style.thumbnailContainer}>
        <button className={style.button} onClick={handlePrevious}>
          Previous
        </button>
        {images.map((image, index) => (
          <div className={style.thumbnail} key={index}>
            <img
              alt={`Thumbnail ${index + 1}`}
              className={style.thumbnail}
              key={index}
              onClick={() => handleSelectImage(image, index)}
              src={image}
            />
          </div>
        ))}
        <button className={style.button} onClick={handleNext}>
          Next{' '}
        </button>
      </div>
    </div>
  )
}
