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
 * Represents the filters for the "ApprovalForAll" event.
 */
export type ApprovalForAllEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'owner'
    type: 'address'
  }>
  operator: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'operator'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the ApprovalForAll event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalForAllEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalForAllEvent({
 *  owner: ...,
 *  operator: ...,
 * })
 * ],
 * });
 * ```
 */
export function approvalForAllEvent(filters: ApprovalForAllEventFilters = {}) {
  return prepareEvent({
    signature:
      'event ApprovalForAll(address indexed owner, address indexed operator, bool isApproved)',
    filters,
  })
}

/**
 * Represents the filters for the "CommentRemoved" event.
 */
export type CommentRemovedEventFilters = Partial<{
  removedBy: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'removedBy'
    type: 'address'
  }>
  tokenId: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the CommentRemoved event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { commentRemovedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  commentRemovedEvent({
 *  removedBy: ...,
 *  tokenId: ...,
 * })
 * ],
 * });
 * ```
 */
export function commentRemovedEvent(filters: CommentRemovedEventFilters = {}) {
  return prepareEvent({
    signature:
      'event CommentRemoved(address indexed removedBy, uint256 indexed tokenId, string comment, uint256 commentId)',
    filters,
  })
}

/**
 * Represents the filters for the "Commented" event.
 */
export type CommentedEventFilters = Partial<{
  commentator: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'commentator'
    type: 'address'
  }>
  tokenId: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the Commented event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { commentedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  commentedEvent({
 *  commentator: ...,
 *  tokenId: ...,
 * })
 * ],
 * });
 * ```
 */
export function commentedEvent(filters: CommentedEventFilters = {}) {
  return prepareEvent({
    signature:
      'event Commented(address indexed commentator, uint256 indexed tokenId, string comment, uint256 commentId)',
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
 * Creates an event object for the ContractURISet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { contractURISetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  contractURISetEvent()
 * ],
 * });
 * ```
 */
export function contractURISetEvent() {
  return prepareEvent({
    signature: 'event ContractURISet(address from, string uri)',
  })
}

/**
 * Represents the filters for the "ForceBurn" event.
 */
export type ForceBurnEventFilters = Partial<{
  issuer: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'issuer'
    type: 'address'
  }>
  from: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  tokenId: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the ForceBurn event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { forceBurnEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  forceBurnEvent({
 *  issuer: ...,
 *  from: ...,
 *  tokenId: ...,
 * })
 * ],
 * });
 * ```
 */
export function forceBurnEvent(filters: ForceBurnEventFilters = {}) {
  return prepareEvent({
    signature:
      'event ForceBurn(address indexed issuer, address indexed from, uint256 indexed tokenId, string reason)',
    filters,
  })
}

/**
 * Represents the filters for the "ForceTransfer" event.
 */
export type ForceTransferEventFilters = Partial<{
  issuer: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'issuer'
    type: 'address'
  }>
  from: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  to: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the ForceTransfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { forceTransferEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  forceTransferEvent({
 *  issuer: ...,
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */
export function forceTransferEvent(filters: ForceTransferEventFilters = {}) {
  return prepareEvent({
    signature:
      'event ForceTransfer(address indexed issuer, address indexed from, address indexed to, uint256 tokenId)',
    filters,
  })
}

/**
 * Creates an event object for the Initialized event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { initializedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  initializedEvent()
 * ],
 * });
 * ```
 */
export function initializedEvent() {
  return prepareEvent({
    signature: 'event Initialized(uint64 version)',
  })
}

/**
 * Creates an event object for the KyaUpdated event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { kyaUpdatedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  kyaUpdatedEvent()
 * ],
 * });
 * ```
 */
export function kyaUpdatedEvent() {
  return prepareEvent({
    signature: 'event KyaUpdated(address from, string kya)',
  })
}

/**
 * Represents the filters for the "Minted" event.
 */
export type MintedEventFilters = Partial<{
  minter: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'minter'
    type: 'address'
  }>
  receiver: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'receiver'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the Minted event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { mintedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  mintedEvent({
 *  minter: ...,
 *  receiver: ...,
 * })
 * ],
 * });
 * ```
 */
export function mintedEvent(filters: MintedEventFilters = {}) {
  return prepareEvent({
    signature:
      'event Minted(address indexed minter, address indexed receiver, uint256 tokenId, uint256 amount, string uri, string slug)',
    filters,
  })
}

/**
 * Creates an event object for the NewMaxArraySizeSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { newMaxArraySizeSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  newMaxArraySizeSetEvent()
 * ],
 * });
 * ```
 */
