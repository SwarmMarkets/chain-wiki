# /utils

This folder contains utility functions that provide reusable, general-purpose functionalities across the project. 
Utility functions help reduce code duplication and enhance the maintainability of the codebase

## Naming Conventions

- **File Names:** Use `camelCase` for the file names. Each file should contain functions that are related in purpose (e.g., `dateUtils.ts`, `stringUtils.ts`).

- **Function Names:** Use `camelCase` for function names. The name should clearly describe what the function does (e.g., `formatDate`, `capitalizeString`).

## Best Practices

- **Group Related Functions:** Avoid creating a single file for each utility function.
  Instead, group related functions together in the same file to maintain clarity and organization (e.g., all date-related functions in `dateUtils.ts`).

### Example

```typescript
// dateUtils.ts
export function formatDate(date: Date, format: string): string {
    // Implementation here
}

export function isPastDate(date: Date): boolean {
    // Implementation here
}
