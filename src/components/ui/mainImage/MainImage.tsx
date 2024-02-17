import React from 'react'

import { CharacterResults } from '@/common/types'

import style from './MainImage.module.scss'

interface MainImageProps {
  character: CharacterResults
  onImageClick: (imageUrl: string) => void
  onNext: () => void
  onPrevious: () => void
}

export const MainImage: React.FC<MainImageProps> = ({
  character,
  onImageClick,
  onNext,
  onPrevious,
}) => {
  return (
    <div className={style.mainImageContainer}>
      <div className={`${style.invisibleArea} ${style.leftArea}`} onClick={onPrevious}>
        <img alt={'invisibleArea'} className={style.mainImage} src={character?.image} />
      </div>
      <img
        alt={'Here is a bigger picture'}
        className={style.mainImage}
        onClick={() => onImageClick(character?.image)}
        src={character?.image}
      />
      <div className={`${style.invisibleArea} ${style.rightArea}`} onClick={onNext}>
        <img alt={'invisibleArea'} className={style.mainImage} src={character?.image} />
      </div>
    </div>
  )
}