export function newMaxArraySizeSetEvent() {
  return prepareEvent({
    signature: 'event NewMaxArraySizeSet(uint256 newMaxArraySize)',
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
 * Represents the filters for the "RoleSet" event.
 */
export type RoleSetEventFilters = Partial<{
  holder: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'holder'
    type: 'address'
  }>
  role: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
  active: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'bool'
    name: 'active'
    type: 'bool'
  }>
}>

/**
 * Creates an event object for the RoleSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { roleSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  roleSetEvent({
 *  holder: ...,
 *  role: ...,
 *  active: ...,
 * })
 * ],
 * });
 * ```
 */
export function roleSetEvent(filters: RoleSetEventFilters = {}) {
  return prepareEvent({
    signature:
      'event RoleSet(address indexed holder, uint256 indexed role, bool indexed active)',
    filters,
  })
}

/**
 * Represents the filters for the "TokenKyaUpdated" event.
 */
export type TokenKyaUpdatedEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  id: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'id'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the TokenKyaUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { tokenKyaUpdatedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  tokenKyaUpdatedEvent({
 *  from: ...,
 *  id: ...,
 * })
 * ],
 * });
 * ```
 */
export function tokenKyaUpdatedEvent(
  filters: TokenKyaUpdatedEventFilters = {}
) {
  return prepareEvent({
    signature:
      'event TokenKyaUpdated(address indexed from, uint256 indexed id, string kya)',
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
 * Represents the filters for the "TokenURIUpdated" event.
 */
export type TokenURIUpdatedEventFilters = Partial<{
  id: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'id'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the TokenURIUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { tokenURIUpdatedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  tokenURIUpdatedEvent({
 *  id: ...,
 * })
 * ],
 * });
 * ```
 */
export function tokenURIUpdatedEvent(
  filters: TokenURIUpdatedEventFilters = {}
) {
  return prepareEvent({
    signature:
      'event TokenURIUpdated(address from, uint256 indexed id, string uri)',
    filters,
  })
}

/**
 * Represents the filters for the "TransferBatch" event.
 */
export type TransferBatchEventFilters = Partial<{
  operator: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'operator'
    type: 'address'
  }>
  from: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  to: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the TransferBatch event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferBatchEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferBatchEvent({
 *  operator: ...,
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferBatchEvent(filters: TransferBatchEventFilters = {}) {
  return prepareEvent({
    signature:
      'event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] amounts)',
    filters,
  })
}

/**
 * Represents the filters for the "TransferSingle" event.
 */
export type TransferSingleEventFilters = Partial<{
  operator: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'operator'
    type: 'address'
  }>
  from: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  to: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the TransferSingle event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferSingleEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferSingleEvent({
 *  operator: ...,
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferSingleEvent(filters: TransferSingleEventFilters = {}) {
  return prepareEvent({
    signature:
      'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 amount)',
    filters,
  })
}

/**
 * Represents the filters for the "URI" event.
 */
export type URIEventFilters = Partial<{
  id: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'uint256'
    name: 'id'
    type: 'uint256'
  }>
}>

/**
 * Creates an event object for the URI event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { uRIEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  uRIEvent({
 *  id: ...,
 * })
 * ],
 * });
 * ```
 */
export function uRIEvent(filters: URIEventFilters = {}) {
  return prepareEvent({
    signature: 'event URI(string value, uint256 indexed id)',
    filters,
  })
}

/**
 * Represents the filters for the "Upgraded" event.
 */
export type UpgradedEventFilters = Partial<{
  implementation: AbiParameterToPrimitiveType<{
    indexed: true
    internalType: 'address'
    name: 'implementation'
    type: 'address'
  }>
}>

/**
 * Creates an event object for the Upgraded event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { upgradedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  upgradedEvent({
 *  implementation: ...,
 * })
 * ],
 * });
 * ```
 */
export function upgradedEvent(filters: UpgradedEventFilters = {}) {
  return prepareEvent({
    signature: 'event Upgraded(address indexed implementation)',
    filters,
  })
}

/**
 * Contract read functions
 */

/**
 * Calls the "DEFAULT_ADMIN_ROLE" function on the contract.
 * @param options - The options for the DEFAULT_ADMIN_ROLE function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { DEFAULT_ADMIN_ROLE } from "TODO";
 *
 * const result = await DEFAULT_ADMIN_ROLE();
 *
 * ```
 */
export async function DEFAULT_ADMIN_ROLE(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xa217fddf',
      [],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "EDITOR_ROLE" function on the contract.
 * @param options - The options for the EDITOR_ROLE function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { EDITOR_ROLE } from "TODO";
 *
 * const result = await EDITOR_ROLE();
 *
 * ```
 */
export async function EDITOR_ROLE(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xa853211a',
      [],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Represents the parameters for the "balanceOf" function.
 */
export type BalanceOfParams = {
  owner: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'owner'
    type: 'address'
  }>
  id: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'id'
    type: 'uint256'
  }>
}

/**
 * Calls the "balanceOf" function on the contract.
 * @param options - The options for the balanceOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { balanceOf } from "TODO";
 *
 * const result = await balanceOf({
 *  owner: ...,
 *  id: ...,
 * });
 *
 * ```
 */
export async function balanceOf(
  options: BaseTransactionOptions<BalanceOfParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x00fdd58e',
      [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
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
    params: [options.owner, options.id],
  })
}

/**
 * Represents the parameters for the "balanceOfBatch" function.
 */
export type BalanceOfBatchParams = {
  owners: AbiParameterToPrimitiveType<{
    internalType: 'address[]'
    name: 'owners'
    type: 'address[]'
  }>
  ids: AbiParameterToPrimitiveType<{
    internalType: 'uint256[]'
    name: 'ids'
    type: 'uint256[]'
  }>
}

/**
 * Calls the "balanceOfBatch" function on the contract.
 * @param options - The options for the balanceOfBatch function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { balanceOfBatch } from "TODO";
 *
 * const result = await balanceOfBatch({
 *  owners: ...,
 *  ids: ...,
 * });
 *
 * ```
 */
export async function balanceOfBatch(
  options: BaseTransactionOptions<BalanceOfBatchParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x4e1273f4',
      [
        {
          internalType: 'address[]',
          name: 'owners',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
      ],
      [
        {
          internalType: 'uint256[]',
          name: 'balances',
          type: 'uint256[]',
        },
      ],
    ],
    params: [options.owners, options.ids],
  })
}

/**
 * Represents the parameters for the "commentatorByCommentsId" function.
 */
export type CommentatorByCommentsIdParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  commentId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'commentId'
    type: 'uint256'
  }>
}

