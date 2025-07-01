// shared/types/express/index.d.ts (or anywhere in your project)
import {AuthPayload} from './AuthPayload'; // adjust this path
import {UserType} from '../../services/users/src/models/Users'

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
