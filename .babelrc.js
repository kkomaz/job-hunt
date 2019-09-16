module.exports = {
  presets: [['next/babel']],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
    ],
  ],
  ignore: ['node_modules'],
};