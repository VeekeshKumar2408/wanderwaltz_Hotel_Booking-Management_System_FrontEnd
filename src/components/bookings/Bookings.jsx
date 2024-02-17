import React, { useState, useEffect } from 'react'
import { getAllBookings, cancelBooking } from '../utils/ApiFunctions'
import BookingTable from '../bookings/BookingTable'
import Header from '../common/Header'

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState("")
    
    useEffect(() => {
        setTimeout(()=>{
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) =>{
                setError(error.message)
                setIsLoading(false)
            })
        }, 1000)
    },[])

    const handleBookingCancellation = async(bookingId) => {
        try{
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch(error){
            setError(error.message)
        }
    }
  return (
    <section className='container' style={{backgroundColor: "whitesmoke"}}>
        <Header title={"Existing Bookings"}/>
        {error && (<div className='text-danger'>{error}</div>)}
        {isLoading ? (<div>Loading Existing Bookings</div>
        
        ):(
            <BookingTable
                 bookingInfo={bookingInfo}
                 handleBookingCancellation={handleBookingCancellation}
            />
        )}

    </section>
    
  )
}

export default Bookings