/**
 * Calls the "commentatorByCommentsId" function on the contract.
 * @param options - The options for the commentatorByCommentsId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { commentatorByCommentsId } from "TODO";
 *
 * const result = await commentatorByCommentsId({
 *  tokenId: ...,
 *  commentId: ...,
 * });
 *
 * ```
 */
export async function commentatorByCommentsId(
  options: BaseTransactionOptions<CommentatorByCommentsIdParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x3b62dad6',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'commentId',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'commentator',
          type: 'address',
        },
      ],
    ],
    params: [options.tokenId, options.commentId],
  })
}

/**
 * Calls the "contractSlug" function on the contract.
 * @param options - The options for the contractSlug function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { contractSlug } from "TODO";
 *
 * const result = await contractSlug();
 *
 * ```
 */
export async function contractSlug(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xc72ff405',
      [],
      [
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "contractURI" function on the contract.
 * @param options - The options for the contractURI function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { contractURI } from "TODO";
 *
 * const result = await contractURI();
 *
 * ```
 */
export async function contractURI(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xe8a3d485',
      [],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "currentAttestationId" function on the contract.
 * @param options - The options for the currentAttestationId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { currentAttestationId } from "TODO";
 *
 * const result = await currentAttestationId();
 *
 * ```
 */
export async function currentAttestationId(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x09a17386',
      [],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "currentTokenId" function on the contract.
 * @param options - The options for the currentTokenId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { currentTokenId } from "TODO";
 *
 * const result = await currentTokenId();
 *
 * ```
 */
export async function currentTokenId(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x009a9b7b',
      [],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "factory" function on the contract.
 * @param options - The options for the factory function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { factory } from "TODO";
 *
 * const result = await factory();
 *
 * ```
 */
export async function factory(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xc45a0155',
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
 * Represents the parameters for the "hasRole" function.
 */
export type HasRoleParams = {
  holder: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'holder'
    type: 'address'
  }>
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
}

/**
 * Calls the "hasRole" function on the contract.
 * @param options - The options for the hasRole function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { hasRole } from "TODO";
 *
 * const result = await hasRole({
 *  holder: ...,
 *  role: ...,
 * });
 *
 * ```
 */
export async function hasRole(options: BaseTransactionOptions<HasRoleParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x5c97f4a2',
      [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'result',
          type: 'bool',
        },
      ],
    ],
    params: [options.holder, options.role],
  })
}

/**
 * Represents the parameters for the "isApprovedForAll" function.
 */
export type IsApprovedForAllParams = {
  owner: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'owner'
    type: 'address'
  }>
  operator: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'operator'
    type: 'address'
  }>
}

/**
 * Calls the "isApprovedForAll" function on the contract.
 * @param options - The options for the isApprovedForAll function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isApprovedForAll } from "TODO";
 *
 * const result = await isApprovedForAll({
 *  owner: ...,
 *  operator: ...,
 * });
 *
 * ```
 */
export async function isApprovedForAll(
  options: BaseTransactionOptions<IsApprovedForAllParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xe985e9c5',
      [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'result',
          type: 'bool',
        },
      ],
    ],
    params: [options.owner, options.operator],
  })
}

/**
 * Calls the "kya" function on the contract.
 * @param options - The options for the kya function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { kya } from "TODO";
 *
 * const result = await kya();
 *
 * ```
 */
