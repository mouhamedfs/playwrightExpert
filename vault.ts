import * as dotenv from 'dotenv';
const vault = require('node-vault');

// Load environment variables from .env file
dotenv.config();

// Create the Vault client
const vaultClient = vault({
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN,
});


export const getSecret = async (secretPath: string): Promise<string | null> => {
    try {
        const fullPath = `secret/data/${secretPath}`;
        const result = await vaultClient.read(fullPath);
        return result.data?.data?.value || null;
    } catch (error) {
        console.error(`Error fetching secret at path "${secretPath}": ${error.message}`);
        return null;
    }
};