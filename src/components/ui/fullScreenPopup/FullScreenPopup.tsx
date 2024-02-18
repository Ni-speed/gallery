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
        <div className={style.modal_card} style={{ backgroundImage: `url(${modalImageUrl}` }}>
          <div className={style.modal_content}>{children}</div>
        </div>
      </div>
    </Portal>
  )
}
