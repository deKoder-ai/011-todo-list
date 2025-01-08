# template
basic webpack website skeleton
https://www.upgrad.com/blog/introduction-to-package-json-scripts-in-node-js/

npm install | install all dependencies from package.json
npm run build | compile project
npm run dev | starts a development server and loads the website
npm run deploy | check this on odin

read more on webpack merge:
https://webpack.js.org/guides/production/


Project spec:
- todos will be dynamically created objects using factories or constructors/classes
- todo items should have the following properties:
 - title
 - description
 - dueDate
 - priority
 - notes?
 - checklist?

Main page should display all projects, clicking on a project should open its todos. Projects listed here should display the name and due date (sorted by due date?)

Main page will need button to open a form to create a new project.

Each project should have a button to add todos to it

Separate application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, keep all of these things in separate modules.

Inspiration:
https://todoist.com/
https://culturedcode.com/things/
https://www.any.do/

Check this webpack library for formatting and manipulating dates and times:
https://github.com/date-fns/date-fns

https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:
Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!
You can inspect data you saved in localStorage using DevTools! To do this, open the Application tab in DevTools and click on the Local Storage tab under Storage. Every time you add, update and delete data from localStorage in your app, those changes will be reflected in DevTools.
localStorage uses JSON to send and store data, and when you retrieve the data, it will also be in JSON format. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!