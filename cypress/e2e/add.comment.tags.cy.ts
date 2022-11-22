/// <reference types="cypress" />

const mockTag = 'emre';

describe('Add Tag', () => {
  let commentsContainerQuery = '.comments-container';
  let commentCardContainer = '.comment-card-container';
  it('should be go to Url http://localhost:3000/1', () => {
    cy.visit('http://localhost:3000/1');
  });
  it('should be add tag for the first comment', () => {
    cy.get(commentsContainerQuery)
      .find(commentCardContainer)
      .find('button')
      .contains('Add Tag')
      .click();

    cy.get(commentsContainerQuery).scrollTo('top');

    cy.get('.popup-container')
      .find('.popup-content')
      .then(() => {
        cy.get('.form-element').then(() => {
          cy.get('input[name=tags]').wait(500).type(mockTag).type(',');
        });

        cy.get('button').contains('Save').should('not.be.disabled').click();
      });
  });
  it('should be have at least 1 tag', () => {
    cy.get(commentsContainerQuery)
      .find(commentCardContainer)
      .first()
      .find('.comment-footer .comment-tags')
      .then(() => {
        cy.get('.tag').should('have.text', mockTag);
      });
  });
});
