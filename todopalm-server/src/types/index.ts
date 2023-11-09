interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { User };
