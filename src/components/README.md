# Components Folder Structure

The `components` directory is designed for easy maintenance and reuse. Below is an overview of the folder structure and guidelines.

## Folder Structure

Valid folder structure:

![image](https://github.com/user-attachments/assets/73391ec7-e8d0-4f07-92d5-d348f187a027)

### `ui` Folder
Contains basic, reusable UI components like `Text`, `Box`, and `Grid`. These are pure UI elements with no business logic.

### `common` Folder
Houses components with additional logic, such as `ConnectButton` and `UploadFileButton`. These are more complex and often involve external services.

### Feature Folders (e.g., `Nft`, `Token`)
Each feature-specific folder contains all related components. For example, the `Nft` folder holds components specific to NFT functionality.

#### Guidelines:
1. **Add Features**: Create a new folder for each feature (e.g., `Nft`).
2. **Group Components**: Place related components in subfolders (e.g., `NftCard`), with an `index.tsx` for exports.
3. **Customize Styles**: Use `styled-components.ts` for any styling customizations.
4. **Nesting Limit**: Do not nest folders more than twice. Example:
   - Allowed: `components/Nft/NftCard/index.tsx`
   - Not Allowed: `components/Nft/NftCard/NftButton/index.tsx`

## Summary
- **`ui`**: Pure UI components.
- **`common`**: Reusable components with logic.
- **Feature Folders**: Organized by feature with clear guidelines on structure and nesting.


