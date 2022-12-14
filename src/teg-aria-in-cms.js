document.addEventListener("DOMContentLoaded", () => {
	/**
	 * Pull a collection of values from a set of CSS class name prefixes.
	 *
	 * @param {HTMLElement} thisNode, a DOM node with one or more class names
	 * @param {Array<String>} theseAttributes, array of class name prefixes to check
	 * @returns {{}} collection of values indexed by the prefixes in  theseAttributes
	 */
	function getARIAAttributes(thisNode, theseAttributes) {
		let attributeCollection = {};

		thisNode.classList
		        .forEach((thisClass) => {

			        theseAttributes.forEach((thisPrefix) => {
				        if (thisClass.indexOf(thisPrefix) === 0) {
					        attributeCollection[thisPrefix] = thisClass.substring(thisPrefix.length);
				        }
			        })
		        });

		return attributeCollection;
	}

	/**
	 * Generate ID from value specified by class name only if that item is unique.
	 */
	document.querySelectorAll('[class*="aic-id-"]')
	        .forEach((thisNode) => {
		        thisNode.classList
		                .forEach((thisClass) => {

			                if (thisClass.indexOf('aic-id-') === 0) {
				                const thisID = thisClass.substring(7);

				                if (document.querySelector(`#${thisID}`) === null) {
					                thisNode.id = thisID;
				                }
			                }
		                });
	        });

	// wrap bits of CMS generated HTML in ARIA elements
	let wrappedItems = {};

	document.querySelectorAll('[class*="aic-wrap-"]')
	        .forEach((thisNode) => {
		        let wrapAttributes = getARIAAttributes(thisNode, ['aic-wrap-item-', 'aic-wrap-label-', 'aic-wrap-labelledby-']),
		            wrappedItemKey = typeof wrapAttributes['aic-wrap-label-'] !== 'undefined' ? wrapAttributes['aic-wrap-label-'] : wrapAttributes['aic-wrap-labelledby-'];

		        if (typeof wrappedItems[wrappedItemKey] === "undefined") {
			        wrappedItems[wrappedItemKey] = {
				        wrapElement   : wrapAttributes['aic-wrap-item-'],
				        wrapLabel     : wrapAttributes['aic-wrap-label-'] ? wrapAttributes['aic-wrap-label-'].replace(/[-_]/g, ' ') : '',
				        wrapLabelledBy: wrapAttributes['aic-wrap-labelledby-'],
				        itemList      : [thisNode],
			        };

		        } else {
			        wrappedItems[wrappedItemKey].itemList.push(thisNode);
		        }
	        });

	for (let wrappedItemsKey in wrappedItems) {
		const newNode = document.createElement(wrappedItems[wrappedItemsKey].wrapElement);

		if (wrappedItems[wrappedItemsKey].wrapLabel !== '') {
			newNode.setAttribute('aria-label', wrappedItems[wrappedItemsKey].wrapLabel);

		} else {

			if (typeof wrappedItems[wrappedItemsKey].wrapLabelledBy !== 'undefined') {
				newNode.setAttribute('aria-labelledBy', wrappedItems[wrappedItemsKey].wrapLabelledBy);
			}
		}

		wrappedItems[wrappedItemsKey].itemList[0].parentElement.insertBefore(newNode, wrappedItems[wrappedItemsKey].itemList[0]);
		newNode.append(wrappedItems[wrappedItemsKey].itemList[0]);

		for (let counter = 1; counter < wrappedItems[wrappedItemsKey].itemList.length; counter++) {
			newNode.append(wrappedItems[wrappedItemsKey].itemList[counter]);
		}
	}

	// set the role attribute
	document.querySelectorAll('[class*="aic-role-"]')
	        .forEach((thisNode) => {
		        let roleAttributes = getARIAAttributes(thisNode, ['aic-role-item-', 'aic-role-label-', 'aic-role-labelledby-']);

		        thisNode.setAttribute('role', roleAttributes['aic-role-item-']);

		        if (typeof roleAttributes['aic-role-label-'] !== 'undefined') {
			        thisNode.setAttribute('aria-label', roleAttributes['aic-role-label-'].replace(/[-_]/g, ' '));

		        } else {

			        if (typeof roleAttributes['aic-role-labelledby-'] !== 'undefined') {
				        thisNode.setAttribute('aria-labelledby', roleAttributes['aic-role-labelledby-']);
			        }
		        }
	        });
});
