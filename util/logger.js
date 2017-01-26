/**
 * Created by bogdanbegovic on 1/26/17.
 */

const fs = require('fs');
const path = require('path');

module.exports = function(outputPath) {
    return new Logger(outputPath);
};

class Logger {

    constructor(outputPath, noColor) {
        this.isAbsolutePath = false;
        if(typeof outputPath === 'string') {
            this.outputPath = outputPath;
        } else {
            if (outputPath) {
                this.outputPath = 'twig-search-cli-results.txt';
            } else {
                this.outputPath = null;
            }
        }
        if(path.isAbsolute(this.outputPath)){
            this.isAbsolutePath = true;
        }
        this.noColor = noColor;
    }

    log(content, color) {
        if(color && !this.noColor){
            console.log(color(content));
        } else {
            console.log(content);
        }

        if(this.outputPath){
            if(this.isAbsolutePath){
                fs.appendFileSync(this.outputPath, `${content} \r\n`);
            } else {
                fs.appendFileSync(path.join(process.cwd(), this.outputPath), `${content} \r\n`);
            }
        }
    }
}
