import axios from 'axios';
export async function  getAllTask(){
    const response = await axios.get('/tasks',
        {mode: 'no-cors', });
    return response.data;
}

export async function  addTask(task){
    console.log("=====", JSON.stringify(task));
    const response = await axios.post(
        '/tasks/task',
        {description: task.description,taskDate:task.taskDate});
    return response.data;
}

export async function  closeTasks(ids){
    const response = await axios.put(
        '/tasks',
        ids);
    return response.data;
}

export async function  deleteTasks(ids){
    let param = '';
    for(let i in ids){
        param+="id="+ids[i];
        if(i < ids.length-1){
            param+="&"
        }
    }
    const response = await axios.delete(`/tasks?${param}`);
    return response.data;
}