import {test,expect, request} from "@playwright/test"
import { createTodo, deleteTodo } from "../util/todo"
import { CREATEDENTRY, INVALIDCODE, INVALIDDATA, JSONPARSEError, NULL, STATUS, SUCCESSCODE, TODOTITLE, UNDEFINED } from "./Property" 

test.describe("Create Todo_PositiveCases",()=>{
    test(TODOTITLE.CREATE_TODO_WITHOUT_STATUS,async({request},testInfo)=>{

        const {status,body} = await createTodo(request,{title:testInfo.title})
         expect(status).toBe(CREATEDENTRY)
         expect(body.id).not.toBe(NULL)
         expect(body.title).toBe(TODOTITLE.CREATE_TODO_WITHOUT_STATUS)
         expect(body.status).toBe(STATUS[0])
         testInfo['id'] = body.id
        
     })
     test(TODOTITLE.CREATE_TODO_WITH_STATUS,async({request},testInfo)=>{
          const {status,body} = await createTodo(request,{title:testInfo.title,status:STATUS[0]})
          expect(status).toBe(CREATEDENTRY)
          expect(body.id).not.toBe(NULL)
          expect(body.title).toBe(testInfo.title)
          expect(body.status).toBe(STATUS[0])
          testInfo['id'] = body.id
          
      })

      test.afterEach(async({request},testInfo)=>{
            const id = testInfo['id']
            const resp = await deleteTodo(request,id)
            expect(resp).toBe(SUCCESSCODE)
        })
})


test.describe("CreateTodo_NegativeCases",()=>{
    test(TODOTITLE.CREATE_TODO_WITHOUT_TITLE,async({request},testInfo)=>{
        const {status,body} = await createTodo(request,{status:STATUS[0]})
         expect(status).toBe(INVALIDCODE)
         expect(body.id).toBe(UNDEFINED)
         expect(body.title).toBe(UNDEFINED)
         expect(body.status).toBe(UNDEFINED)
         
     })
    
     test(TODOTITLE.CREATE_TODO_WITH_INVALID_STATUS,async({request},testInfo)=>{
        const {status,body} = await createTodo(request,INVALIDDATA)
         expect(status).toBe(INVALIDCODE)
         expect(body.id).toBe(UNDEFINED)
         expect(body.message).toContain(JSONPARSEError)
         expect(body.status).toBe(UNDEFINED)
         
     })
})


