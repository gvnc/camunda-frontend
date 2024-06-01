import * as React from 'react';
import TopPanel from './TopPanel';
import WorkflowBody from './WorkflowBody';
import {Grid} from "@mui/material";

export default function App() {

    return (
        <Grid container spacing={2} style={{marginLeft:20,marginTop:1}} >
            <Grid item xs={12}>
                <TopPanel />
            </Grid>
            <Grid item xs={8}>
                <WorkflowBody />
            </Grid>
        </Grid>
    );
}
