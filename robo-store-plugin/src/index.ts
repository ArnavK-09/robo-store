// Type interface for plugin params req
export default interface PluginOptions {
	mongo_uri?: string;
	owner_id: string;
	store_name: string;
	domain: string;
	slogan?: string;
	hero_image?: string;
	about_us?: string;
	invite?: string;
	introduction?: string;
	client_secret: string;
	client_id?: string;
	currency_symbol?: string;
}
