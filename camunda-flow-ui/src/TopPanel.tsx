import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    InputLabel,
    NativeSelect,
    Stack
} from "@mui/material";
import React, { useState } from "react";
import {
    cancelProcess,
    setProcessDefinitionName,
    startNewProcess
} from "./config/redux/processInstanceReducer";
import {AppDispatch, RootState} from "./config/redux/store";
import {useAppDispatch} from "./config/redux/hook";
import {useSelector} from "react-redux";
import {config} from "./config/AppConfig";

export default function TopPanel() {
    const dispatch: AppDispatch = useAppDispatch();
    const [processName, setProcessName] = useState(config.processList[0].definitionId);
    const [askConfirmation, setAskConfirmation] = useState(false);
    const processInstanceId = useSelector((state: RootState) => state.processInstanceState.processInstance.id)

    const startProcessWithConfirmation = () => {
        if(processInstanceId !== null) {
            setAskConfirmation(true)
        } else {
            startProcess();
        }
    }

    const startProcess = () => {
        setAskConfirmation(false)
        if(processName !== null) {
            dispatch(setProcessDefinitionName(processName))
            dispatch(startNewProcess(processName));
        }
    }

    const cancelAndStartProcess = () => {
        if(processInstanceId !== null) {
            dispatch(cancelProcess(processInstanceId)).then(() => {
                startProcess()
            })
        }
    }

    return (
        <Stack direction="row" spacing={2}>
            <FormControl>
                <InputLabel variant="standard" htmlFor="process-name">
                    Process
                </InputLabel>
                <NativeSelect
                    defaultValue={processName}
                    inputProps={{
                        name: 'processName',
                        id: 'process-name',
                    }}
                    onChange={event => setProcessName(event.target.value)}
                >
                    {
                        config.processList.map(processDef =>
                            <option value={processDef.definitionId} key={`option-${processDef.definitionId}`}>{processDef.definitionName}</option>
                        )
                    }
                </NativeSelect>
            </FormControl>
            <Button variant="outlined" size={"small"} onClick={startProcessWithConfirmation}>Start Process</Button>
            <Dialog open={askConfirmation} >
                <DialogTitle id="alert-dialog-title">A process is already running !</DialogTitle>
                <DialogContent>
                    Would you like to cancel the running request and start a new one ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAskConfirmation(false)}>No thanks</Button>
                    <Button onClick={cancelAndStartProcess} autoFocus> Yes </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}