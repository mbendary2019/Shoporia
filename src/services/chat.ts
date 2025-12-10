import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'product' | 'order'
  metadata?: {
    productId?: string
    orderId?: string
    imageUrl?: string
  }
  isRead: boolean
  createdAt: string
}

export interface Conversation {
  id: string
  participants: string[]
  participantDetails: {
    [key: string]: {
      name: string
      avatar?: string
      type: 'customer' | 'store'
    }
  }
  storeId?: string
  lastMessage?: {
    content: string
    senderId: string
    createdAt: string
  }
  unreadCount: {
    [key: string]: number
  }
  createdAt: string
  updatedAt: string
}

// Create or get existing conversation
export async function getOrCreateConversation(
  userId: string,
  storeId: string,
  userDetails: { name: string; avatar?: string },
  storeDetails: { name: string; avatar?: string }
): Promise<Conversation> {
  // Check if conversation exists
  const q = query(
    collection(db, COLLECTIONS.CONVERSATIONS),
    where('participants', 'array-contains', userId)
  )
  const snapshot = await getDocs(q)

  const existingConversation = snapshot.docs.find((doc) => {
    const data = doc.data()
    return data.participants.includes(storeId)
  })

  if (existingConversation) {
    return {
      id: existingConversation.id,
      ...existingConversation.data(),
    } as Conversation
  }

  // Create new conversation
  const conversationData = {
    participants: [userId, storeId],
    participantDetails: {
      [userId]: { ...userDetails, type: 'customer' as const },
      [storeId]: { ...storeDetails, type: 'store' as const },
    },
    storeId,
    lastMessage: undefined,
    unreadCount: {
      [userId]: 0,
      [storeId]: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const docRef = await addDoc(
    collection(db, COLLECTIONS.CONVERSATIONS),
    conversationData
  )

  return {
    id: docRef.id,
    ...conversationData,
  } as Conversation
}

// Get user's conversations
export async function getUserConversations(userId: string): Promise<Conversation[]> {
  const q = query(
    collection(db, COLLECTIONS.CONVERSATIONS),
    where('participants', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Conversation[]
}

// Get conversation by ID
export async function getConversation(conversationId: string): Promise<Conversation | null> {
  const docRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Conversation
}

// Get messages in a conversation
export async function getMessages(
  conversationId: string,
  messageLimit: number = 50
): Promise<Message[]> {
  const q = query(
    collection(db, COLLECTIONS.MESSAGES),
    where('conversationId', '==', conversationId),
    orderBy('createdAt', 'desc'),
    limit(messageLimit)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .reverse() as Message[]
}

// Send a message
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
  type: Message['type'] = 'text',
  metadata?: Message['metadata']
): Promise<Message> {
  const messageData = {
    conversationId,
    senderId,
    content,
    type,
    metadata: metadata || null,
    isRead: false,
    createdAt: new Date().toISOString(),
  }

  const docRef = await addDoc(collection(db, COLLECTIONS.MESSAGES), messageData)

  // Update conversation
  const conversationRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId)
  const conversationSnap = await getDoc(conversationRef)

  if (conversationSnap.exists()) {
    const conversationData = conversationSnap.data()
    const otherParticipant = conversationData.participants.find(
      (p: string) => p !== senderId
    )

    await updateDoc(conversationRef, {
      lastMessage: {
        content,
        senderId,
        createdAt: new Date().toISOString(),
      },
      [`unreadCount.${otherParticipant}`]:
        (conversationData.unreadCount?.[otherParticipant] || 0) + 1,
      updatedAt: new Date().toISOString(),
    })
  }

  return {
    id: docRef.id,
    ...messageData,
  } as Message
}

// Mark messages as read
export async function markMessagesAsRead(
  conversationId: string,
  userId: string
): Promise<void> {
  // Mark all unread messages as read
  const q = query(
    collection(db, COLLECTIONS.MESSAGES),
    where('conversationId', '==', conversationId),
    where('senderId', '!=', userId),
    where('isRead', '==', false)
  )

  const snapshot = await getDocs(q)
  const updatePromises = snapshot.docs.map((docSnap) =>
    updateDoc(doc(db, COLLECTIONS.MESSAGES, docSnap.id), { isRead: true })
  )
  await Promise.all(updatePromises)

  // Reset unread count
  const conversationRef = doc(db, COLLECTIONS.CONVERSATIONS, conversationId)
  await updateDoc(conversationRef, {
    [`unreadCount.${userId}`]: 0,
  })
}

// Subscribe to messages (real-time)
export function subscribeToMessages(
  conversationId: string,
  callback: (messages: Message[]) => void
): () => void {
  const q = query(
    collection(db, COLLECTIONS.MESSAGES),
    where('conversationId', '==', conversationId),
    orderBy('createdAt', 'asc')
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[]
    callback(messages)
  })

  return unsubscribe
}

// Subscribe to conversations (real-time)
export function subscribeToConversations(
  userId: string,
  callback: (conversations: Conversation[]) => void
): () => void {
  const q = query(
    collection(db, COLLECTIONS.CONVERSATIONS),
    where('participants', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const conversations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Conversation[]
    callback(conversations)
  })

  return unsubscribe
}

// Get total unread count
export async function getTotalUnreadCount(userId: string): Promise<number> {
  const conversations = await getUserConversations(userId)
  return conversations.reduce(
    (total, conv) => total + (conv.unreadCount?.[userId] || 0),
    0
  )
}
