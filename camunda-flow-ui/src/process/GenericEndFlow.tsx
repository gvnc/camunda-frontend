import React from "react";
import {AppDispatch, RootState} from "../config/redux/store";
import {useAppDispatch} from "../config/redux/hook";
import {useSelector} from "react-redux";
import {endProcess, setProcessDefinitionName} from "../config/redux/processInstanceReducer";
import {Button, Card, CardContent, Typography} from "@mui/material";

export default function GenericEndFlow() {

    const dispatch: AppDispatch = useAppDispatch();
    const taskId = useSelector((state: RootState) => state.processInstanceState.processInstance.taskId)

    const terminateFlow = () => {
        if(taskId !== null) {
            dispatch(endProcess(taskId))
                .then(() => dispatch(setProcessDefinitionName('')))
        }
    }

    return (
        <Card sx={{ width: 700 }}>
            <CardContent>
                <Typography variant="h6">
                    This is the End of the flow.
                </Typography>
                <Typography variant="body2">
                    Please terminate it to keep the database clean.
                    <Button variant="outlined" size={"small"} key={`terminate-button`}
                            onClick={terminateFlow}>Terminate</Button>
                </Typography>
            </CardContent>
        </Card>
    );
}