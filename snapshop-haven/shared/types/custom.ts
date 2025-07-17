// shared/types/express/index.d.ts (or anywhere in your project)
import {AuthPayload} from './AuthPayload'; // adjust this path
import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
export {};   // required to make this a modulei