import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

function IssueDetails() {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issue, comment } = useSelector((store) => store);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus({ status, id: issueId }));
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId, dispatch]);

  return (
    <div className="px-6 lg:px-20 py-8 text-gray-700 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 border p-6 lg:p-10 rounded-lg bg-white shadow-lg">
        {/* Left Section: Issue Details */}
        <div className="flex-1 max-w-3xl space-y-5">
          <ScrollArea className="h-[80vh] overflow-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-left">
                {issue.issueDetails?.title}
              </h1>
              <div className="py-5">
                <h2 className="font-semibold text-gray-600 text-left">Description</h2>
                <p className="text-gray-600 text-sm mt-3 text-left">{issue.issueDetails?.description}</p>
              </div>
              <div className="mt-5">
                <h1 className="pb-3 text-lg text-left">Activity</h1>
                <Tabs defaultValue="comments" className="w-full">
                  <TabsList className="flex space-x-4 mb-5 border-b border-gray-300">
                    <TabsTrigger value="all" className="px-4 py-2 cursor-pointer">All</TabsTrigger>
                    <TabsTrigger value="comments" className="px-4 py-2 cursor-pointer">Comments</TabsTrigger>
                    <TabsTrigger value="history" className="px-4 py-2 cursor-pointer">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">All changes in the issue will be shown here.</TabsContent>
                  <TabsContent value="comments">
                    <CreateCommentForm issueId={issueId} />
                    <div className="mt-8 space-y-6">
                      {comment.comments?.map((item) => (
                        <CommentCard item={item} key={item.id} />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="history">History changes will be shown here.</TabsContent>
                </Tabs>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Section: Issue Info */}
        <div className="lg:w-[30%] space-y-4 mt-6 lg:mt-0">
          <div className="space-y-2">
            {/* Select Status Dropdown */}
            <Select onValueChange={handleUpdateIssueStatus}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>

            {/* Issue Details */}
            <div className="border rounded-lg">
              <p className="border-b py-3 px-5 text-lg font-medium text-left">Details</p>
              <div className="p-5">
                <div className="space-y-7">
                  {/* Assignee */}
                  <div className="flex gap-5 items-center">
                    <p className="w-[6rem] text-gray-600 text-left">Assignee</p>
                    {issue.issueDetails?.assignee ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 text-xs">
                          <AvatarFallback>{issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Unassigned</p>
                    )}
                  </div>

                  {/* Labels */}
                  <div className="flex gap-5 items-center">
                    <p className="w-[6rem] text-gray-600 text-left">Labels</p>
                    <p className="text-gray-500">None</p>
                  </div>

                  {/* Status */}
                  <div className="flex gap-5 items-center">
                    <p className="w-[6rem] text-gray-600 text-left">Status</p>
                    <Badge className="bg-blue-100 text-blue-800">{issue.issueDetails?.status}</Badge>
                  </div>

                  {/* Release Date */}
                  <div className="flex gap-5 items-center">
                    <p className="w-[6rem] text-gray-600 text-left">Release</p>
                    <p className="text-gray-500">12-12-2014</p>
                  </div>

                  {/* Reporter */}
                  <div className="flex gap-5 items-center">
                    <p className="w-[6rem] text-gray-600 text-left">Reporter</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>R</AvatarFallback>
                      </Avatar>
                      <p>Raam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;
