export type YearType = 2023 | 2024 | 2025 | 2026;

export interface PhotoMemory {
  id: string;
  year: YearType;
  gradeLabel: string; // e.g. "Kelas X - Awal Kisah", "Kelas XI - Masa Paling Seru", "Kelas XII - Perjuangan & Ujian", "Kelulusan 2026 - Sampai Jumpa di Puncak"
  title: string;
  dateStr: string;
  location: string;
  description: string;
  imageUrl: string;
  quote?: string;
  rotation?: number; // deg for polaroid tilt
  tag: string;
  isFavorite?: boolean;
}

export interface FriendshipWish {
  id: string;
  sender: string;
  message: string;
  date: string;
  emoji: string;
  bgColor: string;
}

export interface GreetingCardData {
  recipientName: string;
  senderName: string;
  schoolName: string;
  letterHeadline: string;
  letterContent: string;
  specialNote: string;
  memories: PhotoMemory[];
  wishes: FriendshipWish[];
  promiseText: string;
  lastUpdated: string;
}
