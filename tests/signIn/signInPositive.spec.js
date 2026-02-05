import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
  
  
});

test('Successful `Sign in` flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

test('User can sign in with changed in profile password', async ({ 
  user,
  page1,
  user2,
}) => {
  const signUpPage = new SignUpPage(page1);
  await page1.goto('/settings');
  await signUpPage.fillNewPasswordField(user2.password);
  
  await signUpPage.clickUpdateSettingsButton();
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
