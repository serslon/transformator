var fs = require('fs');
var chalk = require('chalk');

module.exports = {
  options: {
    debug: false,
    removeUnusedKeys: true,
    sort: true,
    attr: false,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js'],
      fallbackKey: function(ns, value) {
        // Returns a hash value as the fallback key
        return sha1(value);
      },
    },
    lngs: ['en', 'ru'],
    ns: ['global'],
    defaultLng: 'en',
    defaultNs: 'global',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'public/locales/{{lng}}.json',
      savePath: 'public/locales/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, { list: ['i18next._', 'i18next.__'] }, (key, options) => {
      parser.set(
        key,
        Object.assign({}, options, {
          nsSeparator: false,
          keySeparator: true,
        }),
      );
      ++count;
    });

    if (count > 0) {
      console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
    }

    done();
  },
};
