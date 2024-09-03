# /consts

**!IMPORTANT!**
Use **/enums** for `enum`-like objects that represent a set of related values

This folder contains files that define and export constant values that are used across the project.

## Naming Conventions

- **File Names:** Each file should be named after the logical group of constants it contains. Use lowercase letters and dashes to separate words (e.g., `api-constants.ts`, `color-constants.ts`).

- **Variable Names:**
  - **Primitive Constants:** Use `UPPERCASE_SNAKE_CASE`. The name should clearly indicate its purpose (e.g., `MAX_RETRY_COUNT`, `PRIMARY_COLOR`).
  - **Object Constants:** Use `camelCase` for object names. The object should group related values together (e.g., `apiEndpoints`, `colorPalette`).

## Use Cases

- **Centralized Management:** Store all immutable values that are used in multiple places within the project to avoid magic numbers and hardcoding.

- **Separation of Concerns:** Group related constants in the same file to maintain clarity and organization.

- **Object Constants:** Use objects to group related constants that belong together logically, like **configuration settings** or related endpoints.

