import { Button } from '@/components/ui/button'
import React from 'react'
import { useDispatch } from 'react-redux'

function AcceptInvitation() {
    const dispatch = useDispatch();
    const handleAcceptInvitation = () => {

    }
  return (
    <div className='h-[85vh] flex flex-col justify-center items-center'>
        <h1 className='py-5 font-semibold text-xl'>you are invited to join the project </h1>
        <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
    </div>
  )
}

export default AcceptInvitation