export async function kya(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x3fc7293a',
      [],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "maxArraySize" function on the contract.
 * @param options - The options for the maxArraySize function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { maxArraySize } from "TODO";
 *
 * const result = await maxArraySize();
 *
 * ```
 */
export async function maxArraySize(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xca7628bb',
      [],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Calls the "name" function on the contract.
 * @param options - The options for the name function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { name } from "TODO";
 *
 * const result = await name();
 *
 * ```
 */
export async function name(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x06fdde03',
      [],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
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
 * Calls the "proxiableUUID" function on the contract.
 * @param options - The options for the proxiableUUID function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { proxiableUUID } from "TODO";
 *
 * const result = await proxiableUUID();
 *
 * ```
 */
export async function proxiableUUID(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x52d1902d',
      [],
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Represents the parameters for the "roleHolderAt" function.
 */
export type RoleHolderAtParams = {
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
  i: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'i'
    type: 'uint256'
  }>
}

/**
 * Calls the "roleHolderAt" function on the contract.
 * @param options - The options for the roleHolderAt function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { roleHolderAt } from "TODO";
 *
 * const result = await roleHolderAt({
 *  role: ...,
 *  i: ...,
 * });
 *
 * ```
 */
export async function roleHolderAt(
  options: BaseTransactionOptions<RoleHolderAtParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xe3b3ac43',
      [
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'i',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'result',
          type: 'address',
        },
      ],
    ],
    params: [options.role, options.i],
  })
}

/**
 * Represents the parameters for the "roleHolderCount" function.
 */
export type RoleHolderCountParams = {
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
}

/**
 * Calls the "roleHolderCount" function on the contract.
 * @param options - The options for the roleHolderCount function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { roleHolderCount } from "TODO";
 *
 * const result = await roleHolderCount({
 *  role: ...,
 * });
 *
 * ```
 */
export async function roleHolderCount(
  options: BaseTransactionOptions<RoleHolderCountParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x492ba875',
      [
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
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
    params: [options.role],
  })
}

/**
 * Represents the parameters for the "roleHolders" function.
 */
export type RoleHoldersParams = {
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
}

/**
 * Calls the "roleHolders" function on the contract.
 * @param options - The options for the roleHolders function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { roleHolders } from "TODO";
 *
 * const result = await roleHolders({
 *  role: ...,
 * });
 *
 * ```
 */
export async function roleHolders(
  options: BaseTransactionOptions<RoleHoldersParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x84cc10c5',
      [
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'address[]',
          name: 'result',
          type: 'address[]',
        },
      ],
    ],
    params: [options.role],
  })
}

/**
 * Calls the "selfImplementation" function on the contract.
 * @param options - The options for the selfImplementation function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { selfImplementation } from "TODO";
 *
 * const result = await selfImplementation();
 *
 * ```
 */
export async function selfImplementation(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x56a67bdc',
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
 * Represents the parameters for the "slugToTokenId" function.
 */
export type SlugToTokenIdParams = {
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
}

/**
 * Calls the "slugToTokenId" function on the contract.
 * @param options - The options for the slugToTokenId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { slugToTokenId } from "TODO";
 *
 * const result = await slugToTokenId({
 *  slug: ...,
 * });
 *
 * ```
 */
export async function slugToTokenId(
  options: BaseTransactionOptions<SlugToTokenIdParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xe0b3384e',
      [
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
    ],
    params: [options.slug],
  })
}

/**
 * Represents the parameters for the "supportsInterface" function.
 */
export type SupportsInterfaceParams = {
  interfaceId: AbiParameterToPrimitiveType<{
    internalType: 'bytes4'
    name: 'interfaceId'
    type: 'bytes4'
  }>
}

/**
 * Calls the "supportsInterface" function on the contract.
 * @param options - The options for the supportsInterface function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { supportsInterface } from "TODO";
 *
 * const result = await supportsInterface({
 *  interfaceId: ...,
 * });
 *
 * ```
 */
export async function supportsInterface(
  options: BaseTransactionOptions<SupportsInterfaceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x01ffc9a7',
      [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'result',
          type: 'bool',
        },
      ],
    ],
    params: [options.interfaceId],
  })
}

/**
 * Calls the "symbol" function on the contract.
 * @param options - The options for the symbol function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { symbol } from "TODO";
 *
 * const result = await symbol();
 *
 * ```
 */
export async function symbol(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x95d89b41',
      [],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
    ],
    params: [],
  })
}

/**
 * Represents the parameters for the "tokenCommentByCommentId" function.
 */
export type TokenCommentByCommentIdParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  commentId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'commentId'
    type: 'uint256'
  }>
}

/**
 * Calls the "tokenCommentByCommentId" function on the contract.
 * @param options - The options for the tokenCommentByCommentId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { tokenCommentByCommentId } from "TODO";
 *
 * const result = await tokenCommentByCommentId({
 *  tokenId: ...,
 *  commentId: ...,
 * });
 *
 * ```
 */
export async function tokenCommentByCommentId(
  options: BaseTransactionOptions<TokenCommentByCommentIdParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x6780d86a',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'commentId',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'string',
          name: 'comment',
          type: 'string',
        },
      ],
    ],
    params: [options.tokenId, options.commentId],
  })
}

/**
 * Represents the parameters for the "tokenIdToSlug" function.
 */
export type TokenIdToSlugParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
}

