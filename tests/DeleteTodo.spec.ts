import {test,expect} from "@playwright/test"
import { deleteTodo, putTodo } from "../util/todo"
import { createTodo } from "../util/todo"
import { NOTFOUND, NULL, STATUS, SUCCESSCODE, TODOTITLE } from "./Property"

test.describe("DeleteTodo Testcases",()=>{
    test.beforeEach(async ({request},testInfo)=>{
  
        const {status,body} = await createTodo(request,{title:testInfo.title,status:STATUS[0]})
        testInfo['id'] = body.id
        console.log(body.id)
    })
    test(TODOTITLE.DELETETODO,async ({request},testInfo)=>{
    const id = testInfo['id']
    const res = await deleteTodo(request,id)
    expect(res).not.toBe(NULL)
    expect(res).toBe(SUCCESSCODE)
    })
})


test("Deletion of non existing todo should give 404",async ({request})=>{
    const id = 0
    const res = await deleteTodo(request,id)
    expect(res).toBe(NOTFOUND)

})