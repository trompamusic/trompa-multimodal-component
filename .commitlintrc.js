module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules  : {
    'scope-enum': [
      2, 'always', [
        'example',
        'project',
        'navbar',
        'search',
        'footer',
      ],
    ],
  },
};
