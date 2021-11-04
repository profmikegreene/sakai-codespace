// Replace data-cy attributes with empty string
module.exports = {
    files: '**/*.js',
    ignore: 'js/**/*.js',
    from: /data-cy=\"([^"]*)\"/g,
    to: '',
};
