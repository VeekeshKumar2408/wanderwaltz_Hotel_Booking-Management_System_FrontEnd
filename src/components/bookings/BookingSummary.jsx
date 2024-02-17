import moment from 'moment'
import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate, "days")
    const[isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const[isProcessingPayment, setIsProcessingPayment] = useState(false)
    console.log("isBookingConfirmed" + isBookingConfirmed)
    console.log("Payment ->" , payment)


    const navigate = useNavigate( )

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() =>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
      if(isBookingConfirmed){
          navigate("/booking-success")
      }
    }, [isBookingConfirmed, navigate])
    
    return (
        <div className='card card-body mt-5 shadow'>
          <h4>Reservation Summary</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Name</td>
                <td><strong>{booking.guestFullName}</strong></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><strong>{booking.guestEmail}</strong></td>
              </tr>
              <tr>
                <td>Check-In</td>
                <td><strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></td>
              </tr>
              <tr>
                <td>Check-out</td>
                <td><strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></td>
              </tr>
              <tr>
                <td>Total Days</td>
                <td><strong>{numberOfDays}</strong></td>
              </tr>
            </tbody>
          </table>
      
          <h5>Number Of Guests</h5>
          <table className="table mb-2 ">
            <tbody>
            <tr>
          <td style={{ textAlign: "left" }}>Adult</td>
          <td style={{ textAlign: "left" }}><strong>{booking.numOfAdults}</strong></td>
        </tr>
        <tr>
          <td style={{ textAlign: "left" }}>Children</td>
          <td style={{ textAlign: "left" }}><strong>{booking.numOfChildren}</strong></td>
        </tr>
            </tbody>
          </table>
      
          {payment > 0 ? (
            <>
              <p>Total Payment : <strong>${payment}</strong></p>
              {!isBookingConfirmed ? (
                <Button variant='success' onClick={handleConfirmBooking}>
                  {isProcessingPayment ? (
                    <>
                      <span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>
                      Booking Confirmed, redirecting to payment ....
                    </>
                  ) : (
                    "Proceed to payment"
                  )}
                </Button>
              ) : isBookingConfirmed ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='spinner-border text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              ) : null }
            </>
          ) : (
            <p className='text-danger'> Check-out date must be after check-in date</p>
          )}
        </div>
      )
      

      
}

export default BookingSummary