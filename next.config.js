/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "export",
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename = `${isServer ? "../" : ""}static/wasm/webassembly.wasm`;
    return config;
  },
  images: {
    unoptimized: true,
  },
};
