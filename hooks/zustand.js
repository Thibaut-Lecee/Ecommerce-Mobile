import {create} from 'zustand';

export const useStore = create((set) => ({
    urlImg: "",
    setUrlImg: (url) => set({urlImg: url}),

}));