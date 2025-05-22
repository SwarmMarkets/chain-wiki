export enum Roles {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

export enum AdditionalRoles {
  PREFERRED_ATTESTOR = 'preferred-attestor',
}

export type ExtendedRoles = Roles | AdditionalRoles
