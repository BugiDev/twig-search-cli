#! /usr/bin/env node

/**
 * Created by bogdanbegovic on 1/26/17.
 */

const componentUsage = require('./src/componentUsage');
const componentUsageMulti = require('./src/componentUsageMulti');
const componentWithAttribute = require('./src/componentWithAttribute');
const componentWithAttributeAndValue = require('./src/componentWithAttributeAndValue');
const parentContainsChild = require('./src/parentContainsChild');

const meow = require('meow');
const cli = meow(
    `Usage
      $ twig-search-tool <command> -n ui:form-field-combobox

    Commands
        component - Search for the component (requires --name param to be defined)
        multi-component - Search for multiple component usage in one twig (requires --name param to be defined)
        component-with-attribute - Search for the component with attribute (requires --name and --attribute param to be defined)
        component-with-attribute-and-value - Search for the component with attribute and value (requires --name, --attribute and --value param to be defined)
        parent-contains-child - Search for the parent component component containing child component (requires --parent and --child param to be defined)

    Options
      --name, -n  Name of the component to search
      --attribute, -a Name of the attribute within a component
      --value, -v Value of the attribute
      --parent, -p Name of the parrent component
      --child, -c Name of the child component
      --output, -o Filepath to output results to`,
    {
        alias: {
            n: 'name',
            a: 'attribute',
            v: 'value',
            p: 'parent',
            c: 'child',
            o: 'output'
        }
    });

const clear = require('clear');
const logger = require('./util/logger')(cli.flags.output);
const chalk = require('chalk');

clear();

console.log('Searching for twigs...');

let results;
const currentDir = process.cwd();

switch (cli.input[0]) {
    case 'component':
        results = componentUsage(cli.flags, currentDir);
        break;
    case 'multi-component':
        results = componentUsageMulti(cli.flags, currentDir);
        break;
    case 'component-with-attribute':
        results = componentWithAttribute(cli.flags, currentDir);
        break;
    case 'component-with-attribute-and-value':
        results = componentWithAttributeAndValue(cli.flags, currentDir);
        break;
    case 'parent-contains-child':
        results = parentContainsChild(cli.flags, currentDir);
        break;
    default:
        throw new Error('Command not valid or not specified! Use --help to see available commands.');

}

if (results.positives.length > 0) {

    results.positives.forEach((data) => {
        logger.log(data, chalk.cyan);
    });

    logger.log('');

    if (results.errors.length > 0) {
        logger.log('Errors:', chalk.red);
        results.errors.forEach((data) => {
            logger.log(data, chalk.red);
        });
    }

    logger.log('');

    logger.log(`Number of files it occurres in: ${results.positives.length}`, chalk.green);
    logger.log('------- Finished -------', chalk.green);
} else {
    logger.log('');
    logger.log('No occurrences found', chalk.green);
}