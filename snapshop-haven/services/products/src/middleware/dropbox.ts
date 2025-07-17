import { Dropbox } from '@dropbox/dropbox';   // sdk ≥10.x
import dotenv from 'dotenv';

dotenv.config();

export const dbx = new Dropbox({              // typed & promise-based
  accessToken: process.env.DROPBOX_ACCESS_TOKEN
});
