import axios from 'axios';
import fs = require('fs');

interface TestResult {
    issueKey: string;
    status: string;
}

async function updateJira(): Promise<void> {
    const jiraUrl = process.env.JIRA_URL;
    const username = process.env.JIRA_USERNAME;
    const token = process.env.JIRA_API_TOKEN;
    const projectKey = process.env.JIRA_PROJECT_KEY;
    const testResultsFile = './test-results.json';

    const testResults: TestResult[] = JSON.parse(fs.readFileSync(testResultsFile, 'utf8'));

    for (const result of testResults) {
        const issueKey = result.issueKey; // Ensure your test results contain a valid Jira issue key
        const status = result.status === 'passed' ? 'Done' : 'To Do';

        try {
            await axios.post(
                `${jiraUrl}/rest/api/2/issue/${issueKey}/transitions`,
                {
                    transition: { id: getTransitionId(status) }, // Map status to Jira transition ID
                },
                {
                    auth: {
                        username: username,
                        password: token,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(`Updated Jira issue ${issueKey} with status ${status}`);
        } catch (error) {
            console.error(`Failed to update Jira issue ${issueKey}:`, error.response?.data || error.message);
        }
    }
}

function getTransitionId(status: string): string {
    const transitions: { [key: string]: string } = {
        "To Do": "11", // Replace with actual transition IDs from your Jira workflow
        "In Progress": "21",
        "Done": "31",
    };
    return transitions[status];
}

// Run the updateJira function and handle any unhandled promise rejections
updateJira().catch((err) => {
    console.error('Error updating Jira:', err);
    process.exit(1);
});
