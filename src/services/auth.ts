import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  User as FirebaseUser,
  ConfirmationResult,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import type { User, UserRole } from '@/types'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined
    confirmationResult: ConfirmationResult | undefined
  }
}

// Convert Firebase User to our User type
export async function getUserData(firebaseUser: FirebaseUser): Promise<User | null> {
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

  if (userDoc.exists()) {
    return userDoc.data() as User
  }

  return null
}

// Create user document in Firestore
export async function createUserDocument(
  firebaseUser: FirebaseUser,
  additionalData?: Partial<User>
): Promise<User> {
  const userRef = doc(db, 'users', firebaseUser.uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    const userData: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || additionalData?.displayName || '',
      photoURL: firebaseUser.photoURL || undefined,
      phone: firebaseUser.phoneNumber || additionalData?.phone,
      role: additionalData?.role || 'customer',
      isVerified: firebaseUser.emailVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...additionalData,
    }

    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return userData
  }

  return userDoc.data() as User
}

// Email & Password Sign Up
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  phone?: string
): Promise<User> {
  const { user: firebaseUser } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  await updateProfile(firebaseUser, { displayName })
  await sendEmailVerification(firebaseUser)

  const user = await createUserDocument(firebaseUser, { displayName, phone })
  return user
}

// Email & Password Sign In
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  const { user: firebaseUser } = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  const user = await getUserData(firebaseUser)
  if (!user) {
    return await createUserDocument(firebaseUser)
  }

  return user
}

// Google Sign In with Popup
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const { user: firebaseUser } = await signInWithPopup(auth, provider)

  // Try to get/create user data in Firestore, but handle offline case
  try {
    const user = await getUserData(firebaseUser)
    if (!user) {
      return await createUserDocument(firebaseUser)
    }
    return user
  } catch (error) {
    // If Firestore is offline, return user data from Firebase Auth directly
    console.warn('Firestore offline, using Firebase Auth data:', error)
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || undefined,
      phone: firebaseUser.phoneNumber || undefined,
      role: 'customer',
      isVerified: firebaseUser.emailVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}

// Facebook Sign In
export async function signInWithFacebook(): Promise<User> {
  const provider = new FacebookAuthProvider()

  const { user: firebaseUser } = await signInWithPopup(auth, provider)

  const user = await getUserData(firebaseUser)
  if (!user) {
    return await createUserDocument(firebaseUser)
  }

  return user
}

// Initialize reCAPTCHA
export function initRecaptcha(containerId: string) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
    })
  }
  return window.recaptchaVerifier
}

// Phone Sign In - Send OTP
export async function sendPhoneOtp(phoneNumber: string): Promise<void> {
  const formattedPhone = phoneNumber.startsWith('+')
    ? phoneNumber
    : `+2${phoneNumber}` // Egypt country code

  const recaptchaVerifier = window.recaptchaVerifier
  if (!recaptchaVerifier) {
    throw new Error('reCAPTCHA not initialized')
  }

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    formattedPhone,
    recaptchaVerifier
  )
  window.confirmationResult = confirmationResult
}

// Phone Sign In - Verify OTP
export async function verifyPhoneOtp(otp: string): Promise<User> {
  const confirmationResult = window.confirmationResult
  if (!confirmationResult) {
    throw new Error('No confirmation result found')
  }

  const { user: firebaseUser } = await confirmationResult.confirm(otp)

  const user = await getUserData(firebaseUser)
  if (!user) {
    return await createUserDocument(firebaseUser)
  }

  return user
}

// Password Reset
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

// Sign Out
export async function logoutUser(): Promise<void> {
  await signOut(auth)
}

// Update user role
export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<void> {
  const userRef = doc(db, 'users', userId)
  await setDoc(
    userRef,
    {
      role,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

// Update user store ID (when becoming a seller)
export async function updateUserStoreId(
  userId: string,
  storeId: string
): Promise<void> {
  const userRef = doc(db, 'users', userId)
  await setDoc(
    userRef,
    {
      storeId,
      role: 'seller' as UserRole,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}
