import type { ClientsConfig, ServiceContext, ParamsContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { getConfig } from './resolvers/getConfig'
import { saveConfig } from './resolvers/saveConfig'
import { updateInventoryMiddleware } from './middlewares/updateInventoryMiddleware'
// import { validate } from './middlewares/validate'

const TIMEOUT_MS = 800

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Jsonplaceholder client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  events: {
    // updateInventory: method({
    //   POST: [updateInventoryMiddleware],
    // }),
    updateInventory: [
      updateInventoryMiddleware,
    ],
  },
  graphql: {
    resolvers: {
      Mutation: {
        config: saveConfig
      },
      Query: {
        config: getConfig
      },
    },
  },
})
