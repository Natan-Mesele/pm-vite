import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

function CommentCard({item}) {
  return (
    <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
            <Avatar>
                <AvatarFallback>
                    Z
                </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p>Code with zosh</p>
                <p>{item.content}</p>
            </div>
        </div>
        <Button className="rounded-full" variant="ghost">
            <TrashIcon/>
        </Button>
    </div>
  )
}

export default CommentCard