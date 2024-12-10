# THE CUBE CLUB

This Angular-based web application serves as an exam task from SoftUni, focused on practicing Angular development. The project features multiple pages with dynamic content, a catalog view to list all created records, and a details view to display specific record information. Logged-in users can perform CRUD operations on a custom collection, while guest users have access to basic website content. Additionally, the project incorporates the use of Three.js and Rive for animating 2D and 3D content on the web.

The idea is simple: through this app, you can create and share your own 3D cube and animate it by selecting its name, color, size, and rotation speeds along the x, y, and z axes. You can also interact with other creators by leaving comments. Enjoy!

## Here is a short video demonstration:

![The Cube Club Demo](public/The_Cube_Club.mp4)

## How to run it:

**Step 1:** Clone the repository.

**Step 2:** There is a modified version of the provided @SoftUni backend server in the `backend` folder that extends the Theme Scheme to receive and record data about the cubes' color, size, and rotation speeds. Open the folder in your IDE and fire it up with:

```bash
npm start
```

**Step 3:** Open the repository folder and type:

```bash
npm install
```

**Step 4:** After that, go on and start the project with:

```bash
ng serve
```

**Step 5:** You should now be able to see the app at:
http://localhost:4200/

## Main features:

1. The web application supports the following pages that render dynamic content:
   * Home (for logged-in users, the page renders the latest records)
   * Catalog (list of all created records)
   * Details (contains information about a specific record, including a comment section that updates dynamically)
   * Profile (with implemented update functionality)
2. Supports two collections (User and Post/Comment) with all CRUD operations.
3. Logged-in users are able to create records (3D rotating cubes) by sending requests to the REST API and can interact with them by leaving comments.
4. Logged-in users are able to delete and edit their own comments.
5. A guest user has access to basic website information like Catalog and Details, but no access to the functional activities. An authentication guard is implemented on various routes to block unauthorized activity and redirect to `/login`.
6. Implements communication to the REST API.
7. Implements client-side routing to various pages (Home, Catalog, Profile, Details, Login, Register, Create a record, Leave a new comment, Delete a comment...).
8. The routing to the edit/delete pages of specific comments is based on parameters.
9. Implements error handling on various forms (Login, Register, Create, Edit...). **IMPORTANT: The supported email domains for register/login are: `['bg', 'com']`.**
10. Implements an error interceptor.
11. Demonstrates the use of TypeScript with specific types.
12. Implements multiple interfaces, observables, RxJS operators, lifecycle hooks, and pipes.

## Additional 2D and 3D animation features:

1. The 3D animation of square-shaped particles moving slowly at the background of each view was made with three.js.
2. The animation of each cube rotating in the Catalog and Details pages was made with three.js
3. The welcome animation on the Home view for guest users was made with Rive.
