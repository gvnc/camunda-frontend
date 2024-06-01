import {
    apiCompleteTask, apiDeleteProcess,
    apiGetFormVariables,
    apiGetTaskByProcessId,
    apiStartNewProcess
} from "../apiClient/camundaClient";
import {ProcessInstance} from "../config/redux/processInstanceReducer";
import {config} from "../config/AppConfig";

const getTaskInfo = async (processId:string):Promise<ProcessInstance> => {
    const taskList = await apiGetTaskByProcessId(processId);
    const taskId = taskList[0].id;
    const formVariableResult = await apiGetFormVariables(taskList[0].id)
    const options = formVariableResult["options"].value
    const response = {
        id: processId,
        taskId: taskId,
        pageView: formVariableResult["pageView"].value,
        buttonList: options !== null ? options.split(',') : []
    }
    return response;
}

export const startFlow = async (processName:string):Promise<ProcessInstance> => {
    const processDefinitionStartResponse = await apiStartNewProcess(processName);
    // task could not be ready so this might need a polling or retry !?!
    const taskInfo = await getTaskInfo(processDefinitionStartResponse.id);
    return taskInfo;
}

export const submitNext = async ({processInstanceId, taskId, userResponse}:
                                     {processInstanceId:string, taskId:string, userResponse:string}):Promise<ProcessInstance> => {
    await apiCompleteTask({taskId, userResponse});
    // task could not be ready so this might need a polling or retry !?!
    const taskInfo = await getTaskInfo(processInstanceId);
    return taskInfo;
}

export const endFlow = async (taskId:string):Promise<boolean> => {
    const userResponse:string = '';
    await apiCompleteTask({taskId, userResponse});
    return true;
}

export const cancelFlow = async (processInstanceId:string):Promise<boolean> => {
    // TODO - check if delete is successful
    await apiDeleteProcess(processInstanceId);
    return true;
}