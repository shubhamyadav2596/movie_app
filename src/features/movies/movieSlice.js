import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (name) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${name}&type=movie`)
      .catch((err) => console.log(err));
    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (name) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${name}&type=series`)
      .catch((err) => console.log(err));
    return response.data;
  }
);

export const fetchAsyncMovieOrShow = createAsyncThunk(
    "movies/fetchAsyncMovieOrShow",
    async (id) => {
      const response = await movieApi
        .get(`?apikey=${APIKey}&i=${id}&Plot-full`)
        .catch((err) => console.log(err));
      return response.data;
    }
  );

const initialState = {
  movies: {},
  shows: {},
  selectedMovies : {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovies = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("success");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("rejected");
      })

    .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
      console.log("success");
      return { ...state, shows: payload };
    })
    .addCase(fetchAsyncMovieOrShow.fulfilled, (state, { payload }) => {
      console.log("success");
      return { ...state, selectedMovies: payload };
    });
  },
});

export default movieSlice.reducer;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMoviesOrShows = (state) => state.movies.selectedMovies;
export const { removeSelectedMovieOrShow } = movieSlice.actions;
