/// <reference types="cypress" />

const mockReplyComment = {
  name: 'emre',
  email: 'emresantr61@gmail.com',
  comment: 'The comment for reply the comment Quis perferendis amet iusto quod.',
};

describe('Reply Comment', () => {
  let commentsContainerQuery = '.comments-container';
  let commentCardContainer = '.comment-card-container';
  it('should be go to Url http://localhost:3000/1', () => {
    cy.visit('http://localhost:3000/1');
  });
  it('should be reply the first comment', () => {
    cy.get(commentsContainerQuery)
      .find(commentCardContainer)
      .find('button')
      .contains('Reply')
      .click();

    cy.get('.modal.modal-open')
      .find('.modal-right .reply-comment-content')
      .then(() => {
        cy.get('.form-element').then(() => {
          cy.get('input[name=name]')
            .type(mockReplyComment.name)
            .should('have.value', mockReplyComment.name)
            .get('input[name=email]')
            .type(mockReplyComment.email)
            .should('have.value', mockReplyComment.email)
            .get('textarea[name=body]')
            .type(mockReplyComment.comment)
            .should('have.value', mockReplyComment.comment);
        });
        cy.get('.reply-comment-footer button').contains('Reply').should('not.be.disabled').click();
      })
      .then(() => {
        cy.get('button');
      });
  });
  it('should be have more than 0 reply', () => {
    cy.get(commentsContainerQuery)
      .find(commentCardContainer)
      .first()
      .then(() => {
        cy.get('button').contains('Reply').should('have.text', 'Reply (1)');
      });
    cy.wait(2000);
  });
});
