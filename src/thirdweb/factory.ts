import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from 'thirdweb'

/**
 * Contract events
 */

/**
 * Represents the filters for the "ChainWikiDeployed" event.
 */
export type ChainWikiDeployedEventFilters = Partial<{
  chainWiki: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'chainWiki'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the ChainWikiDeployed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { chainWikiDeployedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  chainWikiDeployedEvent({
 *  chainWiki: ...,
 * })
 * ],
 * });
 * ```
 */
export function chainWikiDeployedEvent(
  filters: ChainWikiDeployedEventFilters = {}
) {
  return prepareEvent({
    signature:
      'event ChainWikiDeployed(address indexed chainWiki, string slug, (string name, string symbol, string kya) data, (address owner, address[] admins, address[] editors) roles)',
    filters,
  })
}

/**
 * Creates an event object for the ContractSlugUpdated event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { contractSlugUpdatedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  contractSlugUpdatedEvent()
 * ],
 * });
 * ```
 */
export function contractSlugUpdatedEvent() {
  return prepareEvent({
    signature: 'event ContractSlugUpdated(string slug)',
  })
}

/**
 * Creates an event object for the ImplementationUpgraded event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { implementationUpgradedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  implementationUpgradedEvent()
 * ],
 * });
 * ```
 */
export function implementationUpgradedEvent() {
  return prepareEvent({
    signature: 'event ImplementationUpgraded(address newImplementation)',
  })
}

/**
 * Represents the filters for the "OwnershipHandoverCanceled" event.
 */
