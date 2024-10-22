
import { Session, JWT } from 'next-auth';

declare module 'next-auth' {
    interface Session {
      id: string | unknown;
    }
  
    interface JWT {
      id: string;
    }
  }