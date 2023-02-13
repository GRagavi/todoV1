import { test, expect, request } from '@playwright/test';
import { createStatus, createText, updateInvalidstatus, updatePutText, updateText, updateValidstatus } from '../util/constant';
import { createTodo, deleteTodo, getToDo, putToDo, updateToDo} from '../util/todo'

test.describe('When todo is created', () => {
  test.beforeEach(async ({ request }, testInfo) => {
    const {body} = await createTodo(request,{title:createText,status:createStatus});
    testInfo['id'] = body.id;
    console.log(`Created id :${testInfo['id']}`);
  })

  test('Updating only title of todo via patch endpoint  should work', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    console.log(`Id:${id}`);
    const beforeresponse =await getToDo(request,id);
    console.log(`Before Title update:${beforeresponse.title}`);
    const {body} = await updateToDo(request, id, {title: updateText});
    expect(body.title).toBe(updateText);
    const afterresponse =await getToDo(request,id);
    console.log(`After Title update:${afterresponse.title}`);
  })

  test('Updating only status of todo via patch endpoint should work', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    console.log(`Id:${id}`);
    const beforeresponse =await getToDo(request,id);
    console.log(`Before status update: ${beforeresponse.status}`);
    const {body} = await updateToDo(request, id, {status:updateValidstatus} );
    expect(body.status).toBe(updateValidstatus);
    const afterresponse =await getToDo(request,id);
    console.log(`After status update:${afterresponse.status}`);
  })

  test('Updation of status todo should give 400 when status is not either of ACTIVE', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {status} = await updateToDo(request, id,{status:updateInvalidstatus});
    expect(status).toBe(400);
  })

  test('Updation of both status and title should work via patch endpoint', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {body} = await updateToDo(request, id, {title:updateText,status:updateValidstatus});
    expect(body.title).toBe(updateText);
    expect(body.status).toBe(updateValidstatus);
  })

  test('Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in patch', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {status} = await updateToDo(request, id, {title:updateText, status:updateInvalidstatus});
    expect(status).toBe(400);
  })

  test('Updation of both status and title should work via put endpoint', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {body} = await putToDo(request, id, {title:updatePutText, status:updateValidstatus});
    expect(body.title).toBe(updatePutText);
    expect(body.status).toBe(updateValidstatus);

  })
  test('Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in put', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {body} = await putToDo(request, id, {title:updatePutText,status:updateInvalidstatus});
    expect(body.code).toBe(400);
  })

  test('Updation of only title should give 400 in put', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {body} = await putToDo(request, id, {title: updatePutText});
    expect(body.code).toBe(400);
  })

  test('Updation of only status should give 400 in put', async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const {body} = await putToDo(request, id, {status:updateValidstatus});
    expect(body.code).toBe(400);
  })

  test.afterEach(async ({ request }, testInfo) => {
    const id = testInfo['id'];
    const deleteresponse = await deleteTodo(request, id);
    expect(deleteresponse).toBe(200);
  })
})

test.describe('When to do is updated', () => {
  test('Updation of non existing todo should give 404 via patch endpoint', async ({ request }) => {
    const {status} = await updateToDo(request,0, {title:updateText,status:updateValidstatus});
    expect(status).toBe(404);
  })

  test('Updation of non existing todo should give 404 via put endpoint', async ({ request }) => {
    const {body} = await putToDo(request, 0, {title:updateText,status: updateValidstatus});
    expect(body.code).toBe(404);
  })

})