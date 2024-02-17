import { useEffect, useState } from 'react'

import { imageThunk } from '@/api/slice'
import { useAppSelector } from '@/common/hooks'
import { FullScreenPopup } from '@/components/ui/fullScreenPopup/FullScreenPopup'
import { MainImage } from '@/components/ui/mainImage/MainImage'
import { ThumbnailSlider } from '@/components/ui/thumbnailContainer/ThumbnailSlider'
import { RootState, useAppDispatch } from '@/store/store'

import style from './ImageSlider.module.scss'

export const ImageSlider = () => {
  const [value, setValue] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageUrl, setModalImageUrl] = useState('')

  const dispatch = useAppDispatch()
  const characters = useAppSelector((state: RootState) => state.api.characters)

  useEffect(() => {
    dispatch(imageThunk.fetchCharacters())
  }, [dispatch])

  const handleNext = () => {
    const index = value < characters.length - 1 ? value + 1 : value

    setValue(index)
  }
  const handlePrevious = () => {
    const index = value > 0 ? value - 1 : characters.length - 1

    setValue(index)
  }
  const handleImageClick = (imageUrl: string) => {
    setModalImageUrl(imageUrl)
    setIsModalOpen(true)
  }

  return (
    <div className={style.wrapper}>
      <MainImage
        character={characters[value]}
        onImageClick={handleImageClick}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <ThumbnailSlider
        characters={characters}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        setValue={setValue}
        value={value}
      />
      {isModalOpen && (
        <FullScreenPopup modalImageUrl={modalImageUrl} setModalOpen={setIsModalOpen}>
          <img alt={'Modal Image'} src={modalImageUrl} />
        </FullScreenPopup>
      )}
    </div>
  )
}
