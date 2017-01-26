const fs = require('fs');
const core = require('twig-search-core');
const clear = require('clear');
const createProgressBar = require('../util/createProgressBar');
const validate = require('../util/validation');

module.exports = (flags, rootPath) => {

    validate.name(flags);

    const allFilenames = core.getAllTwigs(rootPath);
    const progressBar = createProgressBar(allFilenames.length);
    let errors = [];
    let positives = [];

    allFilenames.forEach((filepath, index) => {
        const data = fs.readFileSync(filepath, 'utf8');
        const contains = core.usesComponentMulti(data, flags.name);

        progressBar.tick();

        if (contains.error) {
            errors.push({filepath:filepath, message: contains.error});
        } else {
            if (contains.value > 1) {
                positives.push(filepath);
            }
        }
    });

    clear();

    return {
        errors: errors,
        positives: positives
    }
};