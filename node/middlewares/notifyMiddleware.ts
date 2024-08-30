import type { EventContext, RecorderState } from '@vtex/api';
import { Clients } from '../clients';

declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

interface Settings {
  email: string
}

export async function notifyMiddleware(ctx: EventContext<Clients, RecorderState>, next: () => Promise<void>) {

  const {
    clients: { apps }
  } = ctx;

  const appId: string = process.env.VTEX_APP_ID;
  const settings = (await apps.getAppSettings(appId)) as Settings;
  const { email }  = settings;

  const { body } = ctx;
  const { IdSku } = body;

  try {
    console.log({
      status: "SUCCESS",
      message: `Catalog event notification has been received for SKU ID = ${IdSku}.`
    });

    console.log(email, body);
  }
  catch (e) {
    console.log({
      status: "ERROR",
      message: e.message
    });
  }

  await next();
}