/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "njdb",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "1111",
  },
};

module.exports = nextConfig;
