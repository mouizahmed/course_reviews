# Course Reviews

A web application that allows users to create course reviews for their respective post-secondary schools and ease their struggles within the course selection process.

This is a tool that students can use to evaluate courses and find courses that meet their expectations. Eeach review is categorized by its school, faculty, course, and professor. If any of these categories are not listed, the user can add them to the database in order to complete their course review.

Each course review is anonymous and can be deleted at any time if the user made the review while signed in.

# Tools & Frameworks

MySQL, ExpressJS, NodeJS, ReactJS, MUI, Cloudinary.

# Deployment

[Vercel](https://vercel.com/) to host the front and back-end, Google Cloud Platform to host the MySQL database, and Cloudinary to host all university logo images (stored as links within the database).

# Live Demo
[https://course-reviews-phi.vercel.app/](https://course-reviews-phi.vercel.app/)

# Bugs & Fixes

- First request to the backend and database were extremely slow (only present during initial load of website).
  - This has been fixed by switching from Render to Vercel to host the back-end. (Render.com shuts down the server after inactivity, making the first request take significantly longer) :heavy_check_mark:
- Currently shut down MySQL database hosting on Google Cloud Platform due to accruing charges. Will find another hosting platform with minimal costs.
  - This has been fixed by switching to PlanetScale's NoSQL Database (Serverless). :heavy_check_mark:
- Database loading is extremely slow (using PlanetScale NoSQL Database) :x:
  - PlanetScale Database may idle (go to sleep) if inactive for a while. :x:
