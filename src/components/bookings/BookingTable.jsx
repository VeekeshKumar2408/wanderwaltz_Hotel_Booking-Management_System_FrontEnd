import React, { useEffect, useState} from 'react'
import { parseISO } from "date-fns"
import DateSlider from '../common/DateSlider'

const BookingTable = ({bookingInfo, handleBookingCancellation}) => {
    const[filterBookings, setFilteredBookings] = useState(bookingInfo)
    const [expandedEmail, setExpandedEmail] = useState(null);

    const toggleExpandedEmail = (index) => {
      setExpandedEmail(expandedEmail === index ? null : index);
    };

    const filterBooking = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return (bookingStartDate >= startDate &&
                       bookingEndDate <= endDate && 
                       bookingEndDate > startDate
                )
            })
        }
        setFilteredBookings(filtered)
    }
    
    useEffect(()=> {
      setFilteredBookings(bookingInfo)
    }, [bookingInfo])
   

    return (
       <div>
      <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking} />
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead>
            <tr>
              <th className='nowrap' scope="col">S/N</th>
              <th className='nowrap' scope="col">Booking ID</th>
              <th className='nowrap' scope="col">Room ID</th>
              <th className='nowrap' scope="col">Room Type</th>
              <th className='nowrap' scope="col">Check-In Date</th>
              <th className='nowrap' scope="col">Check-Out Date</th>
              <th className='nowrap' scope="col">Guest Name</th>
              <th className='nowrap text-center' scope="col" >Guest Email</th>
              <th className='nowrap' scope="col">Adults</th>
              <th className='nowrap' scope="col">Children</th>
              <th className='nowrap' scope="col">Total Guests</th>
              <th className='nowrap' scope="col">Confirmation Code</th>
              <th className='nowrap' scope="col" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {filterBookings.map((booking, index) => (
              <tr key={booking.id}>
                <td >{index + 1}</td>
                <td >{booking.id}</td>
                <td >{booking.room.id}</td>
                <td >{booking.room.roomType}</td>
                <td >{booking.checkInDate}</td>
                <td >{booking.checkOutDate}</td>
                <td  className="nowrap">{booking.guestFullName}</td>
                <td  className="nowrap">
                  {booking.guestEmail ? (
                    <span>
                      {expandedEmail === index ? (
                        <span>
                          {booking.guestEmail}
                          <button className="btn btn-link btn-sm ml-2" onClick={() => toggleExpandedEmail(index)}>Hide</button>
                        </span>
                      ) : (
                        <button className="btn btn-link btn-sm" onClick={() => toggleExpandedEmail(index)}>Show</button>
                      )}
                    </span>
                  ) : (
                    <span className="text-danger">Email Not Provided</span>
                  )}
                </td>
                <td align='center' className="nowrap">{booking.numOfAdults}</td>
                <td align='center' className="nowrap">{booking.numOfChildren}</td>
                <td align='center' className="nowrap">{booking.numOfChildren + booking.numOfAdults}</td>
                <td align='center' className="nowrap">{booking.bookingConfirmationCode}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleBookingCancellation(booking.id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filterBookings.length === 0 && <p>No Booking Found For Selected Dates</p>}
      </div>
      </div>
    );
}

export default BookingTable