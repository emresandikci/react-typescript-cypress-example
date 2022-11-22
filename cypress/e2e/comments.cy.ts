/// <reference types="cypress" />

const mockComment = {
  name: 'emre san',
  email: 'me@emresandikci.com',
  comment:
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, aliquam architecto, corrupti soluta ratione iure obcaecati cumque commodi quasi nobis ut minima! Saepe, expedita est! Quis perferendis amet iusto quod.',
};

describe('Comments', () => {
  let commentsContainerQuery = '.comments-container';
  let commentCardContainer = '.comment-card-container';

  it('should be go to Url http://localhost:3000/1', () => {
    cy.visit('http://localhost:3000/1');
  });
  it('should be have 5 comments for selected current post', () => {
    cy.get(commentsContainerQuery).find(commentCardContainer).should('have.length', 5);
  });
  it('should be have a button with text as "Add Comment"', () => {
    cy.get(commentsContainerQuery).find('button').first().should('have.text', 'Add Comment');
  });
  it('should be click Add Comment button', () => {
    cy.get(commentsContainerQuery).find('button').first().click();
  });
  it('should be visible Modal with title as Add Comment', () => {
    cy.get('.modal.modal-open').find('.title-container').should('have.text', 'Add Comment');
    cy.wait(2000);
  });
  it('should be have disabled button with text Create', () => {
    cy.get('.modal.modal-open').find('button').contains('Create').should('be.disabled');
  });
  it('should be fill out Add Comment form and click Create Button to add new comment', () => {
    cy.get('.modal.modal-open')
      .find('.modal-right .create-comment-content')
      .then(() => {
        cy.get('.form-element').then(() => {
          cy.get('input[name=name]')
            .type(mockComment.name)
            .should('have.value', mockComment.name)
            .get('input[name=email]')
            .type(mockComment.email)
            .should('have.value', mockComment.email)
            .get('textarea[name=body]')
            .type(mockComment.comment)
            .should('have.value', mockComment.comment);
        });
        cy.get('button').contains('Create').should('not.be.disabled').click();
      });
    cy.wait(1000).get(commentCardContainer).last().scrollIntoView();
  });
  it('should be have more than 5 comments', () => {
    cy.get(commentsContainerQuery).find(commentCardContainer).should('have.length.above', 5);
    cy.wait(2000);
  });
});
