import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../api/instance'
import {IMGS} from '../api/api'



// 获取图片数据
export const fetchImgListAsync = createAsyncThunk('homeSlice/imgs', async (params) => {
    const response = await instance.get(IMGS, params);
    return response.data;
})

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState: {
        imgList: [],
        loading: false
    },
    reducers: {
        setImgList(state, action) {
            state.imgList = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImgListAsync.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchImgListAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.imgList = action.payload
        });
        builder.addCase(fetchImgListAsync.rejected, (state, action) => {
            state.loading = false;
            state.imgList = []
        });
    }
})

export const { setImgList  } = homeSlice.actions;
export default homeSlice.reducer;