/**
 * Calls the "tokenIdToSlug" function on the contract.
 * @param options - The options for the tokenIdToSlug function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { tokenIdToSlug } from "TODO";
 *
 * const result = await tokenIdToSlug({
 *  tokenId: ...,
 * });
 *
 * ```
 */
export async function tokenIdToSlug(
  options: BaseTransactionOptions<TokenIdToSlugParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xe61d9ba2',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
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
    params: [options.tokenId],
  })
}

/**
 * Represents the parameters for the "tokenKya" function.
 */
export type TokenKyaParams = {
  id: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: '_id'
    type: 'uint256'
  }>
}

/**
 * Calls the "tokenKya" function on the contract.
 * @param options - The options for the tokenKya function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { tokenKya } from "TODO";
 *
 * const result = await tokenKya({
 *  id: ...,
 * });
 *
 * ```
 */
export async function tokenKya(
  options: BaseTransactionOptions<TokenKyaParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xb035758f',
      [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
    ],
    params: [options.id],
  })
}

/**
 * Represents the parameters for the "totalSupply" function.
 */
export type TotalSupplyParams = {
  id: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: '_id'
    type: 'uint256'
  }>
}

/**
 * Calls the "totalSupply" function on the contract.
 * @param options - The options for the totalSupply function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalSupply } from "TODO";
 *
 * const result = await totalSupply({
 *  id: ...,
 * });
 *
 * ```
 */
export async function totalSupply(
  options: BaseTransactionOptions<TotalSupplyParams>
) {
  return readContract({
    contract: options.contract,
    method: [
      '0xbd85b039',
      [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [options.id],
  })
}

/**
 * Represents the parameters for the "uri" function.
 */
export type UriParams = {
  id: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: '_id'
    type: 'uint256'
  }>
}

/**
 * Calls the "uri" function on the contract.
 * @param options - The options for the uri function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { uri } from "TODO";
 *
 * const result = await uri({
 *  id: ...,
 * });
 *
 * ```
 */
export async function uri(options: BaseTransactionOptions<UriParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x0e89341c',
      [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
    ],
    params: [options.id],
  })
}

/**
 * Contract write functions
 */

/**
 * Represents the parameters for the "burn" function.
 */
export type BurnParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  quantity: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'quantity'
    type: 'uint256'
  }>
}

/**
 * Calls the "burn" function on the contract.
 * @param options - The options for the "burn" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { burn } from "TODO";
 *
 * const transaction = burn({
 *  tokenId: ...,
 *  quantity: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function burn(options: BaseTransactionOptions<BurnParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xb390c0ab',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.tokenId, options.quantity],
  })
}

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
 * Represents the parameters for the "deleteAttestation" function.
 */
export type DeleteAttestationParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  commentId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'commentId'
    type: 'uint256'
  }>
}

/**
 * Calls the "deleteAttestation" function on the contract.
 * @param options - The options for the "deleteAttestation" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deleteAttestation } from "TODO";
 *
 * const transaction = deleteAttestation({
 *  tokenId: ...,
 *  commentId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function deleteAttestation(
  options: BaseTransactionOptions<DeleteAttestationParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xf4f598b3',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'commentId',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.tokenId, options.commentId],
  })
}

/**
 * Represents the parameters for the "forceBurn" function.
 */
export type ForceBurnParams = {
  from: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  quantity: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'quantity'
    type: 'uint256'
  }>
  reason: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'reason'
    type: 'string'
  }>
}

/**
 * Calls the "forceBurn" function on the contract.
 * @param options - The options for the "forceBurn" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { forceBurn } from "TODO";
 *
 * const transaction = forceBurn({
 *  from: ...,
 *  tokenId: ...,
 *  quantity: ...,
 *  reason: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function forceBurn(options: BaseTransactionOptions<ForceBurnParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x2a75ad3f',
      [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.from, options.tokenId, options.quantity, options.reason],
  })
}

/**
 * Represents the parameters for the "forceBurnBatch" function.
 */
export type ForceBurnBatchParams = {
  accounts: AbiParameterToPrimitiveType<{
    internalType: 'address[]'
    name: 'accounts'
    type: 'address[]'
  }>
  tokenIds: AbiParameterToPrimitiveType<{
    internalType: 'uint256[]'
    name: 'tokenIds'
    type: 'uint256[]'
  }>
  quantities: AbiParameterToPrimitiveType<{
    internalType: 'uint256[]'
    name: 'quantities'
    type: 'uint256[]'
  }>
  reason: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'reason'
    type: 'string'
  }>
}

/**
 * Calls the "forceBurnBatch" function on the contract.
 * @param options - The options for the "forceBurnBatch" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { forceBurnBatch } from "TODO";
 *
 * const transaction = forceBurnBatch({
 *  accounts: ...,
 *  tokenIds: ...,
 *  quantities: ...,
 *  reason: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function forceBurnBatch(
  options: BaseTransactionOptions<ForceBurnBatchParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xe6c30142',
      [
        {
          internalType: 'address[]',
          name: 'accounts',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'quantities',
          type: 'uint256[]',
        },
        {
          internalType: 'string',
          name: 'reason',
          type: 'string',
        },
      ],
      [],
    ],
    params: [
      options.accounts,
      options.tokenIds,
      options.quantities,
      options.reason,
    ],
  })
}

/**
 * Represents the parameters for the "forceTransfer" function.
 */
