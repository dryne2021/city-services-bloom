
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical, Clock } from "lucide-react";

const MessageCenter = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "House Cleaning",
      lastMessage: "I can come by this Friday at 2 PM",
      timestamp: "2 min ago",
      unread: 2,
      avatar: "SJ",
      online: true
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      service: "Handyman Services",
      lastMessage: "The materials cost will be around $150",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "MR",
      online: false
    },
    {
      id: 3,
      name: "Emily Chen",
      service: "Math Tutoring",
      lastMessage: "What topics would you like to focus on?",
      timestamp: "3 hours ago",
      unread: 1,
      avatar: "EC",
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: "user",
      senderName: "You",
      content: "Hi Sarah, I'm interested in your cleaning service. Are you available this Friday?",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      senderId: "provider",
      senderName: "Sarah Johnson",
      content: "Hello! Yes, I have availability on Friday. What time works best for you?",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: 3,
      senderId: "user",
      senderName: "You",
      content: "How about 2 PM? And what's your rate for a 3-bedroom house?",
      timestamp: "10:37 AM",
      type: "text"
    },
    {
      id: 4,
      senderId: "provider",
      senderName: "Sarah Johnson",
      content: "Perfect! 2 PM works for me. For a 3-bedroom house, my rate is $120. This includes all rooms, bathrooms, and kitchen.",
      timestamp: "10:40 AM",
      type: "text"
    },
    {
      id: 5,
      senderId: "provider",
      senderName: "Sarah Johnson",
      content: "I can come by this Friday at 2 PM",
      timestamp: "10:42 AM",
      type: "text"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        </div>
        <ScrollArea className="h-full">
          <div className="divide-y">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.service}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-blue-600 text-white text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                        {selectedConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedConversation.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation.service} • {selectedConversation.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end mt-1">
                        <span
                          className={`text-xs ${
                            message.senderId === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
