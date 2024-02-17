import { instance } from '@/common'
import { Character } from '@/common/types'

export const characterApi = {
  getImages() {
    return instance.get<Character>('/character')
  },
}
