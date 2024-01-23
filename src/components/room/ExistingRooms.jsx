import React, { useEffect, useState } from "react"
import {Col, Row} from 'react-bootstrap'
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions"
import {FaEdit, FaTrashAlt, FaEye, FaPlus} from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingRooms = () => {

    // Rooms
    const [rooms, setRooms] = useState([])

    // Using pagination
    const[currentPage, setCurrentPage] = useState(1)

    // Displaying room per page
    const[roomPerPage] = useState(8)

    // IsPage Loading
    const[isLoading, setIsLoading] = useState(false)

    // For Displaying filtered Room
    const[filteredRooms, setFilteredRooms] = useState([])

    // Selecting Room Type for filtering
    const[selectedRoomType, setSelectedRoomType] = useState("")

    // Variable to hold success messages for us
    const[successMessage, setSuccessMessage] = useState("")

    // Variable to hold error messages for us
    const[errorMessage, setErrorMessage] = useState("")

    // Using the effects when it loads the room
    useEffect(() => {
        fetchRooms()
    }, [])


    // Function getting all the room from database
    const fetchRooms = async() => {
        setIsLoading(true)
        try{
            const result = await getAllRooms()

            // Log the result to the console
            console.log("Fetched rooms successfully:", result);

            setRooms(result)
            setIsLoading(false)

        }catch(error){

            // Log any errors to the console
            console.error("Error fetching rooms:", error.message);

            setErrorMessage(error.message)
        }
    }

    /*this useEffect is responsible for updating the filteredRooms
     state based on the selected room type or displaying all rooms if no specific room type is selected.*/
    useEffect(() => {
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        } else {

            // It creates a new array (filtered) containing only the rooms that match the selected room type.
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)

            /*It updates the filteredRooms state with the newly filtered array, 
            so that the component will display only the rooms of the selected type.*/
            setFilteredRooms(filtered)
        }

        // The setCurrentPage(1) ensures that the user starts viewing the first page of the filtered results. 
        setCurrentPage(1)
    },[rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //Handles the deletion of the room
    const handleDelete = async(roomId) => {
        try{
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} was deleted!`)
                fetchRooms() // Fetching Rooms After Deletion
            }else{
                console.error(`Error deleting room: ${result.message}`)
            }
        }catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() =>{
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }

    // Calculating the total pages 
    const calculateTotalPages = (filteredRooms, roomPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomPerPage)
    } 
    
    /**This line calculates the index of the last room to be displayed on the current page
     * This gives you the ending index of the range of rooms to display.
     */
    const indexOfLastRoom = currentPage * roomPerPage

    /** Once you know the index of the last room, this line calculates the index of the first room in the range. 
     * It subtracts the number of rooms per page (roomPerPage) from the index of the last room to determine the starting index of the range. */
    const indexOfFirstRoom = indexOfLastRoom - roomPerPage

    /**Finally, this line uses the slice method to extract a subset of rooms from the filteredRooms array.
     *  It takes the rooms starting from the indexOfFirstRoom and up to (but not including) the indexOfLastRoom, 
     * effectively giving you the range of rooms to display on the current page. */
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
        <>
        <div className="container col-md-8 col-lg-6">
            {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

            {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
        </div>

        {isLoading ?(
            <p>Loading Existing Rooms</p>
        ): (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-between mb-3 mt-5">
                <h2>Existing Rooms</h2>
                </div>

                <Row>   
                <Col md={6} className="mb-3 mb-md-0">
                  <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                </Col>

                <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                    <FaPlus/> Add New Room
                </Link>
                </Col>
                </Row>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room)=>(
                            <tr key={room.id} className="text-center">
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td className="gap-2">
                                    <Link to={`/edit-room/${room.id}`}>
                                        <span className="btn btn-info btn-sm">
                                            <FaEye/>
                                            </span>
                                        <span className="btn btn-warning btn-sm">
                                          <FaEdit/>  
                                        </span>
                                        </Link>
                                    <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(room.id)}>
                                        <FaTrashAlt/>
                                    </button>
                                </td>  
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <RoomPaginator 
                currentPage={currentPage}
                totalPages={calculateTotalPages(filteredRooms, roomPerPage, rooms)}
                onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )}
        </>
    )
}

export default ExistingRooms