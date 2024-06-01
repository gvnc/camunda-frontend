import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

export default function GeneralPodChecks() {
    return (
        <Card sx={{ width: 700 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    General Pod Checks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec justo fringilla, vestibulum sem eu, posuere libero. Maecenas ullamcorper dui at sollicitudin ullamcorper. Nunc pulvinar, arcu vitae aliquam vehicula, ex enim ultricies felis, ut eleifend lectus nunc at tortor. Suspendisse convallis a metus quis porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed accumsan consectetur augue faucibus semper. Mauris gravida ante finibus odio faucibus porttitor. Sed a varius nibh. Fusce varius ante eget neque maximus fermentum.
                </Typography>
            </CardContent>
        </Card>
    );
}