# /contracts

This folder stores the smart contract ABIs and provides TypeScript typings for interacting with the contracts, ensuring type safety across the project.

## Adding a New Contract

1. **Create an ABI File:** Place the contract's ABI JSON file in the `abi/` subfolder of the respective contract (e.g., `AssetToken/abi/AssetToken.json`).

2. **Run Typechain:** After adding the ABI file, run `yarn typechain` to generate TypeScript typings for the contract.

3. **Specify the Contract Address:** Add the contract's address to the appropriate environment file for each network in the `environment` folder.

4. **Create a React Hook:** To use the contract in React, create a hook in the `hooks/contracts` folder, following the structure of existing hooks (e.g., `useSX1155NFT.ts`).

## Additional Folders

- **`hooks/contracts` Folder:** Contains React hooks that simplify contract interaction.

- **`typechain/` Folder:** Auto-generated from ABIs, this folder contains TypeScript typings for type-safe contract interactions.
