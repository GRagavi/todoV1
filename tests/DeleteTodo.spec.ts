import {test,expect} from "@playwright/test"
import { deleteTodo, putTodo } from "../util/todo"
import { createTodo } from "../util/todo"

test.describe("DeleteTodo Testcases",()=>{
    test.beforeEach(async ({request},testInfo)=>{
  
        const {status,body} = await createTodo(request,{title:"Create ID",status:"ACTIVE"})
        testInfo['id'] = body.id
        console.log(body.id)
    })
    test("Deletion of todo should work if todo exists",async ({request},testInfo)=>{
    const id = testInfo['id']
    const res = await deleteTodo(request,id)
    expect(res).not.toBe(null)
    expect(res).toBe(200)
    })
})


test("Deletion of non existing todo should give 404",async ({request})=>{
    const id = 34
    const res = await deleteTodo(request,id)
    expect(res).toBe(404)

})