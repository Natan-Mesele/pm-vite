import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { store } from "@/Redux/Store";

function ProjectDetails() {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();
  const handleProjectInvitation = () => { };

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  return (
    <>
      <div className="mt-10 lg:px-10 px-5">
        <div className="flex justify-center gap-10 flex-col lg:flex-row">
          {/* Main content area */}
          <ScrollArea className="w-full max-w-screen mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-6 text-gray-700 space-y-6 text-left">
              {/* Project Title */}
              <div>
                <h1 className="text-2xl font-semibold text-center text-gray-800 md:text-3xl">
                  {project.projectDetails?.name}
                </h1>
              </div>
              {/* Project Description */}
              <div className="text-center">
                <p className="text-sm text-gray-600 md:text-base">
                  {project.projectDetails?.description}
                </p>
              </div>
              {/* Project Information */}
              <div className="space-y-4 mt-5">
                <div className="flex justify-start items-center">
                  <span className="font-semibold text-sm md:text-base w-36">Project Lead:</span>
                  <span className="text-sm md:text-base">{project.projectDetails?.owner.fullName}</span>
                </div>
                {/* Team Members */}
                <div className="flex justify-start items-center gap-3">
                  <span className="font-semibold text-sm md:text-base w-36">Members:</span>
                  <div className="flex items-center gap-3">
                    {project.projectDetails?.team.map((item) => (
                      <Avatar
                        className="cursor-pointer bg-gray-200"
                        key={item}
                      >
                        <AvatarFallback className="text-gray-800">
                          {item.fullName[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 text-sm md:text-base"
                        onClick={handleProjectInvitation}
                      >
                        Invite
                        <PlusIcon className="w-4 h-4 ml-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader className="text-lg font-semibold">
                        Invite User
                      </DialogHeader>
                      <InviteUserForm />
                      <DialogClose />
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Project Category */}
                <div className="flex justify-start items-center">
                  <span className="font-semibold text-sm md:text-base w-36">Category:</span>
                  <span className="text-gray-600 text-sm md:text-base">
                    {project.projectDetails?.category}
                  </span>
                </div>
                {/* Project Lead Badge */}
                <div className="flex justify-start items-center">
                  <span className="font-semibold text-sm md:text-base w-36">Project Lead:</span>
                  <Badge className="bg-blue-100 text-blue-600 font-medium text-sm md:text-base">
                    {project.projectDetails?.owner.fullName}
                  </Badge>
                </div>
              </div>
              {/* Tasks Section */}
              <section>
                <p className="py-5 border-b-2 border-gray-200 text-lg font-semibold tracking-wide text-center">
                  Tasks
                </p>
                <div className="flex flex-wrap justify-center gap-6 py-6">
                  {/* Issue List for Todo, In Progress, Done */}
                  <div className="flex-1 min-w-[300px]">
                    <IssueList status="pending" title="Todo List" />
                  </div>
                  <div className="flex-1 min-w-[300px]">
                    <IssueList status="in_progress" title="In Progress" />
                  </div>
                  <div className="flex-1 min-w-[300px]">
                    <IssueList status="done" title="Done" />
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
          {/* ChatBox Section */}
          <div>
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
