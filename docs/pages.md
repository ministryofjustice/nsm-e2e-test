# Page Objects

A Page Object encapsulates the page structure and the behaviors or actions that can be performed on a page, providing an interface for interacting with specific pages in the application.

Here's a short description of how to use this Page Object:

1. **Import the Page Object**: At the top of your fixture file, import the `AllClaimsPage` class:

   ```javascript
   import { AllClaimsPage } from './path/to/all-claims-page';
   ```

2. **Instantiate the Page Object**: Create a new instance of the `AllClaimsPage` class, passing the `page` object to the constructor:

   ```javascript
   const allClaimsPage = new AllClaimsPage(page);
   ```

3. **Use the Page Object methods**: Use the methods of the `AllClaimsPage` instance to interact with the page:

   ```javascript
   await allClaimsPage.goto();
   await allClaimsPage.changeRisk();
   ```

In this example, `goto` navigates to the All Claims page, and `changeRisk` performs actions to change the risk level. These methods abstract away the details of interacting with the page, allowing you to write cleaner, more readable tests.
