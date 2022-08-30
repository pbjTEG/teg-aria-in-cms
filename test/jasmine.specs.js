describe('TEG Aria in CMS', () => {
	it('should set an ID', () => {
		expect(document.querySelector('#myIDValue')).toBeTruthy();
		expect(document.querySelector('#foo')).toBeTruthy();
	}); // end it('should set an ID when requested')

	it('should not set an ID which already exists', () => {
		expect(document.querySelectorAll('[id="bar"]').length).toBe(1);
	}); // end it('should not set an ID which already exists')

	it('should set a role', () => {
		expect(document.querySelector('[role="form"]')).toBeTruthy();
	}); // end it('should set a role')

	it('should set a label', () => {
		expect(document.querySelector('[aria-label="This Form"]')).toBeTruthy();
	}); // end it('should set a label')

	it('should wrap elements in new HTML', () => {
		expect(document.querySelector('section[aria-labelledby="sectionLabel"]')).toBeTruthy();
	}); // end it('should wrap elements in new HTML')

	it('should ignore labelledBy if label is present', () => {
		expect(document.querySelector('sectionsection[aria-label="My Label"][aria-labelledby]')).toBe(null);
	}); // end it('should wrap elements in new HTML')

	it('should put multiple elements in new HTML', () => {
		expect(document.querySelectorAll('section[aria-labelledby="sectionLabel"] > div').length).toBe(3);
		expect(document.querySelectorAll('section[aria-label="My Label"] > div').length).toBe(2);
	}); // end it('should put multiple elements in new HTML')
}); // end describe('TEG Aria in CMS')
