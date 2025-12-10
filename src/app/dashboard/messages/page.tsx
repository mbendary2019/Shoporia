'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, Button, Avatar, Badge } from '@/components/ui'
import { formatDate } from '@/utils/format'
import {
  Search,
  Send,
  Image as ImageIcon,
  Package,
  MoreVertical,
  Filter,
  Star,
  Archive,
  Trash2,
  ArrowRight,
  Check,
  CheckCheck,
  Smile,
  Clock,
  User,
} from 'lucide-react'

// Mock data for seller's messages
const conversations = [
  {
    id: '1',
    customer: {
      id: 'cust1',
      name: 'أحمد محمد',
      avatar: null,
      isOnline: true,
    },
    lastMessage: {
      content: 'متى سيصل الطلب؟',
      senderId: 'cust1',
      createdAt: '2024-12-10T10:30:00',
    },
    unreadCount: 3,
    isStarred: true,
    orderId: 'ORD-2024-001234',
  },
  {
    id: '2',
    customer: {
      id: 'cust2',
      name: 'سارة أحمد',
      avatar: null,
      isOnline: false,
    },
    lastMessage: {
      content: 'شكراً على المساعدة!',
      senderId: 'cust2',
      createdAt: '2024-12-09T15:20:00',
    },
    unreadCount: 0,
    isStarred: false,
    orderId: null,
  },
  {
    id: '3',
    customer: {
      id: 'cust3',
      name: 'محمد علي',
      avatar: null,
      isOnline: true,
    },
    lastMessage: {
      content: 'هل المقاس L متوفر؟',
      senderId: 'cust3',
      createdAt: '2024-12-10T08:15:00',
    },
    unreadCount: 1,
    isStarred: false,
    orderId: null,
  },
  {
    id: '4',
    customer: {
      id: 'cust4',
      name: 'فاطمة حسن',
      avatar: null,
      isOnline: false,
    },
    lastMessage: {
      content: 'تم الطلب بنجاح',
      senderId: 'store',
      createdAt: '2024-12-08T11:00:00',
    },
    unreadCount: 0,
    isStarred: true,
    orderId: 'ORD-2024-001235',
  },
]

const mockMessages = [
  {
    id: '1',
    senderId: 'cust1',
    content: 'مرحباً، أريد الاستفسار عن طلبي',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:00:00',
  },
  {
    id: '2',
    senderId: 'store',
    content: 'مرحباً أحمد! تفضل، كيف يمكنني مساعدتك؟',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:05:00',
  },
  {
    id: '3',
    senderId: 'cust1',
    content: 'طلبي رقم ORD-2024-001234، متى سيتم شحنه؟',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:30:00',
  },
  {
    id: '4',
    senderId: 'store',
    content: 'تم شحن طلبك اليوم وسيصلك خلال 2-3 أيام',
    type: 'text',
    isRead: true,
    createdAt: '2024-12-10T09:35:00',
  },
  {
    id: '5',
    senderId: 'cust1',
    content: 'متى سيصل الطلب؟',
    type: 'text',
    isRead: false,
    createdAt: '2024-12-10T10:30:00',
  },
]

// Quick replies for common responses
const quickReplies = [
  'مرحباً! كيف يمكنني مساعدتك؟',
  'تم شحن طلبك وسيصلك قريباً',
  'المنتج متوفر حالياً',
  'المنتج غير متوفر حالياً',
  'شكراً لتواصلك معنا!',
]

export default function DashboardMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    conversations[0]?.id || null
  )
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedChat = conversations.find((c) => c.id === selectedConversation)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedConversation])

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.customer.name.includes(searchQuery)
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && conv.unreadCount > 0) ||
      (filter === 'starred' && conv.isStarred)
    return matchesSearch && matchesFilter
  })

  const handleSendMessage = () => {
    if (!message.trim()) return
    console.log('Sending:', message)
    setMessage('')
  }

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            الرسائل
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة محادثات العملاء
          </p>
        </div>
        {totalUnread > 0 && (
          <Badge variant="primary" className="self-start">
            {totalUnread} رسائل غير مقروءة
          </Badge>
        )}
      </div>

      <Card className="flex h-[calc(100vh-250px)] overflow-hidden">
        {/* Conversations List */}
        <div
          className={`w-full border-e border-gray-200 dark:border-gray-700 md:w-80 ${
            selectedConversation ? 'hidden md:block' : ''
          }`}
        >
          {/* Search & Filter */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="relative mb-3">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن عميل..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            <div className="flex gap-2">
              {[
                { key: 'all', label: 'الكل' },
                { key: 'unread', label: 'غير مقروء' },
                { key: 'starred', label: 'مميز' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key as typeof filter)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    filter === item.key
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
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
                  <Avatar fallback={conv.customer.name} size="md" />
                  {conv.customer.isOnline && (
                    <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {conv.customer.name}
                      </p>
                      {conv.isStarred && (
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(new Date(conv.lastMessage.createdAt), 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-gray-500">
                      {conv.lastMessage.senderId === 'store' && (
                        <span className="text-gray-400">أنت: </span>
                      )}
                      {conv.lastMessage.content}
                    </p>
                    {conv.unreadCount > 0 && (
                      <Badge variant="primary" className="ms-2">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                  {conv.orderId && (
                    <p className="mt-1 text-xs text-primary-500">
                      طلب #{conv.orderId}
                    </p>
                  )}
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
                  <Avatar fallback={selectedChat.customer.name} size="md" />
                  {selectedChat.customer.isOnline && (
                    <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedChat.customer.name}
                    </p>
                    {selectedChat.isStarred && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {selectedChat.customer.isOnline ? (
                      <span className="text-green-500">متصل الآن</span>
                    ) : (
                      'آخر ظهور منذ ساعة'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Order Info Banner */}
            {selectedChat.orderId && (
              <div className="flex items-center justify-between bg-primary-50 px-4 py-2 dark:bg-primary-900/20">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary-500" />
                  <span className="text-sm text-primary-700 dark:text-primary-300">
                    محادثة متعلقة بالطلب #{selectedChat.orderId}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  عرض الطلب
                </Button>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => {
                const isMe = msg.senderId === 'store'
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
                        {isMe &&
                          (msg.isRead ? (
                            <CheckCheck className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          ))}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(reply)}
                    className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {reply}
                  </button>
                ))}
              </div>
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
                رسائل العملاء
              </h3>
              <p className="mt-1 text-gray-500">
                اختر محادثة للرد على استفسارات العملاء
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
