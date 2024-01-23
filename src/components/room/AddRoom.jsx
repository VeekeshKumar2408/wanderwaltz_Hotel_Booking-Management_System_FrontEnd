import React, { useState } from "react";

// Importing the 'addRoom' function from the '../utils/ApiFunctions' module
import { addRoom } from "../utils/ApiFunctions";

// Importing the RoomTypeSelector 
import RoomTypeSelector from "../common/RoomTypeSelector";
import ExistingRooms from "./ExistingRooms";
import { Link } from "react-router-dom"


const AddRoom = () => {

    /**this line of code initializes a state variable named newRoom with an object containing properties
      for a room's photo, type, and price. The initial values are null for the photo and empty strings
      for the room type and price. The setNewRoom function can be used to update the state with a new 
      room object.
    */
    const[newRoom, setNewRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })

    const[imagePreview, setImagePreview] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    /**this code handles changes in input fields, particularly for the "roomPrice" field. 
     * It ensures that if the user enters a non-numeric value in the "roomPrice" field, 
     * it sets the value to an empty string. Then, it updates the newRoom state with the new values, 
     * ensuring that only the specified property ([name]) is modified while keeping the rest of the newRoom object unchanged.
    */
    const handleRoomInputChange = (e) => 
    {
      const name = e.target.name
      let value = e.target.value
      if(name === "roomPrice"){
        if(!isNaN(value)){
            value = parseInt(value)
      }else{
        value =""
      }
     }
      setNewRoom({...newRoom, [name]: value})
    }

    /*  handleImageChange function is designed to be triggered when a user selects an image file.
       It updates the newRoom state with the selected image and generates a URL for the image preview using URL.createObjectURL. 
       */
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
        const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
        if(success !== undefined){
            setSuccessMessage(" A new room added to database! ")
            setNewRoom({photo:null, roomType:"", roomPrice:""})
            setImagePreview("")
            setErrorMessage("")
        }else{
            setErrorMessage(" Error occured on Adding room! ")
        }
        } catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }
    return (
        <>
        
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add New Room</h2>
                    {successMessage && (
                        <div className="alert alert-success fade show">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="alert alert-danger fade show">
                            {errorMessage}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomtype" className="form-label">
                                Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">
                                Room Price
                                </label>
                                <input
                                className="form-control"
                                required
                                id="roomPrice"
                                type="number"
                                name="roomPrice"
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                                />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Room Photo
                                </label>
                                <input
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                />
                                <div className="center mt-3">
                                {imagePreview && (
                                    <img src={imagePreview}
                                    alt="Preview Room Photo"
                                    style={{maxWidth: "400px", maxHeight:"400px"}}
                                    className="mb-3"/>
                                )}  
                                </div>  
                            </div> 
                            <div className="d-grid d-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-out-line-info">
                                  Return
                                </Link>
                                <button className="btn btn-outline-primary ml-5">
                                    Save Room
                                </button>
                                </div>
                     </form>            
                </div>
            </div>
        </section>
    
        </>
    )
}

export default AddRoom