export type ForceTransferParams = {
  from: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  to: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  quantity: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'quantity'
    type: 'uint256'
  }>
}

/**
 * Calls the "forceTransfer" function on the contract.
 * @param options - The options for the "forceTransfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { forceTransfer } from "TODO";
 *
 * const transaction = forceTransfer({
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 *  quantity: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function forceTransfer(
  options: BaseTransactionOptions<ForceTransferParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xd3e8a9ab',
      [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.from, options.to, options.tokenId, options.quantity],
  })
}

/**
 * Represents the parameters for the "grantEditorRole" function.
 */
export type GrantEditorRoleParams = {
  to: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
}

/**
 * Calls the "grantEditorRole" function on the contract.
 * @param options - The options for the "grantEditorRole" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { grantEditorRole } from "TODO";
 *
 * const transaction = grantEditorRole({
 *  to: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function grantEditorRole(
  options: BaseTransactionOptions<GrantEditorRoleParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xc9fe180a',
      [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.to],
  })
}

/**
 * Represents the parameters for the "grantRole" function.
 */
export type GrantRoleParams = {
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
  account: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'account'
    type: 'address'
  }>
}

/**
 * Calls the "grantRole" function on the contract.
 * @param options - The options for the "grantRole" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { grantRole } from "TODO";
 *
 * const transaction = grantRole({
 *  role: ...,
 *  account: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function grantRole(options: BaseTransactionOptions<GrantRoleParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x1fe5f589',
      [
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.role, options.account],
  })
}

/**
 * Represents the parameters for the "initialize" function.
 */
export type InitializeParams = {
  data: AbiParameterToPrimitiveType<{
    components: [
      { internalType: 'string'; name: 'name'; type: 'string' },
      { internalType: 'string'; name: 'symbol'; type: 'string' },
      { internalType: 'string'; name: 'kya'; type: 'string' }
    ]
    internalType: 'struct ERC1155Data'
    name: '_data'
    type: 'tuple'
  }>
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: '_slug'
    type: 'string'
  }>
  roles: AbiParameterToPrimitiveType<{
    components: [
      { internalType: 'address'; name: 'owner'; type: 'address' },
      { internalType: 'address[]'; name: 'admins'; type: 'address[]' },
      { internalType: 'address[]'; name: 'editors'; type: 'address[]' }
    ]
    internalType: 'struct Roles'
    name: '_roles'
    type: 'tuple'
  }>
  factory: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: '_factory'
    type: 'address'
  }>
}

/**
 * Calls the "initialize" function on the contract.
 * @param options - The options for the "initialize" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { initialize } from "TODO";
 *
 * const transaction = initialize({
 *  data: ...,
 *  slug: ...,
 *  roles: ...,
 *  factory: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function initialize(options: BaseTransactionOptions<InitializeParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x7e93c689',
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
          name: '_data',
          type: 'tuple',
        },
        {
          internalType: 'string',
          name: '_slug',
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
          name: '_roles',
          type: 'tuple',
        },
        {
          internalType: 'address',
          name: '_factory',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.data, options.slug, options.roles, options.factory],
  })
}

/**
 * Represents the parameters for the "makeAttestation" function.
 */
export type MakeAttestationParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  comment: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'comment'
    type: 'string'
  }>
}

/**
 * Calls the "makeAttestation" function on the contract.
 * @param options - The options for the "makeAttestation" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { makeAttestation } from "TODO";
 *
 * const transaction = makeAttestation({
 *  tokenId: ...,
 *  comment: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function makeAttestation(
  options: BaseTransactionOptions<MakeAttestationParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x8ae25cf5',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'comment',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.tokenId, options.comment],
  })
}

/**
 * Represents the parameters for the "mint" function.
 */
export type MintParams = {
  to: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
  quantity: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'quantity'
    type: 'uint256'
  }>
  tokenURI: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'tokenURI'
    type: 'string'
  }>
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
}

/**
 * Calls the "mint" function on the contract.
 * @param options - The options for the "mint" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mint } from "TODO";
 *
 * const transaction = mint({
 *  to: ...,
 *  quantity: ...,
 *  tokenURI: ...,
 *  slug: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function mint(options: BaseTransactionOptions<MintParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x2fb102cf',
      [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'tokenURI',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.to, options.quantity, options.tokenURI, options.slug],
  })
}

/**
 * Represents the parameters for the "mintBatch" function.
 */
