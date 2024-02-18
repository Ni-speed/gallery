import React, { FC } from 'react'

import { ArrowLeft, ArrowRight } from '@/assets'
import { CharacterResults } from '@/common/types'

import style from './ThumbnailSlider.module.scss'

type ThumbnailProps = {
  characters: CharacterResults[]
  handleNext: () => void
  handlePrevious: () => void
  setValue: React.Dispatch<React.SetStateAction<number>>
  value: number
}

export const ThumbnailSlider: FC<ThumbnailProps> = ({
  characters,
  handleNext,
  handlePrevious,
  setValue,
  value,
}) => {
  return (
    <div className={style.thumbnailContainer}>
      <button className={style.button} onClick={handlePrevious}>
        <ArrowLeft />
      </button>
      {characters.map((character, index) => (
        <div key={index}>
          <img
            alt={`Thumbnail ${index + 1}`}
            className={`${style.thumbnail} ${index === value ? style.selectedThumbnail : ''}`}
            key={index}
            onClick={() => setValue(index)}
            src={character.image}
          />
        </div>
      ))}
      <button className={style.button} onClick={handleNext}>
        <ArrowRight />
      </button>
    </div>
  )
}
