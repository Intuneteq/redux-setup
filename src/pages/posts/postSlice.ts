import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

import type { RootState } from "../../app/store";

type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  userId: string;
};

type Status = "idle" | "loading" | "succeeded" | "failed";

interface IPost {
  data: Post[];
  status: Status;
  error: null | string;
}

export const name = "posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

const initialState: IPost = {
  data: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name,
  initialState,
  reducers: {
    addPost: {
      /**
       *
       * @param title
       * @param content
       * @param userId
       *
       * The prepare method runs before the reducer
       * It returns the action payload and calls the reducer method.
       */
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          },
        };
      },

      reducer: (state, action: PayloadAction<Post>) => {
        state.data.push(action.payload);
      },
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";

        const loadedPosts = action.payload.map((post) => {
          post.date = new Date().toISOString();
          return post;
        });

        // Add any fetched posts to the array
        state.data = state.data.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { addPost } = postSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.data;

export const getPostsError = (state: RootState) => state.posts.error;

export const getPostsStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
