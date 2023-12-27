import React, { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {

    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false) //input field
    const [newRoomType, setNewRoomType] = useState("")

    /* *Use the useEffect hook to fetch room types from the server when the component mounts. 
     *  Update the roomTypes state with the fetched data. */
    useEffect(() =>{
        getRoomTypes().then((data)=> {
            setRoomTypes(data)
        })
    },[])

    /* handleNewRoomTypeInputChange function is designed to be an event handler for input changes. 
       When the user types something into an input field (like when entering a new room type), 
       this function will be called, and it will update the newRoomType state with the new value
       typed by the user. */
    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    /**
     *   this function is meant to be called when a user wants to add a new room type. 
         It checks if the new room type is not empty, adds it to the list of room types, 
         clears the input field, and hides the input field for adding new room types.
     */
    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }
    return (
        <>
        {roomTypes.length > 0 && (
            <div>
            <select
            id = "roomType"
            name = "roomType"
            value={newRoom.roomType}
            onChange={(e) => {
                if(e.target.value === "Add New"){
                    setShowNewRoomTypeInput(true)
                }else{
                    handleRoomInputChange(e)
                }
            }}
            >
            <option value={""}>Select Room Type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            )
            )}
            </select>
            {showNewRoomTypeInput && (
                <div className='input-group mt-3'> 
                    <input
                    className='form-control'
                    type='text'
                    placeholder='Enter New Room Type'
                    onChange={handleNewRoomTypeInputChange}
                    />
                    <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                        Add
                    </button>
                </div>
            )}
            </div>
        )}
        </>
    )
}

export default RoomTypeSelector