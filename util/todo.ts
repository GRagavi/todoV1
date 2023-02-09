import { APIRequestContext } from "@playwright/test";
import { json } from "stream/consumers";

export async function createTodo(request:APIRequestContext,body:{title:string,status?:string}){
    
    const resp = await request.post("/v1/todo",{
       data: body,
       headers:{
        'content-Type': 'application/json'
       }
    })
    return {status:resp.status(),body: await resp.json()}
}

export async function deleteTodo(request:APIRequestContext,id:number){
    const respons = await request.delete(`/v1/todo/${id}`)
    return await respons.status()
}

export async function updateTodo(request:APIRequestContext,body:{}){
    
}