import {Button, Snackbar, Stack, Alert, Grid} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import { lazy, Suspense } from 'react';
import {AppDispatch, RootState} from "./config/redux/store";
import {useSelector} from "react-redux";
import {useAppDispatch} from "./config/redux/hook";
import {completeTask, setError} from "./config/redux/processInstanceReducer";
import {config} from "./config/AppConfig";
import {getFlowTextOptions} from "./FlowTextHelper";

export default function WorkflowBody() {

    const dispatch: AppDispatch = useAppDispatch();
    const processInstance = useSelector((state: RootState) => state.processInstanceState.processInstance)
    const processDefinitionName = useSelector((state: RootState) => state.processInstanceState.processDefinitionName)
    const error = useSelector((state: RootState) => state.processInstanceState.error)

    const pageName= processInstance.id === null ? config.processNotFoundPage
        : processDefinitionName + '/' + processInstance.pageView

    const ImportView = lazy(() => import(`./process/${pageName}`));

    const flowButtonClicked = (direction:string) => {
        if(processInstance.id !== null && processInstance.taskId !== null) {
            dispatch(completeTask({processInstanceId:processInstance.id, taskId:processInstance.taskId, userResponse:direction}))
        }
    }

    const errorOnClose = () => {
        dispatch(setError(""))
    }

    const getProcessDefinitionName = () => {
        let processDefinition = config.processList.find(p => p.definitionId === processDefinitionName);
        return processDefinition ? processDefinition.definitionName : "";
    }

    return (
        <Box>
            { processInstance.id !== null &&
                <Box height={65} width={700} display="flex"
                    alignItems="center" p={2} sx={{ border: '1px solid grey' }} >
                    <Grid container>
                        <Grid item xs={3}><b>Process Name</b></Grid>
                        <Grid item xs={9}>{getProcessDefinitionName()}</Grid>
                        <Grid item xs={3}><b>Process Id</b></Grid>
                        <Grid item xs={9}>{processInstance.id}</Grid>
                    </Grid>
                </Box>
            }
            <div style={{marginTop: 20, marginBottom: 20}}>
                <Suspense fallback={<div>Loading...</div>}>
                    <ImportView />
                </Suspense>
            </div>
            <Stack direction="row" spacing={2}>
                {
                    processInstance.buttonList && processInstance.buttonList.map((buttonName:string) =>
                        <Button variant="outlined" size={"small"} key={`${buttonName}-button`}
                                onClick={() => flowButtonClicked(buttonName)}>{getFlowTextOptions(buttonName)}</Button>
                    )
                }
                {
                    processInstance.buttonList &&
                        <Button variant="outlined" size={"small"} key={`next-button`}
                                style={{display: processInstance.buttonList.length > 0 || processInstance.pageView === config.endFlowPage ? 'none' :  'block' }}
                                onClick={() => flowButtonClicked("")}>Next</Button>
                }
            </Stack>
            <Snackbar
                open={error !== null && error !== ""}
                autoHideDuration={6000}
                onClose={errorOnClose}
                message={error}
            >
                <Alert severity="error" variant="filled" sx={{ width: '100%' }}>{error}</Alert>
            </Snackbar>
        </Box>
    );
}