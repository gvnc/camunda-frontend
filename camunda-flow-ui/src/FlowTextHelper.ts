import * as flowText from "./config/flow-text.json";

interface KeyValuePair {
    [key: string]: string
}

interface FlowText {
    options: KeyValuePair
}

const flowTextData:FlowText = flowText;

export const getFlowTextOptions = (key:string) => {
    return flowTextData.options[key]
}
