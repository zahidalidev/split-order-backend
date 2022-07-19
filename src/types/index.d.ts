export {};

interface User {
  _id: string;
  fullName: string;
  email: string;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      user: Object;
    }
  }
}
