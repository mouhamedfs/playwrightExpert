import { exec } from 'child_process';

const globalTeardown = async () => {
    exec('npx allure serve allure-results', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
export default globalTeardown;

 //Todo: implement allure report configuration to check if the directory exists and delete it before executing