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
    console.log("Calling addRoom function with parameters:", photo, roomType, roomPrice)

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
        console.error("Error in addRoom function: ", error)
        return false
    }
} 

/**This function get all room types from the database*/
export async function getRoomTypes() {
    try{
        console.log("Calling getRoomTypes function")

        const response = await api.get("/rooms/room/types")
        console.log("getRoomTypes response:", response);

        return response.data
    } catch(error){
        
        console.error("Error in getRoomTypes function:", error)
        throw new Error("Error fetching room-types")
    }
}

/**This function get all room from database */
export async function getAllRooms(){
    try{
       const results = await api.get("/rooms/allRooms")
        return results.data
    }catch(error){
        throw new Error("Error fetching rooms")
    }
}

// This function deletes a room by the Id
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data

    }catch(error){
        throw new Error(`Error deleting room ${error.message}`)
    }
}

/**This function updates a room */
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    console.log("Calling updateRoom function with parameters:", roomId  , roomData)
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

/*This function gets a room by the id */
export async function getRoomById(roomId){
    try {
        console.log("Calling getRoom By Id function with parameters:", roomId)
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

/**Booking new room */
export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data;
    } catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

/**Fetching all bookings */
export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings")
        return result.data
    } catch(error){
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

/**Search Booking by Confirmation code */
export async function getBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data;
    } catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else{
            throw new Error(`Error finding booking : ${error.message}`)
        }
    }
}

/**Cancel booking */
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch(error){
        throw new Error(`Error cancelling booking : ${error.message}`)
    }
}

/**This function gets all available rooms from the database within a given date and room type*/
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    try {
        const result = await api.get(`rooms/available-rooms`, {
            params: {
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                roomType: roomType
            }
        });
        return result;
    } catch (error) {
        // Handle errors
        console.error("Error fetching available rooms:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}
