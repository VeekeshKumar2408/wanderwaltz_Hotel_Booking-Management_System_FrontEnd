import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment"
import { Form, FormControl } from 'react-bootstrap'
import BookingSummary from './BookingSummary'

const BookingForm = () => {
    const[isValidated, setIsValidated] = useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const[roomPrice, setRoomPrice] = useState(0)
    const[booking, setBooking] = useState({
        guestFullName : "",
        guestEmail : "",
        checkInDate : "",
        checkOutDate : "",
        numOfAdults : "",
        numOfChildren : ""
    })

    const[roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType:"",
        roomPrice:""
    })

    const{roomId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const{name, value} = e.target
        setBooking({...booking, [name]:value})
        setErrorMessage("")
    }

    const getRoomPriceById = async(roomId) =>{
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch(error){
            throw new Error(error)
        }
    }

    useEffect(() =>{
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)

        console.log("checkIn -> " , checkInDate)

        const checkOutDate = moment(booking.checkOutDate)

        console.log("checkOut -> ", checkOutDate)

        const diffInDays = checkOutDate.diff(checkInDate,'days')

        console.log("RoomPrice -> " , roomPrice)
        console.log("diffInDays -> " , diffInDays)

        const price = roomPrice ? roomPrice : 0

        console.log('Payment Calculation Result:', diffInDays*price);

        return diffInDays*price
    }

    const isGuestCountValid = () =>{
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren || 0)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () =>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out date must come after check-in date")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity()=== false || !isGuestCountValid() || !isCheckOutDateValid()){
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
        console.log("isValidated:" + isValidated)
    }
    
    const handleFormSubmit = async() =>{
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true) 
            navigate("/booking-success", {state:{message : confirmationCode}})
        } catch(error){
            setErrorMessage(error.message)
             navigate("/booking-success", {state:{ error : errorMessage}})
        }
    }

    console.log("Booker Name -> ", booking.guestFullName)
    console.log("Num of child -> ", booking.numOfChildren)
    console.log("Num of Adults -> ", booking.numOfAdults)

    

    return (
        <>
          <div className='container mb-5'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='card mt-5 shadow'>
                  <div className='card-body'>
                    <h4 className='card-title'>Reserve Room</h4>
                    <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Label htmlFor='guestFullName'>Full Name:</Form.Label>
                        <FormControl
                          required
                          type='text'
                          id='guestFullName'
                          name='guestFullName'
                          value={booking.guestFullName}
                          placeholder='Enter Your Full Name'
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Please Enter Your Full Name
                        </Form.Control.Feedback>
                      </Form.Group>
      
                      <Form.Group className='mb-2'>
                        <Form.Label htmlFor='guestEmail'>Email:</Form.Label>
                        <FormControl
                          required
                          type='email'
                          id='guestEmail'
                          name='guestEmail'
                          value={booking.guestEmail}
                          placeholder='Enter Your Email'
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                          Please Enter Your Email
                        </Form.Control.Feedback>
                      </Form.Group>
      
                      <fieldset style={{ border: "2px" }}>
                        <h5>Lodging Period</h5>
                        <div className='row'>
                          <div className='col-6 mb-2'>
                            <Form.Label htmlFor='checkInDate'>Check-In date:</Form.Label>
                            <FormControl
                              required
                              type='date'
                              id='checkInDate'
                              name='checkInDate'
                              value={booking.checkInDate}
                              onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                              Please Select Check-In Date
                            </Form.Control.Feedback>
                          </div>
      
                          <div className='col-6'>
                            <Form.Label htmlFor='checkOutDate'>Check-Out date:</Form.Label>
                            <FormControl
                              required
                              type='date'
                              id='checkOutDate'
                              name='checkOutDate'
                              value={booking.checkOutDate}
                              onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                              Please Select Check-Out Date
                            </Form.Control.Feedback>
                          </div>
                          {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                        </div>
                      </fieldset>
      
                      <fieldset>
                        <h5>Number Of Guest</h5>
                        <div className='row'>
                          <div className='col-6'>
                            <Form.Label htmlFor='numOfAdults'>Adults:</Form.Label>
                            <FormControl
                              required
                              type='number'
                              id='numOfAdults'
                              name='numOfAdults'
                              value={booking.numOfAdults}
                              min={1}
                              onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                              Please Select At Least 1 Adult
                            </Form.Control.Feedback>
                          </div>
      
                          <div className='col-6'>
                            <Form.Label htmlFor='numOfChildren'>Children:</Form.Label>
                            <FormControl
                              required
                              type='number'
                              id='numOfChildren'
                              name='numOfChildren'
                              value={booking.numOfChildren}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </fieldset>
                      <div className='form-group mt-4 mb-1 text-center'>
                        <button type='submit' className='btn btn-hotel'>
                          Continue
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
      
              <div className='col-md-6'>
                {isSubmitted && (
                  <BookingSummary
                    booking={booking}
                    payment={calculatePayment()}
                    isFormValid={isValidated}
                    onConfirm={handleFormSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )
      
      
}

export default BookingForm