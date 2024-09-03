# /enums

This folder contains TypeScript `enum`-like objects that represent a set of related values. These objects are used to define a collection of constant values, making the code more readable and maintainable.

## Naming Conventions

- **Enum Object Names:** Use `PascalCase` for the names of enum-like objects. The name should clearly describe the purpose of the enum (e.g., `TokenType`, `OrderStatus`).

- **Enum Members:** Use `UPPERCASE_SNAKE_CASE` for the enum member names. Each member should clearly represent a distinct value within the enum (e.g., `ERC20`, `ERC721`).

- **Values:** They should be meaningful and consistent with the context in which they are used.

### Example

```typescript
// token-type.ts
export const TokenType = {
    ERC20: 'value',
    ERC721: 'anothervalue',
};

// order-status.ts
export const OrderStatus = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
};
