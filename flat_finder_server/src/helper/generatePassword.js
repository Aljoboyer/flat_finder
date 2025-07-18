const generator = require('generate-password');

exports.generatePassword = () => {
    return generator.generate({ length: 8, numbers: true });
}
