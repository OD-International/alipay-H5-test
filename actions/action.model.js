const func = require('od-utility')

class ODAction {
    static checkMegaToken(mega_token) {
        const { church_token, branch_token } = mega_token;

        if (!church_token) func.throwErrorWithMissingParam('church_token');
        if (!branch_token) func.throwErrorWithMissingParam('branch_token');

        return { church_token, branch_token };
    }
}

module.exports = ODAction;