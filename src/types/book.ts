export type Book = {
  id: number;
  name: string;
  category: string;
  author: string;
  publisher: string;
  borrowedBy: string | null;
};
