# Firebase Rules Configuration

## Firestore Rules

Go to Firebase Console → Firestore Database → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories - allow read/write for authenticated users or all
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if true;
    }

    // Products
    match /products/{productId} {
      allow read: if true;
      allow write: if true;
    }

    // Users
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Stores
    match /stores/{storeId} {
      allow read: if true;
      allow write: if true;
    }

    // Orders
    match /orders/{orderId} {
      allow read: if true;
      allow write: if true;
    }

    // All other collections
    match /{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

## Storage Rules

Go to Firebase Console → Storage → Rules and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

## Steps to Update Rules:

### Firestore Rules:
1. Go to https://console.firebase.google.com
2. Select your project (shoporia-860f9)
3. Click "Firestore Database" in the left menu
4. Click "Rules" tab
5. Replace existing rules with the rules above
6. Click "Publish"

### Storage Rules:
1. Go to https://console.firebase.google.com
2. Select your project (shoporia-860f9)
3. Click "Storage" in the left menu
4. Click "Rules" tab
5. Replace existing rules with the rules above
6. Click "Publish"

## Note:
These rules allow all read/write operations for development. For production, you should implement proper authentication checks.
