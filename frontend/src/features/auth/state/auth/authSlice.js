
import { createSlice } from '@reduxjs/toolkit'
import { currentEmployee, loginEmployee, registerEmployee } from './authAction';
let authSlice=createSlice({
name:'auth',
initialState:{
    user:null,
    isLoading:false
    
},
reducers:{
    addUser:(state,action)=>{
        state.user=action.payload;
        state.isLoading=false

    },
    removeUser:(state)=>{
        state.user=null;
        state.isLoading=false
    }
    
},
extraReducers:(builder)=>{
builder.addCase(loginEmployee.pending,(state)=>{
    state.isLoading=true
}).addCase(loginEmployee.fulfilled,(state,action)=>{
    state.user=action.payload
    state.isLoading=false
}).addCase(loginEmployee.rejected,(state)=>{
    state.isLoading=false
}).addCase(currentEmployee.pending,(state)=>{
    state.isLoading=true
}).addCase(currentEmployee.fulfilled,(state,action)=>{
    state.user=action.payload
    state.isLoading=false
}).addCase(currentEmployee.rejected,(state)=>{
    state.isLoading=false
})
    .addCase(registerEmployee.pending,(state)=>{
        state.isLoading=true
    }).addCase(registerEmployee.fulfilled,(state,action)=>{
        state.user=action.payload
        state.isLoading=false
    }).addCase(registerEmployee.rejected,(state)=>{
        state.isLoading=false
    })
}

})


export const { addUser, removeUser } = authSlice.actions
export default authSlice.reducer