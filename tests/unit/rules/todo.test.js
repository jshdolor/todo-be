const validate = require('../../../rules/todo');

describe('rule: todo', () => {
    it('should reject titles with less than 3 characters or more than 100 characters', () => {
        let value = {
            title: 'as',
        };
        expect(validate(value).error).toBeTruthy();

        value = {
            title:
                '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
        };
        expect(validate(value).error).toBeTruthy();

        value = {
            title: 'Test Title',
        };

        expect(validate(value).error).toBeFalsy();
    });

    it('should accept "completed" or "pending" only as status', () => {
        let value = {
            status: 'completed',
        };
        expect(validate(value).error).toBeFalsy();

        value = {
            status: 'pending',
        };
        expect(validate(value).error).toBeFalsy();

        value = {
            status: 'blah',
        };

        expect(validate(value).error).toBeTruthy();
    });
});
