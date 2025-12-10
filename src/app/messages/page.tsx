'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Avatar, Badge } from '@/components/ui'
import { formatDate } from '@/utils/format'
import {
  Search,
  Send,
  Image as ImageIcon,
  Package,
  MoreVertical,
  Phone,
  Video,
  ArrowRight,
  Check,
  CheckCheck,
  Store,
  Smile,
} from 'lucide-react'

// Mock data
const conversations = [
  {
    id: '1',
    participant: {
      name: 'متجر التقنية',
      avatar: null,
      type: 'store',
      isOnline: true,
    },
    lastMessage: {
      content: 'تم شحن طلبك، يمكنك تتبعه من هنا',
      senderId: 'store1',
      createdAt: '2024-12-10T10:30:00',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participant: {
      name: 'بوتيك الأناقة',
      avatar: null,
      type: 'store',
      isOnline: false,
    },
    lastMessage: {
      content: 'شكراً لتسوقك معنا!',
      senderId: 'store2',
      createdAt: '2024-12-09T15:20:00',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participant: {
      name: 'متجر الرياضة',
      avatar: null,
      type: 'store',
      isOnline: true,
    },
    lastMessage: {
      content: 'المقاس M متوفر حالياً',
      senderId: 'store3',
      createdAt: '2024-12-08T09:15:00',
    },
    unreadCount: 0,
  },
]

const mockMessages = [
  {
    id: '1',
    senderId: 'user',
    content: 'مرحباً، هل المنتج متوفر؟',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:00:00',
  },
  {
    id: '2',
    senderId: 'store1',
    content: 'مرحباً بك! نعم المنتج متوفر. هل تريد طلبه؟',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:05:00',
  },
  {
    id: '3',
    senderId: 'user',
    content: 'نعم، قمت بالطلب. متى سيصل؟',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:30:00',
  },
  {
    id: '4',
    senderId: 'store1',
    content: 'تم تأكيد طلبك وسيصل خلال 2-3 أيام عمل',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:35:00',
  },
  {
    id: '5',
    senderId: 'store1',
    content: 'تم شحن طلبك، يمكنك تتبعه من هنا',
    type: 'text',
    isRead: false,
    createdAt: '2024-12-10T10:30:00',
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    conversations[0]?.id || null
  )
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedChat = conversations.find((c) => c.id === selectedConversation)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedConversation])

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.includes(searchQuery)
  )

  const handleSendMessage = () => {
    if (!message.trim()) return
    // In real app, send message via chat service
    console.log('Sending:', message)
    setMessage('')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom py-4">
          <Card className="flex h-[calc(100vh-180px)] overflow-hidden">
            {/* Conversations List */}
            <div
              className={`w-full border-e border-gray-200 dark:border-gray-700 md:w-80 ${
                selectedConversation ? 'hidden md:block' : ''
              }`}
            >
              {/* Search Header */}
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <h1 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  الرسائل
                </h1>
                <div className="relative">
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في المحادثات..."
                    className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 text-start transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 ${
                      selectedConversation === conv.id
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar fallback={conv.participant.name} size="md" />
                      {conv.participant.isOnline && (
                        <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {conv.participant.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatDate(new Date(conv.lastMessage.createdAt), 'HH:mm')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm text-gray-500">
                          {conv.lastMessage.content}
                        </p>
                        {conv.unreadCount > 0 && (
                          <Badge variant="primary" className="ms-2">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}

                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    لا توجد محادثات
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            {selectedConversation && selectedChat ? (
              <div className="flex flex-1 flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <button
                      className="md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <div className="relative">
                      <Avatar fallback={selectedChat.participant.name} size="md" />
                      {selectedChat.participant.isOnline && (
                        <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedChat.participant.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedChat.participant.isOnline ? 'متصل الآن' : 'غير متصل'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Store className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Date Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                    <span className="text-xs text-gray-500">اليوم</span>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                  </div>

                  {mockMessages.map((msg) => {
                    const isMe = msg.senderId === 'user'
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isMe
                              ? 'rounded-ee-none bg-primary-500 text-white'
                              : 'rounded-es-none bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <div
                            className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                              isMe ? 'text-white/70' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {formatDate(new Date(msg.createdAt), 'HH:mm')}
                            </span>
                            {isMe && (
                              msg.isRead ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Package className="h-5 w-5" />
                    </Button>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="اكتب رسالتك..."
                        className="h-10 w-full rounded-full border border-gray-300 bg-white pe-10 ps-4 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                      />
                      <button className="absolute end-3 top-1/2 -translate-y-1/2">
                        <Smile className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="rounded-full"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden flex-1 items-center justify-center md:flex">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <Send className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    رسائلك
                  </h3>
                  <p className="mt-1 text-gray-500">
                    اختر محادثة للبدء في المراسلة
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
