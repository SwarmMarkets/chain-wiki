# Components Folder Structure

The `components` directory is organized to ensure maintainability and reusability of the UI components across the application. 
This document explains the purpose of each folder within the `components` directory and provides guidelines on how to structure and add new components.

## Folder Structure

Valid folder structure:

components/
📁 Nft/
   📁 NftRoleManager/
      📄 GrantRoleForm.tsx
      📄 index.tsx
      📄 RevokeRoleButton.tsx
      📄 styled-components.ts
      📄 useNFTRoleManager.ts
   📁 NftView/
      📄 index.tsx
      📄 NftEditView.tsx
      📄 AddNftCard.tsx
      📄 NftCard.tsx
      📄 NftContentSkeleton.tsx
      📄 NftList.tsx
      📄 NftSkeleton.tsx
      📄 NftSkeletonList.tsx
      📄 styled-components.ts


### 1. `ui` Folder
The `ui` folder contains **pure UI components**. These are basic building blocks used across the application. Examples of components in this folder include:

- **Text**
- **TextField**
- **Box**
- **Table**
- **Grid**
- **Icon**

These components are highly reusable and do not contain any business logic. 
They are styled components that can be easily configured and reused wherever needed.

### 2. `common` Folder
The `common` folder contains components that encapsulate some **logic for conditional rendering** or interaction with external services like IPFS or wallets. These components are also used across the application but are more sophisticated than the ones in the `ui` folder.

Examples of components in this folder include:

- **SwitchNetworkAlert**
- **ConnectButton**
- **UploadFileButton**
- **WalletConnectedProtect**

These components often serve as wrappers or utilities for more complex interactions and are designed to be reusable.

### 3. Feature Folders (e.g., `Nft`, `Token`)
The root `components` folder contains **feature-specific** folders like `Nft`, `Token`, etc. Each of these folders represents a self-contained feature of the application and includes all related components.

#### Guidelines for Feature Folders:
1. **Adding a Feature**: 
   - If you have a new feature related to a specific domain (e.g., NFTs), create a new folder under `components` (e.g., `Nft`).
   - Place all related components inside this folder.

2. **Grouping Related Components**:
   - If there are multiple components related to a specific feature (e.g., `NFTCard`, `AddNFTCard`, `EditNFTCard`), group them in a subfolder (e.g., `NftCard`).
   - Ensure the subfolder has an `index.tsx` file that exports the main component by default.

3. **Styling Customization**:
   - If you need to customize styles for specific components, create a `styled-components.ts` file within the respective folder.

4. **Nesting Rules**:
   - **Maximum Nesting**: Do not nest folders more than twice.
   - Example of allowed nesting:
     - `components > Nft > NftCard > index.tsx`
   - Example of disallowed nesting:
     - `components > Nft > NftCard > index.tsx + NftButton > index.tsx`

## Summary
- Use the `ui` folder for pure, reusable UI components.
- Use the `common` folder for reusable components that include logic.
- Create feature-specific folders in the root `components` folder, and follow the guidelines for structuring and nesting.

This structure is designed to maintain clarity and ease of navigation, ensuring that components are organized in a logical, scalable manner.

components/
📁 Nft/
   📁 NftRoleManager/
      📄 index.tsx
      📄 GrantRoleForm.tsx
      📄 RevokeRoleButton.tsx
      📄 styled-components.ts
      📄 useNFTRoleManager.ts
   📁 NftView/
      📄 index.tsx
      📄 NftEditView.tsx
      📄 NftCard.tsx
      📄 styled-components.ts

