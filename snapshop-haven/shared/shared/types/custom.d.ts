// shared/types/express/index.d.ts (or anywhere in your project)
import {AuthPayload} from './AuthPayload'; // adjust this path

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