export type MintBatchParams = {
  accounts: AbiParameterToPrimitiveType<{
    internalType: 'address[]'
    name: 'accounts'
    type: 'address[]'
  }>
  quantities: AbiParameterToPrimitiveType<{
    internalType: 'uint256[]'
    name: 'quantities'
    type: 'uint256[]'
  }>
  tokenURIs: AbiParameterToPrimitiveType<{
    internalType: 'string[]'
    name: 'tokenURIs'
    type: 'string[]'
  }>
  slugs: AbiParameterToPrimitiveType<{
    internalType: 'string[]'
    name: 'slugs'
    type: 'string[]'
  }>
}

/**
 * Calls the "mintBatch" function on the contract.
 * @param options - The options for the "mintBatch" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mintBatch } from "TODO";
 *
 * const transaction = mintBatch({
 *  accounts: ...,
 *  quantities: ...,
 *  tokenURIs: ...,
 *  slugs: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function mintBatch(options: BaseTransactionOptions<MintBatchParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x72bab1c2',
      [
        {
          internalType: 'address[]',
          name: 'accounts',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'quantities',
          type: 'uint256[]',
        },
        {
          internalType: 'string[]',
          name: 'tokenURIs',
          type: 'string[]',
        },
        {
          internalType: 'string[]',
          name: 'slugs',
          type: 'string[]',
        },
      ],
      [],
    ],
    params: [
      options.accounts,
      options.quantities,
      options.tokenURIs,
      options.slugs,
    ],
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
 * Represents the parameters for the "revokeEditorRole" function.
 */
export type RevokeEditorRoleParams = {
  from: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
}

/**
 * Calls the "revokeEditorRole" function on the contract.
 * @param options - The options for the "revokeEditorRole" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { revokeEditorRole } from "TODO";
 *
 * const transaction = revokeEditorRole({
 *  from: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function revokeEditorRole(
  options: BaseTransactionOptions<RevokeEditorRoleParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xc883b2fb',
      [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.from],
  })
}

/**
 * Represents the parameters for the "revokeRole" function.
 */
export type RevokeRoleParams = {
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
  account: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'account'
    type: 'address'
  }>
}

/**
 * Calls the "revokeRole" function on the contract.
 * @param options - The options for the "revokeRole" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { revokeRole } from "TODO";
 *
 * const transaction = revokeRole({
 *  role: ...,
 *  account: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function revokeRole(options: BaseTransactionOptions<RevokeRoleParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x1d0b19e7',
      [
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.role, options.account],
  })
}

/**
 * Represents the parameters for the "safeBatchTransferFrom" function.
 */
export type SafeBatchTransferFromParams = {
  from: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  to: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
  ids: AbiParameterToPrimitiveType<{
    internalType: 'uint256[]'
    name: 'ids'
    type: 'uint256[]'
  }>
  amounts: AbiParameterToPrimitiveType<{
    internalType: 'uint256[]'
    name: 'amounts'
    type: 'uint256[]'
  }>
  data: AbiParameterToPrimitiveType<{
    internalType: 'bytes'
    name: 'data'
    type: 'bytes'
  }>
}

/**
 * Calls the "safeBatchTransferFrom" function on the contract.
 * @param options - The options for the "safeBatchTransferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { safeBatchTransferFrom } from "TODO";
 *
 * const transaction = safeBatchTransferFrom({
 *  from: ...,
 *  to: ...,
 *  ids: ...,
 *  amounts: ...,
 *  data: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function safeBatchTransferFrom(
  options: BaseTransactionOptions<SafeBatchTransferFromParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x2eb2c2d6',
      [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      [],
    ],
    params: [
      options.from,
      options.to,
      options.ids,
      options.amounts,
      options.data,
    ],
  })
}

/**
 * Represents the parameters for the "safeTransferFrom" function.
 */
export type SafeTransferFromParams = {
  from: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'from'
    type: 'address'
  }>
  to: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'to'
    type: 'address'
  }>
  id: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'id'
    type: 'uint256'
  }>
  amount: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'amount'
    type: 'uint256'
  }>
  data: AbiParameterToPrimitiveType<{
    internalType: 'bytes'
    name: 'data'
    type: 'bytes'
  }>
}

/**
 * Calls the "safeTransferFrom" function on the contract.
 * @param options - The options for the "safeTransferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { safeTransferFrom } from "TODO";
 *
 * const transaction = safeTransferFrom({
 *  from: ...,
 *  to: ...,
 *  id: ...,
 *  amount: ...,
 *  data: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function safeTransferFrom(
  options: BaseTransactionOptions<SafeTransferFromParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xf242432a',
      [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      [],
    ],
    params: [
      options.from,
      options.to,
      options.id,
      options.amount,
      options.data,
    ],
  })
}

/**
 * Represents the parameters for the "setApprovalForAll" function.
 */
export type SetApprovalForAllParams = {
  operator: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'operator'
    type: 'address'
  }>
  isApproved: AbiParameterToPrimitiveType<{
    internalType: 'bool'
    name: 'isApproved'
    type: 'bool'
  }>
}

