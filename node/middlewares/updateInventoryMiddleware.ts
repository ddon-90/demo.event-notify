import type { EventContext, RecorderState } from '@vtex/api'
import { Clients } from '../clients'

export async function updateInventoryMiddleware(ctx: EventContext<Clients, RecorderState>, next: () => Promise<void>) {

  const {
    clients: { logistics, vbase }
  } = ctx

  const { body } = ctx
  const { StockModified, IdSku } = body

  try {
    if (StockModified) {
      const { config: { safeInventoryLimit } } = await vbase.getJSON<any>('configs', 'config')
      const { balance } = await logistics.listInventoryBySku(IdSku)

      balance.forEach(async ({
        totalQuantity,
        warehouseId,
        warehouseName,
        hasUnlimitedQuantity
      }: {
        totalQuantity: number,
        warehouseId: string,
        warehouseName: string,
        hasUnlimitedQuantity: boolean
      }) => {
        const newQuantity = (hasUnlimitedQuantity || (totalQuantity > safeInventoryLimit)) ? totalQuantity : 0
        await logistics.updateInventoryBySkuAndWarehouse(IdSku, warehouseId, newQuantity, hasUnlimitedQuantity)

        console.log({ status: "SUCCESS", message: "Inventory has been updated" })

        console.log({
          IdSku,
          warehouseId,
          warehouseName,
          safeInventoryLimit,
          hasUnlimitedQuantity,
          currentInventory: totalQuantity,
          newInventory: newQuantity
        })
      })
      
    }
    else {
      console.log({ status: "WARN", message: "There was no inventory update" })
    }
  }
  catch (e) {
    console.log({ status: "ERROR", message: e.message })
  }

  await next()
}