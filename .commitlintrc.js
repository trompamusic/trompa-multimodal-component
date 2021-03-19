module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules  : {
    'scope-enum': [
      2, 'always', [
        'e2e',
        'example',
        'project',
        'navbar',
        'search',
        'footer',
      ],
    ],
  },
};
