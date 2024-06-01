import axios, {HttpStatusCode} from "axios";
import {
    FormVariableResult,
    ProcessDefinition,
    ProcessDefinitionStartResponse,
    Task
} from "./camundaApiInterfaces";
import {config} from "../config/AppConfig"

const restApiBase = config.camundaRestApi

axios.defaults.headers.common = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "HEAD,POST,GET,PUT,DELETE,OPTIONS",
    "Content-Type": "application/json"
};

export const apiGetProcessDefinitions = async ():Promise<ProcessDefinition[]> => {
    const {data} = await axios.get<ProcessDefinition[]>(`${restApiBase}/process-definition`);
    return data;
}

export const apiStartNewProcess = async (processName:string):Promise<ProcessDefinitionStartResponse> => {
    const {data} = await axios.post<ProcessDefinitionStartResponse>(`${restApiBase}/process-definition/key/${processName}/start`, {});
    return data;
}

export const apiGetTaskByProcessId = async (processInstanceId:string):Promise<Task[]> => {
    const {data} = await axios.get<Task[]>(`${restApiBase}/task`, {
        params: {
            processInstanceId: `${processInstanceId}`
        }
    });
    return data;
}

export const apiGetFormVariables = async (taskId:string):Promise<FormVariableResult> => {
    const {data} = await axios.get<FormVariableResult>(`${restApiBase}/task/${taskId}/form-variables`, {
        params: {
            deserializeValues: true
        }
    });
    return data;
}

export const apiCompleteTask = async ({taskId, userResponse}:{taskId:string|null, userResponse:string}):Promise<string> => {
    const body = {
        variables: {
            userResponse: {
                value: userResponse
            }
        },
        withVariablesInReturn: true
    }
    const {data} = await axios.post(`${restApiBase}/task/${taskId}/complete`, body);
    return data;
}

export const apiDeleteProcess = async (processInstanceId:string):Promise<boolean> => {
    const {status} = await axios.delete(`${restApiBase}/process-instance/${processInstanceId}`);
    return status === HttpStatusCode.NoContent;
}