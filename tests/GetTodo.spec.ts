import {test,expect} from "@playwright/test"
import exp from "constants"
import { random } from "cypress/types/lodash"
import { createTodo, deleteTodo, getTodo, getTodoAll } from "../util/todo"

test.describe("GetTodo Testcases",()=>{

    test.beforeAll(async({request},testInfo)=>{
        const {status,body} = await createTodo(request,{title:"title and status as body",status:"ACTIVE"})
        testInfo['id'] = body.id
    })
    test("get existing todo should work",async({request},testInfo)=>{
        const id = testInfo['id']
        const {status,body} = await getTodo(request,id)
        expect(body).not.toBe(null)
        expect(status).toBe(200)
    })

    test("delete created",async({request},testInfo)=>{
        const id = testInfo['id']
        const res = await deleteTodo(request,id)})
})
test("get non existing todo should work",async({request},testInfo)=>{
    const id = 34
    const {status,body} = await getTodo(request,id)
    expect(body).not.toBe(null)
    expect(status).toBe(404)
})

test.describe("create and Get Multiple todo",()=>{
    var id:number[] = new Array(5);
        test("Create Multiple Todo's",async({request},testInfo)=>{

            for(let i=0;i<6;i++){
                const {status,body} = await createTodo(request,{title:"title and status as body",status:"ACTIVE"})
                const ID = body.id
                id[i]= ID
            }
        }) 
        test("Get Multiple Todo's",async({request},testInfo)=>{
            const{status,body}= await getTodoAll(request)

        })
})