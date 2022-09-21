import { IOClients } from '@vtex/api'

import Logistics from './logistics'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }
}
