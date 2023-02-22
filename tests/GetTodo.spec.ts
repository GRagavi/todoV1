import {test,expect} from "@playwright/test"
import { createTodo, deleteTodo, getTodo, getTodoAll } from "../util/todo"
import { NOTFOUND, NULL, RESPONSEBODY, STATUS, SUCCESSCODE, TODOTITLE } from "./Property"

test.describe(TODOTITLE.GETTODO_TITLE,()=>{

    test.beforeAll(async({request},testInfo)=>{
        const {status,body} = await createTodo(request,{title:TODOTITLE.GETTODO,status:STATUS[0]})
        testInfo['id'] = body.id
    })
    test(TODOTITLE.GETTODO,async({request},testInfo)=>{
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
test(TODOTITLE.GET_NONEXISTING_TODO,async({request},testInfo)=>{
    const id = 0
    const {status,body} = await getTodo(request,id)
    expect(body).not.toBe(NULL)
    expect(status).toBe(NOTFOUND)
})

test.describe(TODOTITLE.GET_ALL_RECENTTODOS,()=>{
    
        test.beforeEach(async({request},testInfo)=>{
            const Todos =['First Todo','Secomnd Todo']
            const CreateTodos:RESPONSEBODY[]=[]
            for(const todo in Todos){
                const {body} = await createTodo(request,{title:Todos[todo],status:STATUS[0]})
                CreateTodos.push(body)
                
            }
            testInfo['todos']=CreateTodos
            console.log( testInfo['todos'])
        }) 
        test(TODOTITLE.GET_ALL_RECENTTODOS,async({request},testInfo)=>{
            const CreateTodos_Response:RESPONSEBODY[] = testInfo['todos']
            const {status,body} = await getTodoAll(request)
            for (const res of CreateTodos_Response){
                const foundTodo = body.find(Fetchedtodo=>Fetchedtodo.id==res.id)
                console.log(res.id)
                expect(foundTodo?.id).toBe(res.id)
                expect(foundTodo?.title).toBe(res.title)
            }

        })

        test.afterEach(async({request},testInfo)=>{
            const CreatedResponse:RESPONSEBODY[] = testInfo['todos']
            console.log(CreatedResponse)
            for(const Response in CreatedResponse){
                const resp = await deleteTodo(request,CreatedResponse[Response].id)
                expect(resp).toBe(SUCCESSCODE)
                console.log("deletion done")
            }
})
})

