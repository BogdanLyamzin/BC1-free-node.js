import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../shared/api/books";

export const fetchBooks = createAsyncThunk(
    "books/fetch",
    async(_, thunkAPI) => {
        try {
            const data = await api.getBooks();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
/*
export const fetchBooks = () => {
    const func = async(dispatch)=> {
        try {
            dispatch(actions.fetchBooksLoading());
            const data = await api.getBooks();
            dispatch(actions.fetchBooksSuccess(data));
        } catch (error) {
            dispatch(actions.fetchBooksError(error.message));
        }
    };

    return func;
};
*/
const isDublicate = ({title, author}, books) => {
    const normalizedTitle = title.toLowerCase();
    const normalizedAuthor = author.toLowerCase();

    const result = books.find(item => {
        return (normalizedTitle === item.title.toLowerCase() && normalizedAuthor === item.author.toLowerCase())
    });

    return Boolean(result);
}

export const addBook = createAsyncThunk(
    "books/add",
    async(data, {rejectWithValue}) => {
        try {
            const result = await api.addBook(data);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
    {
        condition: (data, {getState}) => {
            const {books} = getState();
            if(isDublicate(data, books.items)) {
                alert(`${data.title} ${data.author} is alredy exist`);
                return false;
            }
        }
    }
)

/*
export const addBook = (data) => {
    const func = async (dispatch, getState) => {
        const {books} = getState();
        if(isDublicate(data, books.items)) {
            return alert(`${data.title} ${data.author} is alredy exist`);
        }
        try {
            dispatch(actions.addBookLoading());
            const result = await api.addBook(data);
            dispatch(actions.addBookSuccess(result));
        } catch (error) {
            dispatch(actions.addBookError(error.message))
        }
    };

    return func;
}
*/
export const removeBook = createAsyncThunk(
    "books/remove",
    async(id, {rejectWithValue}) => {
        try {
            await api.removeBook(id);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
/*
export const removeBook = (id) => {
    const func = async (dispatch) => {
        try {
            dispatch(actions.removeBookLoading());
            await api.removeBook(id);
            dispatch(actions.removeBookSuccess(id));
        } catch (error) {
            dispatch(actions.removeBookError(error.message));
        }
    };

    return func;
}
*/

