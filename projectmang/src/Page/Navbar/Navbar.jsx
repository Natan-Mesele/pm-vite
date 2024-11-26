import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import CreateProjectForm from "../Project/CreateProjectForm";
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '@/Redux/Auth/Action';

function Navbar() {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(Logout());
    };

    return (
        <div className="bg-gray-900 text-white p-4 shadow-lg w-full fixed top-0 left-0 z-50 flex justify-between px-16">
            {/* Left Section - Project Management */}
            <div className="flex items-center gap-16">
            <img
                    src="logo.png" // Update this with your image path
                    alt="Project Management Logo"
                    className="h-8 w-auto cursor-pointer" 
                    onClick={() => navigate("/home")} 
                />
                {/* New Project Button */}
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline" className="bg-gray-700 text-white hover:bg-gray-600">
                            New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            Create New Project
                        </DialogHeader>
                        <CreateProjectForm />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Right Section - User Info and Logout */}
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-2 border-gray-500 text-white hover:bg-gray-400 bg-gray-400"
                        >
                            <PersonIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p className="font-medium">{auth.user?.fullName}</p>
            </div>
        </div>
    );
}

export default Navbar;
