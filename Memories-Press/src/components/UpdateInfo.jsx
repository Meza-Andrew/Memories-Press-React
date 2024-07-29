import React from 'react'
import UpdateContactInfo from './UpdateContactInfo'
import UpdateBusinessInfo from './UpdateBusinessInfo'
import UpdatePaymentInfo from './UpdatePaymentInfo'

function UpdateInfo() {
  return (
    <>
      <UpdateBusinessInfo/>
      <UpdateContactInfo/>
      <UpdatePaymentInfo/>
    </>
  )
}

export default UpdateInfo