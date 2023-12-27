/*
 popular JavaScript library used for making HTTP requests. 
 It simplifies the process of sending requests to a server and handling responses.
 */
import axios from "axios"

/*
Here, a new Axios instance named api is created with a specific base URL.
 This base URL is the common part of the URL for your server's API. It's like saying, 
 "Whenever I make a request using api, start with this base URL."
 */
export const api = axios.create({
    baseURL :"http://localhost:9192"
})

/**This function adds a new room to the database */
export async function addRoom(photo, roomType, roomPrice){
    console.log("Calling addRoom function with parameters:", photo, roomType, roomPrice);

    /**
     * FormData is an API in JavaScript that allows you to easily construct a set of key/value pairs representing 
       form fields and their values. It is often used to prepare data for sending in an HTTP request.
     */
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    try{

    // Make a POST request to the "/rooms/add/new-room" endpoint with the FormData
    const response = await api.post("/rooms/add/new-room", formData)

    // If the status code is 201 (Created), return true
    if(response.status === 201){
        return true
    }else {
        return false
    }
    } catch(error){
        console.error("Error in addRoom function: ", error);
        return false;
    }
} 

/**This function get all room types from the database*/
export async function getRoomTypes() {
    try{
        console.log("Calling getRoomTypes function");

        const response = await api.get("/rooms/room/types")
        console.log("getRoomTypes response:", response);

        return response.data
    } catch(error){
        console.error("Error in getRoomTypes function:", error);

        throw new Error("Error fetching room-types")
    }
}

/**This function get all room from database */
export async function getAllRooms(){
    try{
       const results = await api.get("/rooms/all-rooms")
        return results.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}
 