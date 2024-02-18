import { characterApi } from '@/api/character-api'
import { CharacterResults, RequestStatusType } from '@/common/types/common-types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type ApiState = {
  characters: CharacterResults[]
  error: null | string
  status: RequestStatusType
}
const initialState: ApiState = {
  characters: [],
  error: null,
  status: 'idle',
}

const apiSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<CharacterResults[]>) => {
        state.status = 'succeeded'
        state.characters = action.payload
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Error fetching characters'
      })
      .addCase(getNextCharacter.pending, state => {
        state.status = 'loading'
      })
      .addCase(getNextCharacter.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // state.characters.push(action.payload) // Добавляем полученное изображение в массив
        state.characters = [...state.characters.slice(1), action.payload]
      })
      .addCase(getNextCharacter.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Error fetching character'
      })
  },
  initialState,
  name: 'api',
  reducers: {},
})

const fetchCharacters = createAsyncThunk('images/imageSlice', async () => {
  try {
    const response = await characterApi.getImages()

    return response.data.results
  } catch (error) {
    throw new Error('Error fetching characters')
  }
})

const getNextCharacter = createAsyncThunk('images/fetchNextCharacters', async (id: number) => {
  try {
    const response = await characterApi.getNextImage(id)

    return response.data
  } catch (error) {
    throw new Error('Error fetching next characters')
  }
})

export const apiReducer = apiSlice.reducer
export const imageThunk = { fetchCharacters, getNextCharacter }
