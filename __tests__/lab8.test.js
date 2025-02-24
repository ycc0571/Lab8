describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    jest.setTimeout(10000);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click("journal-entry");
    let url = page.url();
    expect(url.indexOf('/#entry1')).not.toBe(-1);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let inner_html = await page.$eval('h1', header => header.innerHTML);
    expect(inner_html).toEqual('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
      var allCorrect = true;
      const entrypage = await page.$('entry-page');
      let data = await entrypage.getProperty('entry');
      let plainValue = await data.jsonValue();
      if (plainValue.title != 'You like jazz?') { allCorrect = false; }
      if (plainValue.date != '4/25/2021') { allCorrect = false; }
      if (plainValue.content != "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") { allCorrect = false; }
      if (plainValue.image.src != 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455') { allCorrect = false; }
      if (plainValue.image.alt != 'bee with sunglasses') { allCorrect = false; }
      expect(allCorrect).toBe(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyclass = await page.$eval('body', body => body.className);
    expect(bodyclass).toEqual('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    await page.click('[src="./styles/settings.svg"]');
    let url = page.url();
    expect(url.indexOf('#settings')).not.toBe(-1);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    let inner_html = await page.$eval('h1', header => header.innerHTML);
    expect(inner_html).toEqual('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyclass = await page.$eval('body', body => body.className);
    expect(bodyclass).toEqual('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let url = page.url();
    expect(url.indexOf('/#entry1')).not.toBe(-1);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    let url = page.url();
    expect(url).toEqual('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    let inner_html = await page.$eval('h1', header => header.innerHTML);
    expect(inner_html).toEqual('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('test13: On the home page the <body> element should not have any class attribute', async() => {
    const bodyclass = await page.$eval('body', body => body.className);
    expect(bodyclass).toEqual('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async() => {
    let entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(300);
    let url = await page.url();
    expect(url.indexOf('/#entry2')).not.toBe(-1);
  });


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async() => {
    let inner_html = await page.$eval('h1', header => header.innerHTML);
    expect(inner_html).toEqual('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    var allCorrect = true;
    const entrypage = await page.$('entry-page');
    let data = await entrypage.getProperty('entry');
    let plainValue = await data.jsonValue();
    if (plainValue.title != 'Run, Forrest! Run!') { allCorrect = false; }
    if (plainValue.date != '4/26/2021') { allCorrect = false; }
    if (plainValue.content != "Mama always said life was like a box of chocolates. You never know what you're gonna get.") { allCorrect = false; }
    if (plainValue.image.src != 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg') { allCorrect = false; }
    if (plainValue.image.alt != 'forrest running') { allCorrect = false; }
    expect(allCorrect).toBe(true);
  });

  // create your own test 17
  it('test17: Clicking the header once should bring the user back to the home page', async() => {
    await page.click('h1');
    let url = page.url();
    expect(url).toEqual('http://127.0.0.1:5500/');
  });

  // create your own test 18
  it('test18: Clicking the back button once should bring the user back to entry 2', async() => {
    await page.goBack();
    let url = page.url();
    expect(url.indexOf('/#entry2')).not.toBe(-1);
  });

  // create your own test 19
  it('test19: Verify the url is correct when clicking on the nineth entry', async() => {
    await page.click('h1');
    let entries = await page.$$('journal-entry');
    await entries[8].click();
    await page.waitForTimeout(300);
    let url = await page.url();
    expect(url.indexOf('/#entry9')).not.toBe(-1);
  });

  // create your own test 20
  it('test20: Verify the title is current when clicking on the nineth entry', async() => {
    let inner_html = await page.$eval('h1', header => header.innerHTML);
    expect(inner_html).toEqual('Entry 9');
  });
});
