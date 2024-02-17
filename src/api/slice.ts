import { characterApi } from '@/api/character-api'
import { CharacterResults } from '@/common/types/common-types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type ApiState = {
  characters: CharacterResults[]
  error: null | string
  status: 'failed' | 'idle' | 'loading' | 'succeeded'
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
  },
  initialState,
  name: 'api',
  reducers: {},
})

const fetchCharacters = createAsyncThunk('images/imageSlice', async () => {
  const response = await characterApi.getImages()

  return response.data.results
})

export const apiReducer = apiSlice.reducer
export const imageThunk = { fetchCharacters }
