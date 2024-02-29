import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode} from '../utils/ApiFunctions'
import moment from "moment"

const FindBooking = () => {

  const [confirmationCode, setConfirmationCode] = useState("")
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({
    id : "",
    bookingConfirmationCode : "",
    room: {id: "", roomType: ""},
    roomNumber : "",
    checkInDate : "",
    checkOutDate : "",
    guestFullName : "",
    guestEmail : "",
    numOfAdults : "",
    numOfChildren : "",
    totalNumberOfGuests : ""
  })

  const [isDeleted, setIsDeleted] = useState(false)

  // intialising the empty form
  const clearBookingInfo = {
    id : "",
    room: {id: "", roomType: ""},
    bookingConfirmationCode : "",
    roomNumber : "",
    checkInDate : "",
    checkOutDate : "",
    guestFullName : "",
    guestEmail : "",
    numOfAdults : "",
    numOfChildren : "",
    totalNumberOfGuests : ""
  }

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value)
  }

  const handleFormSubmit = async(event) => {
    event.preventDefault()
    setIsLoading(true)
    try{
        const data = await getBookingByConfirmationCode(confirmationCode)
        setBookingInfo(data)
        setError(null)

    } catch (error) {
        setBookingInfo(clearBookingInfo)
        if(error.response && error.response.status === 404){
            setError(error.response.data.message)
        } else {
            setError(error.message)
        }
    }

    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleBookingCancellation = async(bookingId) => {
    try{
        await cancelBooking(bookingInfo.id)
        setIsDeleted(true)
        setSuccessMessage("Booking has been cancelled successfully!")
        setBookingInfo(clearBookingInfo)
        setConfirmationCode("")
        setError(null)
    } catch(error){
        setError(error.message)
    }
    setTimeout(() =>{
        setSuccessMessage("")
        setIsDeleted(false)
    },2000)
  }


  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    type="text"
                    id="confirmationCode"
                    name="confirmationCode"
                    value={confirmationCode}
                    onChange={handleInputChange}
                    placeholder="Enter the booking confirmation code"
                />
                <button type="submit" className="btn btn-hotel input-group-text">
                    Find booking
                </button>
            </div>
        </form>

        {isLoading ? 
        (
            <div>Finding Your Booking...</div>
        ) : error ? 
        (
        <div className="text-center text-danger mt-4">
             {error}
        </div>
        ) : bookingInfo.bookingConfirmationCode ? 
        (
            <div className="card col-md-8 col-lg-6 mt-4 mb-5">
                <div className="card-body shadow">
                    <h3 className="card-title text-center mb-4">Booking Information</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><strong>Confirmation Code:</strong></td>
                                <td className="text-success">{bookingInfo.bookingConfirmationCode}</td>
                            </tr>
                            <tr>
                                <td><strong>Room Number:</strong></td>
                                <td>{bookingInfo.room.id}</td>
                            </tr>
                            <tr>
                                <td><strong>Room Type:</strong></td>
                                <td>{bookingInfo.room.roomType}</td>
                            </tr>
                            <tr>
                                <td><strong>Check-in Date:</strong></td>
                                <td>
                                    {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Check-out Date:</strong></td>
                                <td>
                                    {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Full Name:</strong></td>
                                <td>{bookingInfo.guestFullName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email Address:</strong></td>
                                <td>{bookingInfo.guestEmail}</td>
                            </tr>
                            <tr>
                                <td><strong>Adults:</strong></td>
                                <td>{bookingInfo.numOfAdults}</td>
                            </tr>
                            <tr>
                                <td><strong>Children:</strong></td>
                                <td>{bookingInfo.numOfChildren}</td>
                            </tr>
                            <tr>
                                <td><strong>Total Guests:</strong></td>
                                <td>{bookingInfo.numOfAdults + bookingInfo.numOfChildren}</td>
                            </tr>
                        </tbody>
                    </table>

                    {!isDeleted && (
                        <button 
                            onClick={() => handleBookingCancellation(bookingInfo.id)}
                            className="btn btn-danger mt-3 center">
                            Cancel Booking
                        </button>
                    )}
                </div>
            </div>
        ) : (
            <div></div>
        )}

        {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
    </div>
);




}

export default FindBooking