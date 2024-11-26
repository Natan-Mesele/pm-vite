import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/Redux/Chat/Action";
import { store } from "@/Redux/Store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  // You can choose to use Input or Textarea for the message input field.
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Import Dialog components (ensure the correct path)
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";

function ChatBox() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { auth, chat } = useSelector((store) => store);
  const { id } = useParams();

  const messagesEndRef = useRef(null);  // Reference for auto-scrolling

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchChatMessages(chat.chat?.id));
  }, [dispatch, chat.chat?.id]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(
        sendMessage({
          senderId: auth.user?.id,
          projectId: id,
          content: message,
        })
      );
      setMessage(""); // Clear the input field after sending the message
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Dialog>
      {/* Trigger button to open the chat pop-up */}
      <DialogTrigger>
        <Button className="fixed bottom-5 right-5 rounded-full p-3 bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none transition">
          <ChatBubbleIcon className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      
      {/* Pop-up ChatBox content */}
      <DialogContent className="max-w-lg rounded-lg bg-white shadow-lg transition-all transform duration-300 ease-in-out">
        <DialogHeader className="flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-semibold text-gray-800">Chat Box</h1>
          <DialogClose>
            <Button className="text-gray-600 hover:bg-gray-200 rounded-full p-2">×</Button>
          </DialogClose>
        </DialogHeader>

        <div className="border-t p-4">
          {/* Chat messages section */}
          <ScrollArea className="h-80 w-full p-3 flex gap-3 flex-col bg-gray-50 rounded-md">
            {chat.messages?.map((item, index) =>
              item.sender.id !== auth.user.id ? (
                <div className="flex gap-2 mb-2 justify-start" key={index}>
                  <Avatar>
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 py-2 px-4 bg-white border rounded-ss-2xl rounded-e-xl shadow-sm">
                    <p className="font-medium">{item.sender.fullName}</p>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mb-2 justify-end" key={index}>
                  <div className="space-y-1 py-2 px-4 bg-blue-50 border rounded-se-2xl rounded-s-xl shadow-sm">
                    <p className="font-medium">{item.sender.fullName}</p>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                  <Avatar>
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                </div>
              )
            )}
            {/* This div will help scroll to the bottom */}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Message input section */}
          <div className="relative mt-4 flex items-center">
            <textarea
              placeholder="Type a message..."
              className="py-3 px-4 border-t rounded-lg border-gray-300 focus:outline-none focus:ring-0 w-full resize-none min-h-[3rem] max-h-[8rem]"
              value={message}
              onChange={handleMessageChange}
            />
            <Button
              onClick={handleSendMessage}
              className="absolute right-2 top-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              size="icon"
              variant="ghost"
            >
              <PaperPlaneIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChatBox;
