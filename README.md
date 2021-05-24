# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

    1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

    No. Because sending message to another user involves the interaction of several components in the application instead of only one.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

    Yes. Testing max message length is relatively a small task that only involves a single component, that is the text box that the user type their message in.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

    It will run the tests without a browser UI, so we will not be able to see it driving our browser.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    
    await page.click('[src="./styles/settings.svg"]')
