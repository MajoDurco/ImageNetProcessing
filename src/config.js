const isProduction = () => process.env.NODE_ENV === 'production'

export default {
  server: {
    protocol: isProduction() ? 'https' : 'http',
    host: isProduction() ? 'image-net-back.herokuapp.com' : 'localhost',
    port: isProduction() ? '443' : '8080',
  }
}
