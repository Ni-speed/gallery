import { FC, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type PortalProps = {
  children?: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(document.createElement('div'))

  useEffect(() => {
    const portal = document.getElementById('portal')

    if (portal) {
      portal.appendChild(container)
    }

    return () => {
      if (portal) {
        portal.removeChild(container)
      }
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}
