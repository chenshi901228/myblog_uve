module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-nested'), // 需放在autoprefixer之前
    require('autoprefixer'),
  ],
}