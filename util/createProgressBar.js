/**
 * Created by bogdanbegovic on 1/26/17.
 */

const ProgressBar = require('progress');

module.exports = (total) => {
    return new ProgressBar(
        '[:bar] :current/:total',
        {
            total: total,
            width: 50
        }
    );
};