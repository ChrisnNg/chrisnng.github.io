import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const env = process.env.NODE_ENV;
let nextConfig;

if (env === "development") {
  /* development only config options here */
  /** @type {import('next').NextConfig} */
  nextConfig = {
    pageExtensions: ["ts", "tsx", "md", "mdx"],
    reactStrictMode: true,
  };
} else {
  /* config options for all phases except development here */

  /** @type {import('next').NextConfig} */
  nextConfig = {
    pageExtensions: ["ts", "tsx", "md", "mdx"],
    output: "export", // <=== enables static exports (required for github pages)
    reactStrictMode: true,
  };
}

export default withMDX(nextConfig);
