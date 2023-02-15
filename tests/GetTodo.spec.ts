import {test,expect} from "@playwright/test"
import { createTodo, deleteTodo, getTodo, getTodoAll } from "../util/todo"
import { NOTFOUND, NULL, RESPONSEBODY, STATUS, SUCCESSCODE } from "./Property"

test.describe("GetTodo Testcases",()=>{

    test.beforeAll(async({request},testInfo)=>{
        const {status,body} = await createTodo(request,{title:testInfo.title,status:STATUS[0]})
        testInfo['id'] = body.id
    })
    test.only("get existing todo should work",async({request},testInfo)=>{
        const id = testInfo['id']
        const {status,body} = await getTodo(request,id)
        console.log(body,status)
        expect(body).not.toBe(NULL)
        expect(status).toBe(SUCCESSCODE)
    })

    test.afterEach(async({request},testInfo)=>{
        const id = testInfo['id']
        const resp = await deleteTodo(request,id)
        expect(resp).toBe(SUCCESSCODE)
    })
})
test("get non existing todo should work",async({request},testInfo)=>{
    const id = 0
    const {status,body} = await getTodo(request,id)
    expect(body).not.toBe(NULL)
    expect(status).toBe(NOTFOUND)
})

test.describe("Create and Get Multiple todo",()=>{
    
        test.beforeEach(async({request},testInfo)=>{
            const Todos =[2,3]
            const CreateTodo_Response:RESPONSEBODY[]=[]

            for(const i of Todos){
                const {body} = await createTodo(request,{title:testInfo.title,status:STATUS[0]})
                CreateTodo_Response.push(body)
                testInfo['Todos']=CreateTodo_Response
                console.log( testInfo['Todos'])
            }
        }) 
        test("Get Multiple Todo's",async({request},testInfo)=>{
            const Response:RESPONSEBODY[] = testInfo['Todos']
            const Respons = await getTodoAll(request)
            for (const i of Respons.body){
                Respons.body.find()
                if(Response[i]==Respons.body[i])
                console.log("Valid")
                else
                console.log("Invalid${Respons.body[i]}")
            }

        })

        test.afterEach(async({request},testInfo)=>{
            const CreatedResponse:RESPONSEBODY[] = testInfo['Todos']
            for(const Response of CreatedResponse){
                const resp = await deleteTodo(request,Response.id)
                expect(resp).toBe(SUCCESSCODE)
            }
})
})