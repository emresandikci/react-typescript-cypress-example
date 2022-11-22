/// <reference types="cypress" />
describe('Posts', () => {
  const postsContainerQuery = '.posts-container';
  const postsCardQuery = '.post-card-content';
  const selectedPostQuery = '.comments-container .post-detail-container .card p.title';
  const noCommentYet = 'No Comment Yet';
  const commentsContainer = '.comments-container';
  const empyStateContainer = '.empy-state-container';

  it('should be go to Url http://localhost:3000/1', () => {
    cy.visit('http://localhost:3000/');
  });
  it(`should be have empty state text as ${noCommentYet}`, () => {
    cy.get(commentsContainer).children(empyStateContainer).should('have.text', noCommentYet);
    cy.wait(3000);
  });
  it('should be have 100 posts', () => {
    cy.get(postsCardQuery).then((postCards) => {
      expect(postCards.length).to.equals(100);
    });
    cy.wait(2000);
  });
  it('should be search a post by user name in Ervin', () => {
    cy.get('input').type('Ervin');
  });
  it('should be show 10 posts in the page as result', () => {
    cy.get(postsCardQuery).should('have.length', 10);
  });
  it('should be click view button of first post', () => {
    cy.get(`${postsCardQuery} a button`).first().click();
    cy.get(postsContainerQuery).scrollTo('top');
  });
  it("should be have title same has selected post's title", () => {
    cy.get(`${postsCardQuery} p.title`)
      .first()
      .then(($post) => {
        cy.get(selectedPostQuery).should('have.text', $post.text());
      });
  });
});
