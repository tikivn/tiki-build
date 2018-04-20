module.exports = {
  output: {
    filename: "./public/[name].pack.js"
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env", "babel-preset-react"]
          }
        },
        exclude: /node_modules/,
        test: /\.js$/
      }
    ]
  },
  entry: {
    index: "./public/src/index"
  }
};
