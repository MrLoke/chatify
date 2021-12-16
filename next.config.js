// @ts-nocheck
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
})
