const vault = require('node-vault')();

// Load environment variables from the system (not the .env file)
const getSecret = async (path) => {
    try {
        vault.address = process.env.VAULT_ADDR;
        vault.token = process.env.VAULT_TOKEN;

        if (!vault.address || !vault.token) {
            throw new Error('VAULT_ADDR or VAULT_TOKEN not found in environment variables');
        }

        const result = await vault.read("secret/playwright/");
        return result.data.data.value;  // Retrieve the secret value
    } catch (err) {
        console.error(`Error fetching secret: ${err.message}`);
    }
};

module.exports = getSecret;