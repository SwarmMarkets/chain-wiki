# Smart Account Usage with Thirdweb and Safe Global

This guide demonstrates how to use "Smart Accounts" from [@safe-global](https://github.com/safe-global) with [Thirdweb JS](https://portal.thirdweb.com/) for complex transactions, specifically for executing a `takeOffer` operation.

---

## Step 1: Approve Token to Safe Account
Before transferring tokens, approve the `Smart Account` to handle the token transaction.

```javascript
// Retrieve Smart Account instance
const { smartAccount } = useSmartAccount();
const smartAccountAddress = smartAccount.getAddress();

// Use token approval hook with the desired ERC20 token contract address
const { approveToken } = useApproveToken('0x...ERC20Address', 'ERC20');

// Approve the token for the Safe Account
approveToken(smartAccountAddress);
```

## Step 2: Batch Transactions to Take Offer
Next, you'll need to transfer tokens to the Safe Account and take the offer in a batch. Here’s how to do it:

```javascript
// Configuration setup
const config = useConfig();
const { smartAccount } = useSmartAccount();
const account = useAccount();

const walletAddress = account.address;
const smartAccountAddress = smartAccount.getAddress();

// Token and Offer functions
const { transferTokenFrom } = useTransferTokenFrom('0x...ERC20Address', 'ERC20');
const { transferToken } = useTransferToken('0x...ERC20Address', 'ERC20');
const { approveToken } = useApproveToken('0x...ERC20Address', 'ERC20');
const { takeOffer } = useTakeOffer();

// Function to batch transactions
const takeOffersInBatch = () => {
  // Define transfer transaction to Smart Account
  const transferTokenFromTx = transferTokenFrom({
    to: smartAccountAddress,
    from: walletAddress,
    amount, // Total amount to spend on offers
  });

  // Define approval transaction for the offer contract
  const approveTokenTx = approveToken({
    spender: config.contractsAddresses.dotcContractAddress,
  });

  // Execute the "takeOffer" transaction
  const takeOfferTx = takeOffer({
    id: '0x1', // Example offer ID
    ...params,
  });

  // Calculate expected return amount from the offer
  const approximateAmountUserWillGet = calculateOfferReturn(offer);

  // Transfer the calculated return amount to wallet
  const transferTokenTx = transferToken({
    to: walletAddress,
    amount: approximateAmountUserWillGet,
  });

  // Batch all transactions
  const transactionsBatch = [
    resolveThirdwebTransaction(transferTokenFromTx),
    resolveThirdwebTransaction(approveTokenTx),
    resolveThirdwebTransaction(takeOfferTx),
    resolveThirdwebTransaction(approveTokenTx), // Optional: duplicate approve
    resolveThirdwebTransaction(transferTokenTx),
  ];

  // Execute batched transactions
  smartAccount.send(transactionsBatch);
};
```

