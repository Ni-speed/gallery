import { instance } from '@/common'
import { Character, CharacterResults } from '@/common/types'

export const characterApi = {
  getImages() {
    return instance.get<Character>('/character')
  },
  getNextImage(id: number) {
    return instance.get<CharacterResults>(`/character/${id}`)
  },
}
