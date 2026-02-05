import { test, expect } from '@playwright/test';


export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleEditButton = page.getByRole(
      'link', 
      { name: 'Edit Article' })
      .first();
    this.updateButton = page.getByRole('button', { name: 'Update Article' });
  }



  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickArticleEditButton() {
    await test.step('Click Edit article page', async() =>{
      await this.articleEditButton.click();
    })
  }

  async clickupdateButton() {
    await test.step('Click Update button', async() =>{
      await this.updateButton.click();
    })
  }

  




}
