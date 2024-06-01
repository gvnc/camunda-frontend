import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {cancelFlow, endFlow, startFlow, submitNext} from "../../service/camundaService";
import {config} from "../AppConfig";

export interface ProcessInstanceState {
    loading: boolean;
    error: string;
    processDefinitionName: string|null;
    processInstance: ProcessInstance;
}

export interface ProcessInstance {
    id: string|null;
    taskId: string|null;
    pageView: string;
    buttonList: string[]|null;
}

const initialState: ProcessInstanceState = {
    loading: false,
    error: "",
    processDefinitionName: "",
    processInstance: {
        id: null,
        taskId: null,
        pageView: config.processNotFoundPage,
        buttonList: null,
    }
}

export const startNewProcess = createAsyncThunk("camunda/startProcess", startFlow)

export const completeTask = createAsyncThunk("camunda/completeTask", submitNext)

export const endProcess = createAsyncThunk("camunda/endProcess", endFlow)

export const cancelProcess = createAsyncThunk("camunda/cancelProcess", cancelFlow)

export const processInstanceSlice = createSlice({
    name: 'processInstance',
    initialState,
    reducers: {
        setProcessDefinitionName: (state, action: PayloadAction<string>) => {
            state.processDefinitionName = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startNewProcess.pending, (state) => {
                state.loading = true;
            })
            .addCase(startNewProcess.fulfilled, (state, action) => {
                state.loading = false;
                state.processInstance = action.payload;
            })
            .addCase(startNewProcess.rejected, (state, action) => {
                state.loading = false;
                state.error = `Starting new process failed. ${action.error.message}`;
            })
            .addCase(completeTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(completeTask.fulfilled, (state, action) => {
                state.loading = false;
                state.processInstance = action.payload;
            })
            .addCase(completeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = `Submitting next step failed. ${action.error.message}`;
            })
            .addCase(endProcess.pending, (state) => {
                state.loading = true;
            })
            .addCase(endProcess.fulfilled, (state, action) => {
                state.loading = false;
                state.processInstance = {
                    id: null,
                    taskId: null,
                    pageView: config.processNotFoundPage,
                    buttonList: null,
                };
            })
            .addCase(endProcess.rejected, (state, action) => {
                state.loading = false;
                state.error = `Failed to end the process. ${action.error.message}`;
            })
            .addCase(cancelProcess.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelProcess.fulfilled, (state, action) => {
                state.loading = false;
                state.processInstance = {
                    id: null,
                    taskId: null,
                    pageView: config.processNotFoundPage,
                    buttonList: null,
                };
            })
            .addCase(cancelProcess.rejected, (state, action) => {
                state.loading = false;
                state.error = `Failed to cancel the process. ${action.error.message}`;
            })
    },
})

export const { setProcessDefinitionName, setError } = processInstanceSlice.actions
export default processInstanceSlice.reducer