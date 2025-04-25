import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const submitForm = createAsyncThunk(
    "form/submit",
    async({formData, endpoint}, thunkAPI) => {
        const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error);
        }

        return await response.json();
    }
)

const initialState = {
    data: {
        username: "",
        password: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setField(state, action) {
            const {name, value} = action.payload;
            state.data[name] = value;
            console.log(initialState)
        },

        resetForm(state) {
            state.data = {
                username: "",
                password: ""
            }
        }
    }
});

export const {setField, resetForm} = authSlice.actions;
