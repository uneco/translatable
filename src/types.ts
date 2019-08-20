import firebase from 'firebase/app'

export interface FirebaseConfig
{
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export interface PhraseData
{
  originalText: string
  translatedText: string
}


export type DiffType = 'identical' | 'removed' | 'added'
export interface Diff
{
  type: DiffType
  value: string
}
export interface UserProfile
{
  displayName: string
  photoURL: string
}

export interface TranslateHistory
{
  id: string
  user: { displayName: string, photoURL: string, }
  originalText: string
  translatedText: string
  translatedAt: firebase.firestore.Timestamp
  diff: Diff[] | null
}
