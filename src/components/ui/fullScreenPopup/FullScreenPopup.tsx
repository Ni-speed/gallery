import { FC, ReactNode } from 'react'

import { Portal } from '@/components/ui/portal/Portal'

import style from './FullScreenPopup.module.scss'

type FullScreenPopupProps = {
  children: ReactNode
  modalImageUrl: string
  setModalOpen: (isModalOpen: boolean) => void
}
export const FullScreenPopup: FC<FullScreenPopupProps> = ({
  children,
  modalImageUrl,
  setModalOpen,
}) => {
  return (
    <Portal>
      <div className={style.modal_background} onClick={() => setModalOpen(false)}>
        <div className={style.modal_card}>
          <div
            className={style.modal_content}
            style={{
              backgroundImage: `url(${modalImageUrl}`,
              // backgroundSize: 'cover',
              // filter: 'blur(30px)',
              // height: '100%',
              // position: 'absolute',
              // width: '100%',
            }}
          >
            {/*<img alt={'Modal Image'} className={style.modal_image} src={modalImageUrl} />*/}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
