
export interface ProcessDefinition {
    key: string;
    name: string;
    version: string;
}

export interface ProcessDefinitionStartResponse {
    id: string;
    definitionId: string;
}

export interface Task {
    id: string;
    name: string;
    processInstanceId: string;
    processDefinitionId: string;
    created: string;
}

export interface FormVariable {
    type: string;
    value: string;
}

export interface FormVariableResult {
    [key: string]: FormVariable
}