export type OwnershipHandoverCanceledEventFilters = Partial<{
  pendingOwner: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'pendingOwner'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the OwnershipHandoverCanceled event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipHandoverCanceledEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipHandoverCanceledEvent({
 *  pendingOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownershipHandoverCanceledEvent(
  filters: OwnershipHandoverCanceledEventFilters = {}
) {
  return prepareEvent({
    signature: 'event OwnershipHandoverCanceled(address indexed pendingOwner)',
    filters,
  })
}

/**
 * Represents the filters for the "OwnershipHandoverRequested" event.
 */
export type OwnershipHandoverRequestedEventFilters = Partial<{
  pendingOwner: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'pendingOwner'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the OwnershipHandoverRequested event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipHandoverRequestedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipHandoverRequestedEvent({
 *  pendingOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownershipHandoverRequestedEvent(
  filters: OwnershipHandoverRequestedEventFilters = {}
) {
  return prepareEvent({
    signature: 'event OwnershipHandoverRequested(address indexed pendingOwner)',
    filters,
  })
}

/**
 * Represents the filters for the "OwnershipTransferred" event.
 */
export type OwnershipTransferredEventFilters = Partial<{
  oldOwner: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'oldOwner'
    type: 'address'
  }>
  newOwner: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'newOwner'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the OwnershipTransferred event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferredEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferredEvent({
 *  oldOwner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownershipTransferredEvent(
  filters: OwnershipTransferredEventFilters = {}
) {
  return prepareEvent({
    signature:
      'event OwnershipTransferred(address indexed oldOwner, address indexed newOwner)',
    filters,
  })
}

/**
 * Represents the filters for the "TokenSlugUpdated" event.
 */
export type TokenSlugUpdatedEventFilters = Partial<{
  slugId: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'slugId'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the TokenSlugUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { tokenSlugUpdatedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  tokenSlugUpdatedEvent({
 *  slugId: ...,
 * })
 * ],
 * });
 * ```
 */
export function tokenSlugUpdatedEvent(
  filters: TokenSlugUpdatedEventFilters = {}
) {
  return prepareEvent({
    signature: 'event TokenSlugUpdated(uint256 indexed slugId, string slug)',
    filters,
  })
}

/**
 * Contract read functions
 */

/**
 * Represents the parameters for the "chainWikiToSlug" function.
 */
export type ChainWikiToSlugParams = {
  chainWiki: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'chainWiki'
    type: 'address'
  }>
}

/**
 * Calls the "chainWikiToSlug" function on the contract.
 * @param options - The options for the chainWikiToSlug function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { chainWikiToSlug } from "TODO";
 *
 * const result = await chainWikiToSlug({
 *  chainWiki: ...,
 * });
 *
 * ```
 */
export async function chainWikiToSlug(
  options: BaseTransactionOptions<ChainWikiToSlugParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xea8f23ff',
      [
        {
          internalType: 'address',
          name: 'chainWiki',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
    ],
    params: [options.chainWiki],
  })
}

/**
 * Calls the "currentImplementation" function on the contract.
 * @param options - The options for the currentImplementation function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { currentImplementation } from "TODO";
 *
 * const result = await currentImplementation();
 *
 * ```
 */
export async function currentImplementation(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xd8bd5c29',
      [],
      [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "owner" function on the contract.
 * @param options - The options for the owner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { owner } from "TODO";
 *
 * const result = await owner();
 *
 * ```
 */
export async function owner(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x8da5cb5b',
      [],
      [
        {
          internalType: 'address',
          name: 'result',
          type: 'address',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Represents the parameters for the "ownershipHandoverExpiresAt" function.
 */
export type OwnershipHandoverExpiresAtParams = {
  pendingOwner: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'pendingOwner'
    type: 'address'
  }>
}

/**
 * Calls the "ownershipHandoverExpiresAt" function on the contract.
 * @param options - The options for the ownershipHandoverExpiresAt function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { ownershipHandoverExpiresAt } from "TODO";
 *
 * const result = await ownershipHandoverExpiresAt({
 *  pendingOwner: ...,
 * });
 *
 * ```
 */
export async function ownershipHandoverExpiresAt(
  options: BaseTransactionOptions<OwnershipHandoverExpiresAtParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xfee81cf4',
      [
        {
          internalType: 'address',
          name: 'pendingOwner',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'result',
          type: 'uint256',
        },
      ],
    ],
    params: [options.pendingOwner],
  })
}

/**
 * Represents the parameters for the "slugToChainWiki" function.
 */
export type SlugToChainWikiParams = {
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
}

/**
 * Calls the "slugToChainWiki" function on the contract.
 * @param options - The options for the slugToChainWiki function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { slugToChainWiki } from "TODO";
 *
 * const result = await slugToChainWiki({
 *  slug: ...,
 * });
 *
 * ```
 */
export async function slugToChainWiki(
  options: BaseTransactionOptions<SlugToChainWikiParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x6e79c0cd',
      [
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'proxy',
          type: 'address',
        },
      ],
    ],
    params: [options.slug],
  })
}

/**
 * Contract write functions
 */

/**
 * Calls the "cancelOwnershipHandover" function on the contract.
 * @param options - The options for the "cancelOwnershipHandover" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { cancelOwnershipHandover } from "TODO";
 *
 * const transaction = cancelOwnershipHandover();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function cancelOwnershipHandover(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0x54d1f13d', [], []],
    params: [],
  })
}

/**
 * Represents the parameters for the "completeOwnershipHandover" function.
 */
export type CompleteOwnershipHandoverParams = {
  pendingOwner: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'pendingOwner'
    type: 'address'
  }>
}

/**
 * Calls the "completeOwnershipHandover" function on the contract.
 * @param options - The options for the "completeOwnershipHandover" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { completeOwnershipHandover } from "TODO";
 *
 * const transaction = completeOwnershipHandover({
 *  pendingOwner: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function completeOwnershipHandover(
  options: BaseTransactionOptions<CompleteOwnershipHandoverParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xf04e283e',
      [
        {
          internalType: 'address',
          name: 'pendingOwner',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.pendingOwner],
  })
}

/**
 * Represents the parameters for the "deployChainWiki" function.
 */