/**
 * Calls the "setApprovalForAll" function on the contract.
 * @param options - The options for the "setApprovalForAll" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setApprovalForAll } from "TODO";
 *
 * const transaction = setApprovalForAll({
 *  operator: ...,
 *  isApproved: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setApprovalForAll(
  options: BaseTransactionOptions<SetApprovalForAllParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xa22cb465',
      [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'isApproved',
          type: 'bool',
        },
      ],
      [],
    ],
    params: [options.operator, options.isApproved],
  })
}

/**
 * Represents the parameters for the "setContractKya" function.
 */
export type SetContractKyaParams = {
  Kya: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'Kya'
    type: 'string'
  }>
}

/**
 * Calls the "setContractKya" function on the contract.
 * @param options - The options for the "setContractKya" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setContractKya } from "TODO";
 *
 * const transaction = setContractKya({
 *  Kya: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setContractKya(
  options: BaseTransactionOptions<SetContractKyaParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x87a6cea8',
      [
        {
          internalType: 'string',
          name: 'Kya',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.Kya],
  })
}

/**
 * Represents the parameters for the "setContractSlug" function.
 */
export type SetContractSlugParams = {
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
}

/**
 * Calls the "setContractSlug" function on the contract.
 * @param options - The options for the "setContractSlug" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setContractSlug } from "TODO";
 *
 * const transaction = setContractSlug({
 *  slug: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setContractSlug(
  options: BaseTransactionOptions<SetContractSlugParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xe89a3f71',
      [
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.slug],
  })
}

/**
 * Represents the parameters for the "setMaxArraySize" function.
 */
export type SetMaxArraySizeParams = {
  maxSize: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'maxSize'
    type: 'uint256'
  }>
}

/**
 * Calls the "setMaxArraySize" function on the contract.
 * @param options - The options for the "setMaxArraySize" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setMaxArraySize } from "TODO";
 *
 * const transaction = setMaxArraySize({
 *  maxSize: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setMaxArraySize(
  options: BaseTransactionOptions<SetMaxArraySizeParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x29449eeb',
      [
        {
          internalType: 'uint256',
          name: 'maxSize',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.maxSize],
  })
}

/**
 * Represents the parameters for the "setRole" function.
 */
export type SetRoleParams = {
  holder: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'holder'
    type: 'address'
  }>
  role: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'role'
    type: 'uint256'
  }>
  active: AbiParameterToPrimitiveType<{
    internalType: 'bool'
    name: 'active'
    type: 'bool'
  }>
}

/**
 * Calls the "setRole" function on the contract.
 * @param options - The options for the "setRole" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setRole } from "TODO";
 *
 * const transaction = setRole({
 *  holder: ...,
 *  role: ...,
 *  active: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setRole(options: BaseTransactionOptions<SetRoleParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x5978cd29',
      [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'active',
          type: 'bool',
        },
      ],
      [],
    ],
    params: [options.holder, options.role, options.active],
  })
}

/**
 * Represents the parameters for the "setTokenKya" function.
 */
export type SetTokenKyaParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  Kya: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'Kya'
    type: 'string'
  }>
}

/**
 * Calls the "setTokenKya" function on the contract.
 * @param options - The options for the "setTokenKya" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setTokenKya } from "TODO";
 *
 * const transaction = setTokenKya({
 *  tokenId: ...,
 *  Kya: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setTokenKya(
  options: BaseTransactionOptions<SetTokenKyaParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x7ff3f351',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'Kya',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.tokenId, options.Kya],
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
 * Represents the parameters for the "updateTokenSlug" function.
 */
export type UpdateTokenSlugParams = {
  tokenId: AbiParameterToPrimitiveType<{
    internalType: 'uint256'
    name: 'tokenId'
    type: 'uint256'
  }>
  slug: AbiParameterToPrimitiveType<{
    internalType: 'string'
    name: 'slug'
    type: 'string'
  }>
}

/**
 * Calls the "updateTokenSlug" function on the contract.
 * @param options - The options for the "updateTokenSlug" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { updateTokenSlug } from "TODO";
 *
 * const transaction = updateTokenSlug({
 *  tokenId: ...,
 *  slug: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function updateTokenSlug(
  options: BaseTransactionOptions<UpdateTokenSlugParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x3d5d9782',
      [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'slug',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.tokenId, options.slug],
  })
}

/**
 * Represents the parameters for the "upgradeToAndCall" function.
 */
export type UpgradeToAndCallParams = {
  newImplementation: AbiParameterToPrimitiveType<{
    internalType: 'address'
    name: 'newImplementation'
    type: 'address'
  }>
  data: AbiParameterToPrimitiveType<{
    internalType: 'bytes'
    name: 'data'
    type: 'bytes'
  }>
}

/**
 * Calls the "upgradeToAndCall" function on the contract.
 * @param options - The options for the "upgradeToAndCall" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { upgradeToAndCall } from "TODO";
 *
 * const transaction = upgradeToAndCall({
 *  newImplementation: ...,
 *  data: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function upgradeToAndCall(
  options: BaseTransactionOptions<UpgradeToAndCallParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x4f1ef286',
      [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      [],
    ],
    params: [options.newImplementation, options.data],
  })
}
