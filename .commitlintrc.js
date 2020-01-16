module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules  : {
    'scope-enum': [
      2, 'always', [
        'project',
        'navbar',
        'search',
        'footer',
      ],
    ],
  },
};
