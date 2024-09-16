interface Parameter {
    account: string;
    region: string;
}

export const parameters: { [key: string]: Parameter } = {
    dev: {
        account: '123456789012',
        region: 'us-east-1',
    },
    prod: {
        account: '987654321098',
        region: 'us-west-2',
    },
};
