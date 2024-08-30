import { IOClients } from '@vtex/api'

import EmailClient from './email'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get email() {
    return this.getOrSet('email', EmailClient)
  }
}
