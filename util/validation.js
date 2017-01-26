/**
 * Created by bogdanbegovic on 1/26/17.
 */

module.exports = {
    name: (flags) => {
        if (!flags.name) {
            throw new Error('You must provide the name of the component using -n or --name flags!');
        }
    },
    attribute: (flags) => {
        if (!flags.attribute) {
            throw new Error('You must provide the attribute of the component using -a or --attribute flags!');
        }
    },
    value: (flags) => {
        if (!flags.value) {
            throw new Error('You must provide the value of the attribute using -v or --value flags!');
        }
    },
    parent: (flags) => {
        if (!flags.parent) {
            throw new Error('You must provide the name of the parent component using -p or --parent flags!');
        }
    },
    child: (flags) => {
        if (!flags.child) {
            throw new Error('You must provide the name of the child component using -c or --child flags!');
        }
    }
};
