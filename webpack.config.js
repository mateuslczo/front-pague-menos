import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: './src/index.js', // O ponto de entrada do seu app (ajuste conforme seu projeto)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Arquivo gerado após o build
  },
  devtool: 'inline-source-map', // Melhora o debuggin no navegador
  devServer: {
    hot: true, // Ativa o Hot Module Replacement (HMR)
    host: '0.0.0.0', // Permite o acesso do host (necessário para containers)
    port: 3000, // Porta em que o servidor será iniciado
    publicPath: '/', // Caminho base onde o app será servido
    watchOptions: {
      ignored: /node_modules/, // Ignora mudanças dentro da pasta node_modules
    },
    headers: {
      'Access-Control-Allow-Origin': '*', // Permite acesso de todos os domínios
    },
    historyApiFallback: true, // Para suportar o React Router e outras bibliotecas de navegação
    // Você pode adicionar outras configurações, dependendo das necessidades do seu projeto
    clientLogLevel: 'silent', // Controla a verbosidade dos logs do cliente no console do navegador
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Plugin para HMR
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Configuração do Babel
          },
        },
      },
      // Aqui você pode adicionar outras regras para CSS, imagens, etc.
    ],
  },
};
