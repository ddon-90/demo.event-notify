import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Logistics extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          'VtexIdClientAutCookie': context.authToken,
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }

  public async listInventoryBySku(skuId: string): Promise<any> {
    return this.http.get(`api/logistics/pvt/inventory/skus/${skuId}`, {
      metric: 'list-inventory-by-sku',
    })
  }

  public async updateInventoryBySkuAndWarehouse(skuId: string, warehouseId: string, totalQuantity: number, hasUnlimitedQuantity: boolean): Promise<any> {
    return this.http.put(`api/logistics/pvt/inventory/skus/${skuId}/warehouses/${warehouseId}`, {
      unlimitedQuantity: hasUnlimitedQuantity,
      dateUtcOnBalanceSystem: null,
      quantity: totalQuantity
    }, {
      metric: 'update-inventory-by-sku-and-warehouse',
    })
  }
}
