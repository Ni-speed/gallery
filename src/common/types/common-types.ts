export type Character = {
  info: CharacterInfo
  results: CharacterResults[]
}
export type CharacterInfo = {
  count: number
  next: string
  pages: number
  prev?: any
}
export type CharacterResultsOrigin = {
  name: string
  url: string
}
export type CharacterResultsLocation = {
  name: string
  url: string
}
export type CharacterResults = {
  created: string
  episode: string[]
  gender: string
  id: number
  image: string
  location: CharacterResultsLocation
  name: string
  origin: CharacterResultsOrigin
  species: string
  status: string
  type: string
  url: string
}

export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'
