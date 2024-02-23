# Todo Expriements

This repository contains implementations of a dynamic to-do list component built in three popular frontend frameworks: Svelte, React, Vue and Lit.  Designed to show their syntax, reactivity models, and component structuring.
Each version of the component offers the following functionalities:

- **Adding New Todos**: Users can add tasks to their to-do list via an input field, either by pressing "Enter" or clicking an "Add Todo" button. Each task is added with a unique identifier and marked as incomplete by default.

- **Task Display and Management**: The to-do items are displayed in a list, with each task featuring a "Remove" button for deletion. Tasks can be marked as completed (e.g., a strike-through effect for completed tasks).

- **Interactive List Reordering**: Users can reorder tasks via drag-and-drop.

- **Accessibility Features**: The component supports keyboard interactions, allowing users to mark tasks as completed/incomplete without relying solely on mouse input.

- **Visual Feedback**: A reversed string of all task texts, updated as tasks are added or removed. This is to demonstrate how each framework reactively computes values.

I have used Astro to house them all.


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


