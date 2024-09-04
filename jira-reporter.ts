import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import axios from 'axios';

class JiraReporter implements Reporter {
    public jiraBaseUrl: string = process.env.JIRA_URL;
    public auth = {
        username: process.env.JIRA_USERNAME,
        password: process.env.JIRA_API_TOKEN,
    };

    private headers = { 'Content-Type': 'application/json' };

    async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
        if (result.status === 'failed') {
            await this.createJiraIssue(test.title, result.error?.message || 'Test failed');
        }
    }

    private async createJiraIssue(testName: string, description: string): Promise<void> {
        try {
            const response = await axios.post(
                `${this.jiraBaseUrl}/rest/api/3/issue`,
                {
                    fields: {
                        project: { key: process.env.JIRA_PROJECT_KEY },
                        summary: `Test failed: ${testName}`,
                        description: {
                            type: "doc",
                            version: 1,
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: description
                                        }
                                    ]
                                }
                            ]
                        },
                        issuetype: { name: 'Bug' },
                    },
                },
                { auth: this.auth, headers: this.headers }
            );
            console.log(`Created Jira issue: ${response.data.key}`);
        } catch (error) {
            console.error('Failed to create Jira issue:', error.response ? error.response.data : error.message);
        }
    }
}

export default JiraReporter;