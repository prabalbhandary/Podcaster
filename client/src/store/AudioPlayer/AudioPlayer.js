import {createSlice} from "@reduxjs/toolkit";

const AudioPlayerSlice = createSlice({
    name: "audioPlayer",
    initialState: {
        isPlayerDiv: false,
        songPath: "",
        img: ""
    },
    reducers: {
        setDiv(state){
            state.isPlayerDiv = true
        },
        closeDiv(state){
            state.isPlayerDiv = false
        },
        changeSong(state, action){
            const pathOfSong = action.payload;
            state.songPath = pathOfSong
        },
        changeImg(state, action){
            const imgOfSong = action.payload;
            state.img = imgOfSong
        }
    },
});

export const audioPlayerActions = AudioPlayerSlice.actions;

export default AudioPlayerSlice.reducer;