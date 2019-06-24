// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. 1. Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

/* eslint max-nested-callbacks: ["error", 4] */

import * as TIMEOUTS from '../../fixtures/timeouts';

describe('Markdown', () => {
    before(() => {
        cy.apiLogin('user-1');
        cy.visit('/');
    });

    const tests = [
        {name: 'with in-line images 4 (4k)', fileKey: 'markdown_inline_images_4'},
        {name: 'with in-line images 5 (Panorama)', fileKey: 'markdown_inline_images_5'},
    ];

    tests.forEach((test) => {
        it(test.name, () => {
            // #  Post markdown message
            cy.postMessageFromFile(`markdown/${test.fileKey}.md`);

            // * Verify that HTML Content is correct.
            // Note we use the Gigantic timeout to ensure that the large images will load
            cy.compareLastPostHTMLContentFromFile(`markdown/${test.fileKey}.html`, TIMEOUTS.GIGANTIC);
        });
    });
});