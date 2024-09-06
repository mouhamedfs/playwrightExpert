import axios from 'axios';
import { Reporter, TestCase, TestResult, FullConfig, Suite, FullResult } from '@playwright/test/reporter';

class JiraReporter implements Reporter {
    private xrayBaseUrl: string = process.env.XRAY_URL;
    private xrayClientId: string = process.env.XRAY_CLIENT_ID;
    private xrayClientSecret: string = process.env.XRAY_CLIENT_SECRET;
    private authToken: string = '';

    private testExecutionKey: string = ''; // Xray Test Execution key
    private tests: any[] = []; // Array to hold test results dynamically


    async onBegin(config: FullConfig, suite: Suite): Promise<void> {
        console.log('Starting the tests...');

        try {
            // Step 1: Authenticate with Xray to get an access token
            await this.authenticateXray();
        } catch (error) {
            console.error('Error during test setup:', error.message);
            throw error;  // Fail early if setup doesn't work
        }
    }

    async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
        const testTags = this.extractJiraTags(test.title);

        // Debug: Log the extracted test tags
        console.log('Extracted test tags:', testTags);

        testTags.forEach((testTag) => {
            // Debug: Log to check if the testTag exists in this.testTagsToKeys
            console.log(`Processing testTag: ${testTag}`);

            if (testTag) {
                const status = result.status === 'passed' ? 'PASSED' : 'FAILED';

                // Dynamically add each test result to the tests array
                this.tests.push({
                    testKey: testTag,  // Jira test case key from extracted tag
                    start: new Date().toISOString(),  // Start time of the test
                    finish: new Date().toISOString(),  // Finish time of the test
                    status: status,  // Test execution status (PASSED, FAILED, etc.)
                    comment: `Test ${status === 'PASSED' ? 'passed' : 'failed'}.`,  // Additional comments
                });

                // Debug: Log the current tests array
                console.log('Current tests array:', this.tests);
            } else {
                // Debug: Log when testTag is not found in testTagsToKeys
                console.log(`Test tag ${testTag} not found in testTagsToKeys`);
            }
        });
    }

    private extractJiraTags(testTitle: string): string[] {
        const jiraTagRegex = /@AT-\d+/g; // Matches multiple tags like @AT-14, @AT-15, etc.
        const matches = testTitle.match(jiraTagRegex);
        return matches ? matches.map(tag => tag.substring(1)) : []; // Return array of Jira tags without '@'
    }

    async onEnd(result: FullResult): Promise<void> {
        this.testExecutionKey = await this.createTestExecution();
        console.log('All tests finished.');
    }

    // Authenticate with Xray using client credentials to get an access token
    private async authenticateXray(): Promise<void> {
        try {
            const response = await axios.post(
                `${this.xrayBaseUrl}/api/v2/authenticate`,
                {
                    client_id: this.xrayClientId,
                    client_secret: this.xrayClientSecret
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            // The token is returned as a plain string
            this.authToken = response.data.replace(/"/g, ''); // Remove quotes around the token
            console.log('Successfully authenticated with Xray.');
        } catch (error) {
            console.error('Failed to authenticate with Xray:', error.message);
            throw error;
        }
    }

    // Create a Test Execution in Xray and return its key
    private async createTestExecution(): Promise<string> {
        try {
            const response = await axios.post(
                `${this.xrayBaseUrl}/api/v2/import/execution`,
                {
                    info: {
                        summary: "Automated Playwright Test Execution",
                        description: "Results of Playwright automated tests",
                        startDate: new Date().toISOString(),
                        finishDate: new Date().toISOString(),
                    },
                    tests: this.tests
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.authToken}`
                    }
                }
            );
            const testExecutionKey = response.data.key;  // Assuming the key is returned in `response.data.key`
            console.log('Created Test Execution:', testExecutionKey);
            return testExecutionKey;
        } catch (error) {
            console.error('Failed to create Test Execution:', error.message, error.response?.data);
            throw error;
        }
    }
}

export default JiraReporter;