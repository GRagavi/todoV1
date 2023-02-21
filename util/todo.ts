import { APIRequestContext } from "@playwright/test";

export async function getToDo(request: APIRequestContext, id) {
    const getresponse = await request.get(`http://144.24.105.148:8080/v1/todo/${id}`);
    return (await getresponse.json());
}

export async function createTodo(request: APIRequestContext, body: { title: string, status?: string }) {

    const resp = await request.post("/v1/todo", {
        data: body,
        headers: {
            'content-Type': 'application/json'
        }
    })
    return { status: resp.status(), body: await resp.json() }
}

export async function updateToDo(request: APIRequestContext, id, body: { title?: string, status?: String }) {
    const updateresponse = await request.patch(`/v1/todo/${id}`, {
        data: body,
        headers: { 'Content-Type': 'application/json' }
    })
    return { status: updateresponse.status(), body: await updateresponse.json() };
}

export async function putToDo(request: APIRequestContext, id, body: { title?: string, status?: String }) {
    const putresponse = await request.put(`/v1/todo/${id}`, {
        data: body,
        headers: { 'Content-Type': 'application/json' }
    })
    return { status: putresponse.status(), body: await putresponse.json() };
}

export async function deleteTodo(request: APIRequestContext, id: number) {
    const respons = await request.delete(`/v1/todo/${id}`)
    return await respons.status()
}
