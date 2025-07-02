// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.output.webassemblyModuleFilename = `${isServer ? "../" : ""}static/wasm/webassembly.wasm`;
    return config;
  }
};

export default nextConfig