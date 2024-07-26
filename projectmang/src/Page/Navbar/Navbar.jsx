import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import CreateProjectForm from "../Project/CreateProjectForm";
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '@/Redux/Auth/Action';

function Navbar() {
    const auth = useSelector((store)=>store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout =()=> {
        dispatch(Logout())
    }
  return (
    <div className='border-b p-2 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
            <p onClick={() => navigate("/")} className='cursor-pointer'>Project Management</p>
            <Dialog>
                <DialogTrigger>
                    <Button variant="ghost">
                        New Project
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        Create New Project
                    </DialogHeader>
                    <CreateProjectForm/>
                </DialogContent>
            </Dialog>
        </div>
        <div className='flex gap-3 items-center'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
                        <PersonIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p>{auth.user?.fullName}</p>
        </div>
    </div>
  )
}

export default Navbar