import React, {useEffect, useState} from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { useParams, Link } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

const EditRoom = () => {
     /**this line of code initializes a state variable named Room with an object containing properties
      for a room's photo, type, and price. The initial values are null for the photo and empty strings
      for the room type and price. The setRoom function can be used to update the state with a new 
      room object.
    */
      const[room, setRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })

    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[imagePreview, setImagePreview] = useState("")


    const {roomId} = useParams()

     /*  handleImageChange function is designed to be triggered when a user selects an image file.
       It updates the Room state with the selected image and generates a URL for the image preview using URL.createObjectURL. 
       */
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({...room, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setRoom({ ...room, [name]: value})
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch(error){
                console.error(error)
            }
        }

        fetchRoom()
    }, [roomId])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await updateRoom(roomId, room)
            if(response.status === 200) {
                setSuccessMessage("Room Updated Successfully!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error Updating Room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    } 

    return (
        <>
        
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Edit Room</h2>
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
                               < input
                                 type = "text"
                                 className="form-control"
                                 id="roomType"
                                 name="roomType"
                                 value={room.roomType}
                                 onChange={handleInputChange}
                               />
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
                                value={room.roomPrice}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Room Photo
                                </label>
                                <input
                                required
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                />
                                <div className="center mt-3">
                                {imagePreview && (
                                    <img src={imagePreview}
                                    alt="Room Photo"
                                    style={{maxWidth: "400px", maxHeight:"400px"}}
                                    className="mb-3"/>
                                )}  
                                </div>  
                            </div> 
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                    Back
                                </Link>
                                <button className="btn btn-outline-primary ml-5">
                                    Edit Room
                                </button>
                                </div>
                     </form>            
                </div>
            </div>
        </section>
        </>
    )
}

export default EditRoom