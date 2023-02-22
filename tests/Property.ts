export const TODOTITLE = {
    CREATE_TODO_WITHOUT_STATUS:"Creation of todo should work without passing status field",
    CREATE_TODO_WITH_STATUS:"Creation of todo should work when passed status field",
    CREATE_TODO_WITHOUT_TITLE:"Creation of Todo should give 400 when title field is not passed",
    CREATE_TODO_WITH_INVALID_STATUS:"Creation of Todo should give 400 when status value is not either ACTIVE or DONE",
    DELETETODO:"Deletion of todo should work if todo exists",

}

export type RESPONSEBODY = [
    {   id:number,
        title:string,
        status:string,
        createdAt:string,
        updatedAt:string}
    ]
export const NULL = null
export const UNDEFINED = undefined
export const INVALIDDATA = {title:"Wrong tile",status: "status"}
export const STATUS = ["ACTIVE","DONE"]
export const SUCCESSCODE = 200
export const CREATEDENTRY = 201
export const INVALIDCODE = 400
export const NOTFOUND = 404
export const JSONPARSEError ="JSON parse error: Cannot deserialize value of type `com.sedintechnologies.qa.todoapi.v1.models.TodoStatus` from String \"status\": not one of the values accepted for Enum class: [DONE, ACTIVE]"

