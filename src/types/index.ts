export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: BookCondition;
  imageUrl?: string;
  dateDonated: Date;
  status: 'Accepted' | 'In Review' | 'Rejected';
}

export interface Donation {
  id: string;
  book: Book;
  userId: string;
  dateDonated: Date;
  status: 'Accepted' | 'In Review' | 'Rejected';
}

export type Genre = 
  | 'Fiction'
  | 'Non-Fiction'
  | 'Science Fiction'
  | 'Mystery'
  | 'Romance'
  | 'Biography'
  | 'History'
  | 'Science'
  | 'Technology'
  | 'Self-Help'
  | 'Children'
  | 'Educational'
  | 'Other';

export type BookCondition = 'New' | 'Used' | 'Poor' | 'Unusable';
export type DonationStatus = 'Accepted' | 'In Review' | 'Rejected'; 