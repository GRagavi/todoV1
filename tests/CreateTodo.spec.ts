import {test,expect, request} from "@playwright/test"
import { createTodo, deleteTodo } from "../util/todo"


test.describe("Create Todo_PositiveCases",()=>{
    test("Creation of todo should work without passing status field",async({request},testInfo)=>{

        const {status,body} = await createTodo(request,{title:"only title as body"})
         expect(status).toBe(201)
         expect(body.id).not.toBe(null)
         expect(body.title).toBe("only title as body")
         expect(body.status).toBe("ACTIVE")
         testInfo['id'] = body.id
        
     })
     test("Creation of todo should work when passed status field",async({request},testInfo)=>{
          const {status,body} = await createTodo(request,{title:"title and status as body",status:"ACTIVE"})
          expect(status).toBe(201)
          expect(body.id).not.toBe(null)
          expect(body.title).toBe("title and status as body")
          expect(body.status).toBe("ACTIVE")
          testInfo['id'] = body.id
          
      })

      test.afterEach(async({request},testInfo)=>{
            const id = testInfo['id']
            const resp = await deleteTodo(request,id)
            expect(resp).toBe(200)
        })
})


test.describe("CreateTodo_NegativeCases",()=>{
    test("Creation of Todo should give 400 when title field is not passed",async({request},testInfo)=>{

        const {status,body} = await createTodo(request,{status:"ACTIVE"})
         expect(status).toBe(400)
         expect(body.id).toBe(undefined)
         expect(body.title).toBe(undefined)
         expect(body.status).toBe(undefined)
         
     })
    
     test("Creation of Todo should give 400 when status value is not either ACTIVE or DONE",async({request},testInfo)=>{
    
        const {status,body} = await createTodo(request,{title:"Error test",status:"status"})
         expect(status).toBe(400)
         expect(body.id).toBe(undefined)
         expect(body.message).toContain("JSON parse error: Cannot deserialize value of type `com.sedintechnologies.qa.todoapi.v1.models.TodoStatus` from String \"status\": not one of the values accepted for Enum class: [DONE, ACTIVE]")
         expect(body.status).toBe(undefined)
         
     })
})


