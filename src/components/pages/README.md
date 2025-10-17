# /pages

This folder contains all the pages of the application.

## Structure

- **Single File Pages:** Each page can be a single file exporting a React component as a named export with the same name as the page (e.g., `Home.tsx` exporting `Home`).

- **Subfolders for Complex Pages:** For more complex pages, each page may have its own subfolder (*components*) containing separate files for its subpages and subcomponents (e.g., `Dashboard/` containing `Dashboard.tsx`, `DashboardHeader.tsx`, and `DashboardSidebar.tsx`).

## Routing

- **Top-Level Routing:** The top-level routing is configured inside the [`/App.tsx`](../App.tsx) file using `react-router`. 

- **Sub-Routers:** You can add as many sub-routers as needed within each page, allowing for nested routes and more complex navigation structures.

