import { APIRequestContext, request } from "@playwright/test";


export async function createTodo(request:APIRequestContext,body:{title?:string,status?:string}){
    
    const resp = await request.post("/v1/todo",{
       data: body,
       headers:{
        'content-Type': 'application/json'
       }
    })
    return {status:resp.status(),body: await resp.json()}
}

export async function deleteTodo(request:APIRequestContext,id:number){
    const resp = await request.delete(`/v1/todo/${id}`)
    return resp.status()
}

export async function getTodo(request:APIRequestContext,id?:number) {
    
 
        const res = await request.get(`/v1/todo/${id}`)
        return {status:res.status(),body: await res.json()}
    
}
    
export async function getTodoAll(request:APIRequestContext) {
    
        const resp = await request.get("/v1/todo")
     
        return {status:resp.status(),body: await resp.json()}
}
export async function patchTodo(request:APIRequestContext,body:{title?:string,status?:string}){
    const respons = await request.patch("/v1/todo",{
        data: body,
        headers:{
         'content-Type': 'application/json'
        }
    })
    return {status:respons.status(),body: await respons.json()} 
}

export async function putTodo(request:APIRequestContext,body:{title?:string,status?:string}){
    const respons = await request.put("/v1/todo",{
        data: body,
        headers:{
         'content-Type': 'application/json'
        }
    })
    return {status:respons.status(),body: await respons.json()}  
}

