export const operators = [
    { name: 'null', label: 'Is Null' },
    { name: 'notNull', label: 'Is Not Null' },
    { name: 'in', label: 'In' },
    { name: 'notIn', label: 'Not In' },
    { name: '=', label: '=' },
    { name: '!=', label: '!=' },
    { name: '<', label: '<' },
    { name: '>', label: '>' },
    { name: '<=', label: '<=' },
    { name: '>=', label: '>=' },
    { name: 'like', label: 'Like' }
];

export const valueProcessor = (field, operator, value) => {
    if (operator === 'like') {
        // Assuming `value` is an array, such as from a multi-select
        // return `(${value.map((v) => `"${v.trim()}"`).join(',')})`;
        return `"%25${value}%25"`;
    } else {
        return `"${value}"`;
    }
};
