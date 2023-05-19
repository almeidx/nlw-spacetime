/** @type {import("next").NextConfig} */
export default {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: true,
	},
	images: {
		domains: ["avatars.githubusercontent.com", "localhost"],
	},
};
