module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        bugfixes: true
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'macros'
  ],
  env: {
    development: {
      presets: [
        [
          '@babel/preset-react',
          {
            useBuiltIns: true
          }
        ]
      ],
      plugins: []
    },
    production: {
      plugins: ['transform-react-remove-prop-types']
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
};
