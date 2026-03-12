'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Card, Button, Badge } from '@/components/ui'
import {
  Sparkles,
  Send,
  Image as ImageIcon,
  FileText,
  TrendingUp,
  Package,
  MessageSquare,
  Lightbulb,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Mic,
  Paperclip,
} from 'lucide-react'

// Quick action suggestions
const quickActions = [
  {
    icon: FileText,
    title: 'اكتب وصف منتج',
    prompt: 'اكتب وصف احترافي لمنتج...',
  },
  {
    icon: TrendingUp,
    title: 'حلل مبيعاتي',
    prompt: 'حلل بيانات مبيعاتي وأعطني توصيات لتحسين الأداء',
  },
  {
    icon: Package,
    title: 'اقترح منتجات',
    prompt: 'اقترح منتجات جديدة يمكنني إضافتها لمتجري',
  },
  {
    icon: MessageSquare,
    title: 'رد على عميل',
    prompt: 'ساعدني في الرد على استفسار عميل...',
  },
  {
    icon: Lightbulb,
    title: 'أفكار تسويقية',
    prompt: 'أعطني أفكار تسويقية لزيادة المبيعات',
  },
  {
    icon: ImageIcon,
    title: 'وصف صورة',
    prompt: 'اكتب وصف SEO لصورة المنتج',
  },
]

// Mock conversation
const initialMessages = [
  {
    id: '1',
    role: 'assistant',
    content: 'مرحباً! أنا مساعدك الذكي في Shoporia. كيف يمكنني مساعدتك اليوم؟ يمكنني مساعدتك في:\n\n• كتابة أوصاف المنتجات\n• تحليل المبيعات\n• اقتراح استراتيجيات تسويقية\n• الرد على استفسارات العملاء\n• وأكثر من ذلك!',
    timestamp: new Date().toISOString(),
  },
]

export default function AIAssistantPage() {
  const t = useTranslations('dashboard')
  const tCommon = useTranslations('common')
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message?: string) => {
    const text = message || input
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'اكتب وصف منتج': 'بالتأكيد! لكتابة وصف منتج احترافي، أحتاج منك:\n\n1. اسم المنتج\n2. الفئة\n3. أهم المميزات\n4. الفئة المستهدفة\n\nأرسل لي هذه المعلومات وسأكتب لك وصفاً جذاباً ومحسّناً لمحركات البحث.',
        'حلل مبيعاتي': '📊 **تحليل المبيعات:**\n\nبناءً على بيانات متجرك:\n\n✅ **نقاط القوة:**\n- معدل التحويل 3.2% (فوق المتوسط)\n- متوسط قيمة الطلب 534 ج.م\n\n⚠️ **نقاط التحسين:**\n- معدل الارتداد 45% (يحتاج تحسين)\n- 28% عملاء متكررين (يمكن زيادتها)\n\n💡 **التوصيات:**\n1. أضف برنامج ولاء للعملاء\n2. حسّن سرعة الموقع\n3. أضف عروض للمنتجات الأكثر مشاهدة',
        'اقترح منتجات': '🛍️ **اقتراحات منتجات جديدة:**\n\nبناءً على فئة متجرك وتحليل السوق:\n\n1. **إكسسوارات الموبايل** - طلب عالي وهامش ربح جيد\n2. **ساعات ذكية** - نمو 40% سنوياً\n3. **سماعات لاسلكية** - من أكثر المنتجات مبيعاً\n4. **شواحن سريعة** - منتج مكمل ممتاز\n\nهل تريد تفاصيل أكثر عن أي منتج؟',
        'أفكار تسويقية': '📣 **أفكار تسويقية لمتجرك:**\n\n1. **حملة "اشترِ 2 واحصل على خصم 20%"**\n   - تزيد متوسط قيمة الطلب\n\n2. **مسابقة على انستجرام**\n   - شارك صورة منتجك واربح!\n\n3. **برنامج إحالة**\n   - احصل على 50 ج.م لكل صديق\n\n4. **عروض فلاش (Flash Sales)**\n   - خصومات 24 ساعة فقط\n\n5. **محتوى تعليمي**\n   - فيديوهات كيفية استخدام المنتجات',
      }

      let response = responses[text] || 'شكراً لسؤالك! دعني أفكر في أفضل إجابة لك...\n\nيمكنني مساعدتك في كتابة محتوى احترافي، تحليل البيانات، أو تقديم نصائح تسويقية. كيف يمكنني خدمتك؟'

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const regenerateResponse = () => {
    // Remove last AI message and regenerate
    setMessages((prev) => prev.slice(0, -1))
    handleSend(messages[messages.length - 2]?.content)
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('aiRecommendations')} {/* TODO: add specific "AI Assistant" translation key */}
            </h1>
            <p className="text-sm text-gray-500">{/* TODO: add translation key */}مدعوم بـ GPT-4</p>
          </div>
        </div>
        <Badge variant="success" className="gap-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          {tCommon('online')} {/* TODO: add translation key if missing */}
        </Badge>
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleSend(action.prompt)}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-start transition-all hover:border-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <action.icon className="h-5 w-5 text-primary-600" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Chat Area */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {message.role === 'assistant' && (
                    <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-2 dark:border-gray-600">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600"
                        title={tCommon('copy')} // TODO: add translation key if missing
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-gray-600"
                        title={tCommon('helpful')} // TODO: add translation key if missing
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-red-600 dark:hover:bg-gray-600"
                        title={tCommon('notHelpful')} // TODO: add translation key if missing
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={regenerateResponse}
                        className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-primary-600 dark:hover:bg-gray-600"
                        title={tCommon('regenerate')} // TODO: add translation key if missing
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                <Paperclip className="h-5 w-5" />
              </button>
              <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                <Mic className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder={tCommon('typeMessage')} // TODO: add translation key if missing
                rows={1}
                className="max-h-32 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 pe-12 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <p className="mt-2 text-center text-xs text-gray-500">
            {/* TODO: add translation key */}
            {tCommon('aiDisclaimer')}
          </p>
        </div>
      </Card>
    </div>
  )
}
