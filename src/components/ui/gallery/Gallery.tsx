import { useEffect, useState } from 'react'

import { imageThunk } from '@/api/slice'
import { useAppSelector } from '@/common/hooks'
import { FullScreenPopup } from '@/components/ui'
import { MainImage } from '@/components/ui/mainImage/MainImage'
import { ThumbnailSlider } from '@/components/ui/thumbnailContainer/ThumbnailSlider'
import { RootState, useAppDispatch } from '@/store/store'

import style from './Gallery.module.scss'

export const Gallery = () => {
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

    if (index === characters.length - 1) {
      const nextCharacterId = characters[characters.length - 1].id + 1

      dispatch(imageThunk.getNextCharacter(nextCharacterId))
      setValue(value + 1)
    }

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
          <img alt={'Modal Image'} className={style.modalImage} src={modalImageUrl} />
        </FullScreenPopup>
      )}
    </div>
  )
}
