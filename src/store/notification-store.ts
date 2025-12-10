import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type NotificationType = 'order' | 'message' | 'promotion' | 'system' | 'review'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: string
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  removeNotification: (notificationId: string) => void
  clearAllNotifications: () => void
  getUnreadCount: () => number
  getNotificationsByType: (type: NotificationType) => Notification[]
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          isRead: false,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }))
      },

      markAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          ),
        }))
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        }))
      },

      removeNotification: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== notificationId),
        }))
      },

      clearAllNotifications: () => set({ notifications: [] }),

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.isRead).length
      },

      getNotificationsByType: (type) => {
        return get().notifications.filter((n) => n.type === type)
      },
    }),
    {
      name: 'shoporia-notifications',
    }
  )
)

// Helper functions to create typed notifications
export const createOrderNotification = (
  store: ReturnType<typeof useNotificationStore.getState>,
  orderId: string,
  status: string
) => {
  const statusMessages: Record<string, { title: string; message: string }> = {
    confirmed: {
      title: 'تم تأكيد طلبك',
      message: `تم تأكيد طلبك رقم #${orderId} وجاري تجهيزه`,
    },
    shipped: {
      title: 'تم شحن طلبك',
      message: `طلبك رقم #${orderId} في طريقه إليك`,
    },
    delivered: {
      title: 'تم توصيل طلبك',
      message: `تم توصيل طلبك رقم #${orderId} بنجاح`,
    },
    cancelled: {
      title: 'تم إلغاء طلبك',
      message: `تم إلغاء طلبك رقم #${orderId}`,
    },
  }

  const notification = statusMessages[status]
  if (notification) {
    store.addNotification({
      type: 'order',
      title: notification.title,
      message: notification.message,
      link: `/track/${orderId}`,
    })
  }
}

export const createMessageNotification = (
  store: ReturnType<typeof useNotificationStore.getState>,
  senderName: string,
  messagePreview: string,
  conversationId: string
) => {
  store.addNotification({
    type: 'message',
    title: `رسالة جديدة من ${senderName}`,
    message: messagePreview.substring(0, 50) + (messagePreview.length > 50 ? '...' : ''),
    link: `/messages/${conversationId}`,
  })
}

export const createPromotionNotification = (
  store: ReturnType<typeof useNotificationStore.getState>,
  title: string,
  message: string,
  link?: string
) => {
  store.addNotification({
    type: 'promotion',
    title,
    message,
    link,
  })
}

export const createReviewNotification = (
  store: ReturnType<typeof useNotificationStore.getState>,
  productName: string,
  reviewerName: string,
  productId: string
) => {
  store.addNotification({
    type: 'review',
    title: 'تقييم جديد',
    message: `قام ${reviewerName} بتقييم "${productName}"`,
    link: `/product/${productId}#reviews`,
  })
}
