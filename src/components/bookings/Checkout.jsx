import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { useParams } from 'react-router-dom'
import { getRoomById } from "../utils/ApiFunctions"
import {
    FaCar,
    FaParking,
    FaTv,
    FaTshirt,
    FaUtensils,
    FaWifi,
    FaWineGlassAlt
} from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel'

const Checkout = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [roomInfo, setRoomInfo] = useState({photo: "", roomType: "", roomPrice:""})

    const {roomId} = useParams()

useEffect(() =>{
    setTimeout(() =>{
        getRoomById(roomId)
        .then((response) => {
            setRoomInfo(response)
            setIsLoading(false)
        }).catch((error) =>{
            setError(error)
            setIsLoading(false)
        })
    },2000)
} ,[roomId])

return (
    <div>
     <section className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-4 mt-5'>
            {isLoading ? (
              <p>Loading Room Information...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className='room-info' >
              <div style={{ width: '300px' }}>
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room Photo"
                  className="img-fluid rounded mb-4"
                />
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">Room Type</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th scope="row">Room Price</th>
                      <td>{roomInfo.roomPrice}</td>
                    </tr>
                    <tr>
                      <th scope="row">Amenities</th>
                      <td>
                        <ul className='list-unstyled'>
                          <li><FaWifi/> Wifi</li>
                          <li><FaTv/> NetFlix Premium</li>
                          <li><FaUtensils/> Breakfast</li>
                          <li><FaWineGlassAlt/> Mini bar refreshment</li>
                          <li><FaCar/> Car Service</li>
                          <li><FaParking/> Parking Space</li>
                          <li><FaTshirt/> Laundry</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            )}
          </div>
          <div className='col-md-8'>
            <BookingForm />
          </div>
        </div>
      </section>
      <div className='container'>
        <RoomCarousel/>
      </div>
    </div>
  )
  
  
  
}

export default Checkout