export type DeployChainWikiParams = {
  data: AbiParameterToPrimitiveType<{
    components: [
      { internalType: 'string'; name: 'name'; type: 'string' },
      { internalType: 'string'; name: 'symbol'; type: 'string' },
      { internalType: 'string'; name: 'kya'; type: 'string' }
    ]
    internalType: 'struct ERC1155Data'
    name: 'data'
    type: 'tuple'
  }>
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
  roles: AbiParameterToPrimitiveType<{
    components: [
      { internalType: 'address'; name: 'owner'; type: 'address' },
      { internalType: 'address[]'; name: 'admins'; type: 'address[]' },
      { internalType: 'address[]'; name: 'editors'; type: 'address[]' }
    ]
    internalType: 'struct Roles'
    name: 'roles'
    type: 'tuple'
  }>
}

/**
 * Calls the "deployChainWiki" function on the contract.
 * @param options - The options for the "deployChainWiki" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deployChainWiki } from "TODO";
 *
 * const transaction = deployChainWiki({
 *  data: ...,
 *  slug: ...,
 *  roles: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function deployChainWiki(
  options: BaseTransactionOptions<DeployChainWikiParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xef1d4dee',
      [
        {
          components: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'symbol',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'kya',
              type: 'string',
            },
          ],
          internalType: 'struct ERC1155Data',
          name: 'data',
          type: 'tuple',
        },
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
        {
          components: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address[]',
              name: 'admins',
              type: 'address[]',
            },
            {
              internalType: 'address[]',
              name: 'editors',
              type: 'address[]',
            },
          ],
          internalType: 'struct Roles',
          name: 'roles',
          type: 'tuple',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'newProxy',
          type: 'address',
        },
      ],
    ],
    params: [options.data, options.slug, options.roles],
  })
}

/**
 * Calls the "renounceOwnership" function on the contract.
 * @param options - The options for the "renounceOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { renounceOwnership } from "TODO";
 *
 * const transaction = renounceOwnership();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function renounceOwnership(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0x715018a6', [], []],
    params: [],
  })
}

/**
 * Calls the "requestOwnershipHandover" function on the contract.
 * @param options - The options for the "requestOwnershipHandover" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { requestOwnershipHandover } from "TODO";
 *
 * const transaction = requestOwnershipHandover();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function requestOwnershipHandover(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0x25692962', [], []],
    params: [],
  })
}

/**
 * Represents the parameters for the "transferOwnership" function.
 */
export type TransferOwnershipParams = {
  newOwner: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'newOwner'
    type: 'address'
  }>
}

/**
 * Calls the "transferOwnership" function on the contract.
 * @param options - The options for the "transferOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferOwnership } from "TODO";
 *
 * const transaction = transferOwnership({
 *  newOwner: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transferOwnership(
  options: BaseTransactionOptions<TransferOwnershipParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xf2fde38b',
      [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.newOwner],
  })
}

/**
 * Represents the parameters for the "updateChainWikiSlug" function.
 */
export type UpdateChainWikiSlugParams = {
  chainWiki: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'chainWiki'
    type: 'address'
  }>
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
}

/**
 * Calls the "updateChainWikiSlug" function on the contract.
 * @param options - The options for the "updateChainWikiSlug" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { updateChainWikiSlug } from "TODO";
 *
 * const transaction = updateChainWikiSlug({
 *  chainWiki: ...,
 *  slug: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function updateChainWikiSlug(
  options: BaseTransactionOptions<UpdateChainWikiSlugParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xe0f124ea',
      [
        {
          internalType: 'address',
          name: 'chainWiki',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.chainWiki, options.slug],
  })
}

/**
 * Represents the parameters for the "upgradeImplementation" function.
 */
export type UpgradeImplementationParams = {
  newImplementation: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'newImplementation'
    type: 'address'
  }>
}

/**
 * Calls the "upgradeImplementation" function on the contract.
 * @param options - The options for the "upgradeImplementation" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { upgradeImplementation } from "TODO";
 *
 * const transaction = upgradeImplementation({
 *  newImplementation: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function upgradeImplementation(
  options: BaseTransactionOptions<UpgradeImplementationParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x83f94db7',
      [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.newImplementation],
  })
}
