export const saveConfig = async (_: any, config: { safeInventoryLimit: String }, ctx: Context) => {
	return ctx.clients.vbase
		.saveJSON('configs', 'config', config)
		.then((__) => {
			return 'success'
		})
}