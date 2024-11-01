import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  UUID: { input: string; output: string };
};

export type BaseMetricsType = {
  __typename?: "BaseMetricsType";
  repoCount: Scalars["Int"]["output"];
  unitCount: Scalars["Int"]["output"];
  unitNodeCount: Scalars["Int"]["output"];
  unitNodeEdgeCount: Scalars["Int"]["output"];
  userCount: Scalars["Int"]["output"];
};

export type CommitFilterInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  onlyTag?: Scalars["Boolean"]["input"];
  repoBranch: Scalars["String"]["input"];
};

export type CommitType = {
  __typename?: "CommitType";
  commit: Scalars["String"]["output"];
  summary: Scalars["String"]["output"];
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type CredentialsInput = {
  patToken: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  blockUser: NoneType;
  bulkUpdate: NoneType;
  createPermission: PermissionType;
  createRepo: RepoType;
  createUnit: UnitType;
  createUnitNodeEdge: UnitNodeEdgeType;
  createUser: UserType;
  deletePermission: NoneType;
  deleteRepo: NoneType;
  deleteUnit: NoneType;
  deleteUnitNodeEdge: NoneType;
  setStateUnitNodeInput: UnitNodeType;
  unblockUser: NoneType;
  updateLocalRepo: NoneType;
  updateRepo: RepoType;
  updateRepoCredentials: RepoType;
  updateUnit: UnitType;
  updateUnitEnv: NoneType;
  updateUnitNode: UnitNodeType;
  updateUnitSchema: NoneType;
  updateUnitsFirmware: NoneType;
  updateUser: UserType;
};

export type MutationBlockUserArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationCreatePermissionArgs = {
  permission: PermissionCreateInput;
};

export type MutationCreateRepoArgs = {
  repo: RepoCreateInput;
};

export type MutationCreateUnitArgs = {
  unit: UnitCreateInput;
};

export type MutationCreateUnitNodeEdgeArgs = {
  unitNodeEdge: UnitNodeEdgeCreateInput;
};

export type MutationCreateUserArgs = {
  user: UserCreateInput;
};

export type MutationDeletePermissionArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteRepoArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUnitArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUnitNodeEdgeArgs = {
  inputUuid: Scalars["UUID"]["input"];
  outputUuid: Scalars["UUID"]["input"];
};

export type MutationSetStateUnitNodeInputArgs = {
  unitNode: UnitNodeSetStateInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationUnblockUserArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateLocalRepoArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateRepoArgs = {
  repo: RepoUpdateInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateRepoCredentialsArgs = {
  data: CredentialsInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUnitArgs = {
  unit: UnitUpdateInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUnitEnvArgs = {
  envJsonStr: Scalars["String"]["input"];
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUnitNodeArgs = {
  unitNode: UnitNodeUpdateInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUnitSchemaArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUnitsFirmwareArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUserArgs = {
  user: UserUpdateInput;
};

export type NoneType = {
  __typename?: "NoneType";
  isNone: Scalars["Boolean"]["output"];
};

export enum OrderByDate {
  Asc = "asc",
  Desc = "desc",
}

export enum OrderByText {
  Asc = "asc",
  Desc = "desc",
}

export type PermissionCreateInput = {
  agentType: PermissionEntities;
  agentUuid: Scalars["UUID"]["input"];
  resourceType: PermissionEntities;
  resourceUuid: Scalars["UUID"]["input"];
};

export enum PermissionEntities {
  Repo = "REPO",
  Unit = "UNIT",
  UnitNode = "UNIT_NODE",
  User = "USER",
}

export type PermissionType = {
  __typename?: "PermissionType";
  agentType: PermissionEntities;
  agentUuid: Scalars["UUID"]["output"];
  resourceType: PermissionEntities;
  resourceUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export type Query = {
  __typename?: "Query";
  getBaseMetrics: BaseMetricsType;
  getBranchCommits: Array<CommitType>;
  getOutputUnitNodes: Array<UnitNodeOutputType>;
  getRepo: RepoType;
  getRepos: Array<RepoType>;
  getResourceAgents: Array<PermissionType>;
  getToken: Scalars["String"]["output"];
  getUnit: UnitType;
  getUnitCurrentSchema: Scalars["String"]["output"];
  getUnitEnv: Scalars["String"]["output"];
  getUnitNode: UnitNodeType;
  getUnitNodes: Array<UnitNodeType>;
  getUnits: Array<UnitType>;
  getUser: UserType;
  getUsers: Array<UserType>;
  getVerificationUser: Scalars["String"]["output"];
  getVersions: RepoVersionsType;
};

export type QueryGetBranchCommitsArgs = {
  filters: CommitFilterInput;
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetOutputUnitNodesArgs = {
  filters: UnitNodeEdgeOutputFilterInput;
};

export type QueryGetRepoArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetReposArgs = {
  filters: RepoFilterInput;
};

export type QueryGetResourceAgentsArgs = {
  data: ResourceInput;
};

export type QueryGetTokenArgs = {
  data: UserAuthInput;
};

export type QueryGetUnitArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUnitCurrentSchemaArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUnitEnvArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUnitNodeArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUnitNodesArgs = {
  filters: UnitNodeFilterInput;
};

export type QueryGetUnitsArgs = {
  filters: UnitFilterInput;
};

export type QueryGetUserArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUsersArgs = {
  filters: UserFilterInput;
};

export type QueryGetVersionsArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type RepoCreateInput = {
  credentials?: InputMaybe<CredentialsInput>;
  isPublicRepository: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  repoUrl: Scalars["String"]["input"];
  visibilityLevel: VisibilityLevel;
};

export type RepoFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPublicRepository?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type RepoType = {
  __typename?: "RepoType";
  branches: Array<Scalars["String"]["output"]>;
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  defaultBranch?: Maybe<Scalars["String"]["output"]>;
  defaultCommit?: Maybe<Scalars["String"]["output"]>;
  isAutoUpdateRepo: Scalars["Boolean"]["output"];
  isOnlyTagUpdate: Scalars["Boolean"]["output"];
  isPublicRepository: Scalars["Boolean"]["output"];
  lastUpdateDatetime: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  repoUrl: Scalars["String"]["output"];
  uuid: Scalars["UUID"]["output"];
  visibilityLevel: VisibilityLevel;
};

export type RepoUpdateInput = {
  defaultBranch?: InputMaybe<Scalars["String"]["input"]>;
  defaultCommit?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  isOnlyTagUpdate?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<VisibilityLevel>;
};

export type RepoVersionType = {
  __typename?: "RepoVersionType";
  commit: Scalars["String"]["output"];
  tag?: Maybe<Scalars["String"]["output"]>;
  unitCount: Scalars["Int"]["output"];
};

export type RepoVersionsType = {
  __typename?: "RepoVersionsType";
  unitCount: Scalars["Int"]["output"];
  versions: Array<RepoVersionType>;
};

export type ResourceInput = {
  resourceType: PermissionEntities;
  resourceUuid: Scalars["UUID"]["input"];
};

export type UnitCreateInput = {
  isAutoUpdateFromRepoUnit: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
  repoUuid: Scalars["UUID"]["input"];
  visibilityLevel: VisibilityLevel;
};

export type UnitFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  repoUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type UnitNodeEdgeCreateInput = {
  nodeInputUuid: Scalars["UUID"]["input"];
  nodeOutputUuid: Scalars["UUID"]["input"];
};

export type UnitNodeEdgeOutputFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByUnitName?: InputMaybe<OrderByText>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  unitNodeInputUuid: Scalars["UUID"]["input"];
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type UnitNodeEdgeType = {
  __typename?: "UnitNodeEdgeType";
  nodeInputUuid: Scalars["UUID"]["output"];
  nodeOutputUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export type UnitNodeFilterInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Array<UnitNodeTypeEnum>>;
  unitUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type UnitNodeOutputType = {
  __typename?: "UnitNodeOutputType";
  unit: UnitType;
  unitOutputNodes: Array<UnitNodeType>;
};

export type UnitNodeSetStateInput = {
  state?: InputMaybe<Scalars["String"]["input"]>;
};

export type UnitNodeType = {
  __typename?: "UnitNodeType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  isRewritableInput: Scalars["Boolean"]["output"];
  state?: Maybe<Scalars["String"]["output"]>;
  topicName: Scalars["String"]["output"];
  type: UnitNodeTypeEnum;
  unitUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
  visibilityLevel: VisibilityLevel;
};

export enum UnitNodeTypeEnum {
  Input = "INPUT",
  Output = "OUTPUT",
}

export type UnitNodeUpdateInput = {
  isRewritableInput?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<VisibilityLevel>;
};

export type UnitType = {
  __typename?: "UnitType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  currentCommitVersion?: Maybe<Scalars["String"]["output"]>;
  isAutoUpdateFromRepoUnit: Scalars["Boolean"]["output"];
  lastUpdateDatetime: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  outputUnitNodes: Array<UnitNodeType>;
  repoBranch?: Maybe<Scalars["String"]["output"]>;
  repoCommit?: Maybe<Scalars["String"]["output"]>;
  repoUuid: Scalars["UUID"]["output"];
  unitStateDict?: Maybe<Scalars["String"]["output"]>;
  uuid: Scalars["UUID"]["output"];
  visibilityLevel: VisibilityLevel;
};

export type UnitUpdateInput = {
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<VisibilityLevel>;
};

export type UserAuthInput = {
  credentials: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type UserCreateInput = {
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type UserFilterInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  role?: InputMaybe<Array<UserRole>>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Array<UserStatus>>;
};

export enum UserRole {
  Admin = "ADMIN",
  Bot = "BOT",
  User = "USER",
}

export enum UserStatus {
  Blocked = "BLOCKED",
  Unverified = "UNVERIFIED",
  Verified = "VERIFIED",
}

export type UserType = {
  __typename?: "UserType";
  createDatetime: Scalars["DateTime"]["output"];
  login: Scalars["String"]["output"];
  role: UserRole;
  status: UserStatus;
  uuid: Scalars["UUID"]["output"];
};

export type UserUpdateInput = {
  login?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export enum VisibilityLevel {
  Internal = "INTERNAL",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type CreatePermissionMutationVariables = Exact<{
  agentUuid: Scalars["UUID"]["input"];
  agentType: PermissionEntities;
  resourceUuid: Scalars["UUID"]["input"];
  resourceType: PermissionEntities;
}>;

export type CreatePermissionMutation = {
  __typename?: "Mutation";
  createPermission: {
    __typename?: "PermissionType";
    uuid: string;
    agentUuid: string;
    agentType: PermissionEntities;
    resourceUuid: string;
    resourceType: PermissionEntities;
  };
};

export type DeletePermissionMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type DeletePermissionMutation = {
  __typename?: "Mutation";
  deletePermission: { __typename?: "NoneType"; isNone: boolean };
};

export type CreateRepoMutationVariables = Exact<{
  visibilityLevel: VisibilityLevel;
  name: Scalars["String"]["input"];
  repoUrl: Scalars["String"]["input"];
  isPublicRepository: Scalars["Boolean"]["input"];
  credentials?: InputMaybe<CredentialsInput>;
}>;

export type CreateRepoMutation = {
  __typename?: "Mutation";
  createRepo: {
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    repoUrl: string;
    isPublicRepository: boolean;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    lastUpdateDatetime: string;
    branches: Array<string>;
    creatorUuid: string;
  };
};

export type UpdateRepoMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  visibilityLevel?: InputMaybe<VisibilityLevel>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  defaultBranch?: InputMaybe<Scalars["String"]["input"]>;
  defaultCommit?: InputMaybe<Scalars["String"]["input"]>;
  isOnlyTagUpdate?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateRepoMutation = {
  __typename?: "Mutation";
  updateRepo: {
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    repoUrl: string;
    isPublicRepository: boolean;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    lastUpdateDatetime: string;
    branches: Array<string>;
    creatorUuid: string;
  };
};

export type UpdateRepoCredentialsMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  data: CredentialsInput;
}>;

export type UpdateRepoCredentialsMutation = {
  __typename?: "Mutation";
  updateRepoCredentials: {
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    repoUrl: string;
    isPublicRepository: boolean;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    lastUpdateDatetime: string;
    branches: Array<string>;
    creatorUuid: string;
  };
};

export type UpdateLocalRepoMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UpdateLocalRepoMutation = {
  __typename?: "Mutation";
  updateLocalRepo: { __typename?: "NoneType"; isNone: boolean };
};

export type UpdateUnitsFirmwareMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UpdateUnitsFirmwareMutation = {
  __typename?: "Mutation";
  updateUnitsFirmware: { __typename?: "NoneType"; isNone: boolean };
};

export type DeleteRepoMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type DeleteRepoMutation = {
  __typename?: "Mutation";
  deleteRepo: { __typename?: "NoneType"; isNone: boolean };
};

export type BulkUpdateMutationVariables = Exact<{ [key: string]: never }>;

export type BulkUpdateMutation = {
  __typename?: "Mutation";
  bulkUpdate: { __typename?: "NoneType"; isNone: boolean };
};

export type CreateUnitMutationVariables = Exact<{
  repoUuid: Scalars["UUID"]["input"];
  visibilityLevel: VisibilityLevel;
  name: Scalars["String"]["input"];
  isAutoUpdateFromRepoUnit: Scalars["Boolean"]["input"];
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CreateUnitMutation = {
  __typename?: "Mutation";
  createUnit: {
    __typename?: "UnitType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    repoBranch?: string | null;
    repoCommit?: string | null;
    unitStateDict?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
  };
};

export type UpdateUnitMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  visibilityLevel?: InputMaybe<VisibilityLevel>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateUnitMutation = {
  __typename?: "Mutation";
  updateUnit: {
    __typename?: "UnitType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    repoBranch?: string | null;
    repoCommit?: string | null;
    unitStateDict?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
  };
};

export type DeleteUnitMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type DeleteUnitMutation = {
  __typename?: "Mutation";
  deleteUnit: { __typename?: "NoneType"; isNone: boolean };
};

export type UpdateUnitEnvMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  envJsonStr: Scalars["String"]["input"];
}>;

export type UpdateUnitEnvMutation = {
  __typename?: "Mutation";
  updateUnitEnv: { __typename?: "NoneType"; isNone: boolean };
};

export type UpdateUnitNodeMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  visibilityLevel?: InputMaybe<VisibilityLevel>;
  isRewritableInput?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateUnitNodeMutation = {
  __typename?: "Mutation";
  updateUnitNode: {
    __typename?: "UnitNodeType";
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    state?: string | null;
    unitUuid: string;
  };
};

export type SetStateUnitNodeInputMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  state: Scalars["String"]["input"];
}>;

export type SetStateUnitNodeInputMutation = {
  __typename?: "Mutation";
  setStateUnitNodeInput: {
    __typename?: "UnitNodeType";
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    state?: string | null;
    unitUuid: string;
  };
};

export type CreateUnitNodeEdgeMutationVariables = Exact<{
  nodeOutputUuid: Scalars["UUID"]["input"];
  nodeInputUuid: Scalars["UUID"]["input"];
}>;

export type CreateUnitNodeEdgeMutation = {
  __typename?: "Mutation";
  createUnitNodeEdge: {
    __typename?: "UnitNodeEdgeType";
    uuid: string;
    nodeOutputUuid: string;
    nodeInputUuid: string;
  };
};

export type DeleteUnitNodeEdgeMutationVariables = Exact<{
  inputUuid: Scalars["UUID"]["input"];
  outputUuid: Scalars["UUID"]["input"];
}>;

export type DeleteUnitNodeEdgeMutation = {
  __typename?: "Mutation";
  deleteUnitNodeEdge: { __typename?: "NoneType"; isNone: boolean };
};

export type CreateUserMutationVariables = Exact<{
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "UserType";
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    createDatetime: string;
  };
};

export type UpdateUserMutationVariables = Exact<{
  login?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "UserType";
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    createDatetime: string;
  };
};

export type BlockUserMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type BlockUserMutation = {
  __typename?: "Mutation";
  blockUser: { __typename?: "NoneType"; isNone: boolean };
};

export type UnblockUserMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UnblockUserMutation = {
  __typename?: "Mutation";
  unblockUser: { __typename?: "NoneType"; isNone: boolean };
};

export type GetBaseMetricsQueryVariables = Exact<{ [key: string]: never }>;

export type GetBaseMetricsQuery = {
  __typename?: "Query";
  getBaseMetrics: {
    __typename?: "BaseMetricsType";
    userCount: number;
    repoCount: number;
    unitCount: number;
    unitNodeCount: number;
    unitNodeEdgeCount: number;
  };
};

export type GetResourceAgentsQueryVariables = Exact<{
  resourceUuid: Scalars["UUID"]["input"];
  resourceType: PermissionEntities;
}>;

export type GetResourceAgentsQuery = {
  __typename?: "Query";
  getResourceAgents: Array<{
    __typename?: "PermissionType";
    uuid: string;
    agentUuid: string;
    agentType: PermissionEntities;
    resourceUuid: string;
    resourceType: PermissionEntities;
  }>;
};

export type GetRepoQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetRepoQuery = {
  __typename?: "Query";
  getRepo: {
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    repoUrl: string;
    isPublicRepository: boolean;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    lastUpdateDatetime: string;
    branches: Array<string>;
    creatorUuid: string;
  };
};

export type GetReposQueryVariables = Exact<{
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isPublicRepository?: InputMaybe<Scalars["Boolean"]["input"]>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetReposQuery = {
  __typename?: "Query";
  getRepos: Array<{
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    repoUrl: string;
    isPublicRepository: boolean;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    lastUpdateDatetime: string;
    branches: Array<string>;
    creatorUuid: string;
  }>;
};

export type GetBranchCommitsQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  repoBranch: Scalars["String"]["input"];
  onlyTag: Scalars["Boolean"]["input"];
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetBranchCommitsQuery = {
  __typename?: "Query";
  getBranchCommits: Array<{
    __typename?: "CommitType";
    commit: string;
    summary: string;
    tag?: string | null;
  }>;
};

export type GetVersionsQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetVersionsQuery = {
  __typename?: "Query";
  getVersions: {
    __typename?: "RepoVersionsType";
    unitCount: number;
    versions: Array<{
      __typename?: "RepoVersionType";
      commit: string;
      unitCount: number;
      tag?: string | null;
    }>;
  };
};

export type GetUnitQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetUnitQuery = {
  __typename?: "Query";
  getUnit: {
    __typename?: "UnitType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    repoBranch?: string | null;
    repoCommit?: string | null;
    unitStateDict?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
  };
};

export type GetUnitsQueryVariables = Exact<{
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  repoUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUnitsQuery = {
  __typename?: "Query";
  getUnits: Array<{
    __typename?: "UnitType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    repoBranch?: string | null;
    repoCommit?: string | null;
    unitStateDict?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
  }>;
};

export type GetUnitsWithOutputQueryVariables = Exact<{
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  repoUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUnitsWithOutputQuery = {
  __typename?: "Query";
  getUnits: Array<{
    __typename?: "UnitType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    repoBranch?: string | null;
    repoCommit?: string | null;
    unitStateDict?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    outputUnitNodes: Array<{
      __typename?: "UnitNodeType";
      uuid: string;
      type: UnitNodeTypeEnum;
      visibilityLevel: VisibilityLevel;
      isRewritableInput: boolean;
      topicName: string;
      createDatetime: string;
      state?: string | null;
      unitUuid: string;
      creatorUuid: string;
    }>;
  }>;
};

export type GetUnitEnvQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetUnitEnvQuery = { __typename?: "Query"; getUnitEnv: string };

export type GetUnitNodeQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetUnitNodeQuery = {
  __typename?: "Query";
  getUnitNode: {
    __typename?: "UnitNodeType";
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    state?: string | null;
    unitUuid: string;
  };
};

export type GetUnitNodesQueryVariables = Exact<{
  unitUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Array<UnitNodeTypeEnum> | UnitNodeTypeEnum>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUnitNodesQuery = {
  __typename?: "Query";
  getUnitNodes: Array<{
    __typename?: "UnitNodeType";
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    state?: string | null;
    unitUuid: string;
  }>;
};

export type GetOutputUnitNodesQueryVariables = Exact<{
  unitNodeInputUuid: Scalars["UUID"]["input"];
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByUnitName?: InputMaybe<OrderByText>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetOutputUnitNodesQuery = {
  __typename?: "Query";
  getOutputUnitNodes: Array<{
    __typename?: "UnitNodeOutputType";
    unit: {
      __typename?: "UnitType";
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      repoBranch?: string | null;
      repoCommit?: string | null;
      unitStateDict?: string | null;
      currentCommitVersion?: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
    };
    unitOutputNodes: Array<{
      __typename?: "UnitNodeType";
      uuid: string;
      type: UnitNodeTypeEnum;
      visibilityLevel: VisibilityLevel;
      isRewritableInput: boolean;
      topicName: string;
      state?: string | null;
      unitUuid: string;
    }>;
  }>;
};

export type GetTokenQueryVariables = Exact<{
  credentials: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type GetTokenQuery = { __typename?: "Query"; getToken: string };

export type GetUserQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser: {
    __typename?: "UserType";
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    createDatetime: string;
  };
};

export type GetUsersQueryVariables = Exact<{
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Array<UserRole> | UserRole>;
  status?: InputMaybe<Array<UserStatus> | UserStatus>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: Array<{
    __typename?: "UserType";
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    createDatetime: string;
  }>;
};

export type GetVerificationUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetVerificationUserQuery = {
  __typename?: "Query";
  getVerificationUser: string;
};

export const CreatePermissionDocument = gql`
  mutation createPermission(
    $agentUuid: UUID!
    $agentType: PermissionEntities!
    $resourceUuid: UUID!
    $resourceType: PermissionEntities!
  ) {
    createPermission(
      permission: {
        agentUuid: $agentUuid
        agentType: $agentType
        resourceUuid: $resourceUuid
        resourceType: $resourceType
      }
    ) {
      uuid
      agentUuid
      agentType
      resourceUuid
      resourceType
    }
  }
`;
export type CreatePermissionMutationFn = Apollo.MutationFunction<
  CreatePermissionMutation,
  CreatePermissionMutationVariables
>;

/**
 * __useCreatePermissionMutation__
 *
 * To run a mutation, you first call `useCreatePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPermissionMutation, { data, loading, error }] = useCreatePermissionMutation({
 *   variables: {
 *      agentUuid: // value for 'agentUuid'
 *      agentType: // value for 'agentType'
 *      resourceUuid: // value for 'resourceUuid'
 *      resourceType: // value for 'resourceType'
 *   },
 * });
 */
export function useCreatePermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePermissionMutation,
    CreatePermissionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePermissionMutation,
    CreatePermissionMutationVariables
  >(CreatePermissionDocument, options);
}
export type CreatePermissionMutationHookResult = ReturnType<
  typeof useCreatePermissionMutation
>;
export type CreatePermissionMutationResult =
  Apollo.MutationResult<CreatePermissionMutation>;
export type CreatePermissionMutationOptions = Apollo.BaseMutationOptions<
  CreatePermissionMutation,
  CreatePermissionMutationVariables
>;
export const DeletePermissionDocument = gql`
  mutation deletePermission($uuid: UUID!) {
    deletePermission(uuid: $uuid) {
      isNone
    }
  }
`;
export type DeletePermissionMutationFn = Apollo.MutationFunction<
  DeletePermissionMutation,
  DeletePermissionMutationVariables
>;

/**
 * __useDeletePermissionMutation__
 *
 * To run a mutation, you first call `useDeletePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePermissionMutation, { data, loading, error }] = useDeletePermissionMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeletePermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePermissionMutation,
    DeletePermissionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeletePermissionMutation,
    DeletePermissionMutationVariables
  >(DeletePermissionDocument, options);
}
export type DeletePermissionMutationHookResult = ReturnType<
  typeof useDeletePermissionMutation
>;
export type DeletePermissionMutationResult =
  Apollo.MutationResult<DeletePermissionMutation>;
export type DeletePermissionMutationOptions = Apollo.BaseMutationOptions<
  DeletePermissionMutation,
  DeletePermissionMutationVariables
>;
export const CreateRepoDocument = gql`
  mutation createRepo(
    $visibilityLevel: VisibilityLevel!
    $name: String!
    $repoUrl: String!
    $isPublicRepository: Boolean!
    $credentials: CredentialsInput
  ) {
    createRepo(
      repo: {
        visibilityLevel: $visibilityLevel
        name: $name
        repoUrl: $repoUrl
        isPublicRepository: $isPublicRepository
        credentials: $credentials
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      repoUrl
      isPublicRepository
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      lastUpdateDatetime
      branches
      creatorUuid
    }
  }
`;
export type CreateRepoMutationFn = Apollo.MutationFunction<
  CreateRepoMutation,
  CreateRepoMutationVariables
>;

/**
 * __useCreateRepoMutation__
 *
 * To run a mutation, you first call `useCreateRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRepoMutation, { data, loading, error }] = useCreateRepoMutation({
 *   variables: {
 *      visibilityLevel: // value for 'visibilityLevel'
 *      name: // value for 'name'
 *      repoUrl: // value for 'repoUrl'
 *      isPublicRepository: // value for 'isPublicRepository'
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useCreateRepoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRepoMutation,
    CreateRepoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRepoMutation, CreateRepoMutationVariables>(
    CreateRepoDocument,
    options,
  );
}
export type CreateRepoMutationHookResult = ReturnType<
  typeof useCreateRepoMutation
>;
export type CreateRepoMutationResult =
  Apollo.MutationResult<CreateRepoMutation>;
export type CreateRepoMutationOptions = Apollo.BaseMutationOptions<
  CreateRepoMutation,
  CreateRepoMutationVariables
>;
export const UpdateRepoDocument = gql`
  mutation updateRepo(
    $uuid: UUID!
    $visibilityLevel: VisibilityLevel
    $name: String
    $isAutoUpdateRepo: Boolean
    $defaultBranch: String
    $defaultCommit: String
    $isOnlyTagUpdate: Boolean
  ) {
    updateRepo(
      uuid: $uuid
      repo: {
        visibilityLevel: $visibilityLevel
        name: $name
        isAutoUpdateRepo: $isAutoUpdateRepo
        defaultBranch: $defaultBranch
        defaultCommit: $defaultCommit
        isOnlyTagUpdate: $isOnlyTagUpdate
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      repoUrl
      isPublicRepository
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      lastUpdateDatetime
      branches
      creatorUuid
    }
  }
`;
export type UpdateRepoMutationFn = Apollo.MutationFunction<
  UpdateRepoMutation,
  UpdateRepoMutationVariables
>;

/**
 * __useUpdateRepoMutation__
 *
 * To run a mutation, you first call `useUpdateRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRepoMutation, { data, loading, error }] = useUpdateRepoMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      name: // value for 'name'
 *      isAutoUpdateRepo: // value for 'isAutoUpdateRepo'
 *      defaultBranch: // value for 'defaultBranch'
 *      defaultCommit: // value for 'defaultCommit'
 *      isOnlyTagUpdate: // value for 'isOnlyTagUpdate'
 *   },
 * });
 */
export function useUpdateRepoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRepoMutation,
    UpdateRepoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRepoMutation, UpdateRepoMutationVariables>(
    UpdateRepoDocument,
    options,
  );
}
export type UpdateRepoMutationHookResult = ReturnType<
  typeof useUpdateRepoMutation
>;
export type UpdateRepoMutationResult =
  Apollo.MutationResult<UpdateRepoMutation>;
export type UpdateRepoMutationOptions = Apollo.BaseMutationOptions<
  UpdateRepoMutation,
  UpdateRepoMutationVariables
>;
export const UpdateRepoCredentialsDocument = gql`
  mutation updateRepoCredentials($uuid: UUID!, $data: CredentialsInput!) {
    updateRepoCredentials(uuid: $uuid, data: $data) {
      uuid
      visibilityLevel
      name
      createDatetime
      repoUrl
      isPublicRepository
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      lastUpdateDatetime
      branches
      creatorUuid
    }
  }
`;
export type UpdateRepoCredentialsMutationFn = Apollo.MutationFunction<
  UpdateRepoCredentialsMutation,
  UpdateRepoCredentialsMutationVariables
>;

/**
 * __useUpdateRepoCredentialsMutation__
 *
 * To run a mutation, you first call `useUpdateRepoCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRepoCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRepoCredentialsMutation, { data, loading, error }] = useUpdateRepoCredentialsMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRepoCredentialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRepoCredentialsMutation,
    UpdateRepoCredentialsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRepoCredentialsMutation,
    UpdateRepoCredentialsMutationVariables
  >(UpdateRepoCredentialsDocument, options);
}
export type UpdateRepoCredentialsMutationHookResult = ReturnType<
  typeof useUpdateRepoCredentialsMutation
>;
export type UpdateRepoCredentialsMutationResult =
  Apollo.MutationResult<UpdateRepoCredentialsMutation>;
export type UpdateRepoCredentialsMutationOptions = Apollo.BaseMutationOptions<
  UpdateRepoCredentialsMutation,
  UpdateRepoCredentialsMutationVariables
>;
export const UpdateLocalRepoDocument = gql`
  mutation updateLocalRepo($uuid: UUID!) {
    updateLocalRepo(uuid: $uuid) {
      isNone
    }
  }
`;
export type UpdateLocalRepoMutationFn = Apollo.MutationFunction<
  UpdateLocalRepoMutation,
  UpdateLocalRepoMutationVariables
>;

/**
 * __useUpdateLocalRepoMutation__
 *
 * To run a mutation, you first call `useUpdateLocalRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocalRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocalRepoMutation, { data, loading, error }] = useUpdateLocalRepoMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUpdateLocalRepoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLocalRepoMutation,
    UpdateLocalRepoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateLocalRepoMutation,
    UpdateLocalRepoMutationVariables
  >(UpdateLocalRepoDocument, options);
}
export type UpdateLocalRepoMutationHookResult = ReturnType<
  typeof useUpdateLocalRepoMutation
>;
export type UpdateLocalRepoMutationResult =
  Apollo.MutationResult<UpdateLocalRepoMutation>;
export type UpdateLocalRepoMutationOptions = Apollo.BaseMutationOptions<
  UpdateLocalRepoMutation,
  UpdateLocalRepoMutationVariables
>;
export const UpdateUnitsFirmwareDocument = gql`
  mutation updateUnitsFirmware($uuid: UUID!) {
    updateUnitsFirmware(uuid: $uuid) {
      isNone
    }
  }
`;
export type UpdateUnitsFirmwareMutationFn = Apollo.MutationFunction<
  UpdateUnitsFirmwareMutation,
  UpdateUnitsFirmwareMutationVariables
>;

/**
 * __useUpdateUnitsFirmwareMutation__
 *
 * To run a mutation, you first call `useUpdateUnitsFirmwareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnitsFirmwareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnitsFirmwareMutation, { data, loading, error }] = useUpdateUnitsFirmwareMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUpdateUnitsFirmwareMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUnitsFirmwareMutation,
    UpdateUnitsFirmwareMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUnitsFirmwareMutation,
    UpdateUnitsFirmwareMutationVariables
  >(UpdateUnitsFirmwareDocument, options);
}
export type UpdateUnitsFirmwareMutationHookResult = ReturnType<
  typeof useUpdateUnitsFirmwareMutation
>;
export type UpdateUnitsFirmwareMutationResult =
  Apollo.MutationResult<UpdateUnitsFirmwareMutation>;
export type UpdateUnitsFirmwareMutationOptions = Apollo.BaseMutationOptions<
  UpdateUnitsFirmwareMutation,
  UpdateUnitsFirmwareMutationVariables
>;
export const DeleteRepoDocument = gql`
  mutation deleteRepo($uuid: UUID!) {
    deleteRepo(uuid: $uuid) {
      isNone
    }
  }
`;
export type DeleteRepoMutationFn = Apollo.MutationFunction<
  DeleteRepoMutation,
  DeleteRepoMutationVariables
>;

/**
 * __useDeleteRepoMutation__
 *
 * To run a mutation, you first call `useDeleteRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRepoMutation, { data, loading, error }] = useDeleteRepoMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteRepoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRepoMutation,
    DeleteRepoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteRepoMutation, DeleteRepoMutationVariables>(
    DeleteRepoDocument,
    options,
  );
}
export type DeleteRepoMutationHookResult = ReturnType<
  typeof useDeleteRepoMutation
>;
export type DeleteRepoMutationResult =
  Apollo.MutationResult<DeleteRepoMutation>;
export type DeleteRepoMutationOptions = Apollo.BaseMutationOptions<
  DeleteRepoMutation,
  DeleteRepoMutationVariables
>;
export const BulkUpdateDocument = gql`
  mutation bulkUpdate {
    bulkUpdate {
      isNone
    }
  }
`;
export type BulkUpdateMutationFn = Apollo.MutationFunction<
  BulkUpdateMutation,
  BulkUpdateMutationVariables
>;

/**
 * __useBulkUpdateMutation__
 *
 * To run a mutation, you first call `useBulkUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkUpdateMutation, { data, loading, error }] = useBulkUpdateMutation({
 *   variables: {
 *   },
 * });
 */
export function useBulkUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BulkUpdateMutation,
    BulkUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BulkUpdateMutation, BulkUpdateMutationVariables>(
    BulkUpdateDocument,
    options,
  );
}
export type BulkUpdateMutationHookResult = ReturnType<
  typeof useBulkUpdateMutation
>;
export type BulkUpdateMutationResult =
  Apollo.MutationResult<BulkUpdateMutation>;
export type BulkUpdateMutationOptions = Apollo.BaseMutationOptions<
  BulkUpdateMutation,
  BulkUpdateMutationVariables
>;
export const CreateUnitDocument = gql`
  mutation createUnit(
    $repoUuid: UUID!
    $visibilityLevel: VisibilityLevel!
    $name: String!
    $isAutoUpdateFromRepoUnit: Boolean!
    $repoBranch: String
    $repoCommit: String
  ) {
    createUnit(
      unit: {
        repoUuid: $repoUuid
        visibilityLevel: $visibilityLevel
        name: $name
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        repoBranch: $repoBranch
        repoCommit: $repoCommit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      repoBranch
      repoCommit
      unitStateDict
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
    }
  }
`;
export type CreateUnitMutationFn = Apollo.MutationFunction<
  CreateUnitMutation,
  CreateUnitMutationVariables
>;

/**
 * __useCreateUnitMutation__
 *
 * To run a mutation, you first call `useCreateUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnitMutation, { data, loading, error }] = useCreateUnitMutation({
 *   variables: {
 *      repoUuid: // value for 'repoUuid'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      name: // value for 'name'
 *      isAutoUpdateFromRepoUnit: // value for 'isAutoUpdateFromRepoUnit'
 *      repoBranch: // value for 'repoBranch'
 *      repoCommit: // value for 'repoCommit'
 *   },
 * });
 */
export function useCreateUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUnitMutation,
    CreateUnitMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUnitMutation, CreateUnitMutationVariables>(
    CreateUnitDocument,
    options,
  );
}
export type CreateUnitMutationHookResult = ReturnType<
  typeof useCreateUnitMutation
>;
export type CreateUnitMutationResult =
  Apollo.MutationResult<CreateUnitMutation>;
export type CreateUnitMutationOptions = Apollo.BaseMutationOptions<
  CreateUnitMutation,
  CreateUnitMutationVariables
>;
export const UpdateUnitDocument = gql`
  mutation updateUnit(
    $uuid: UUID!
    $visibilityLevel: VisibilityLevel
    $name: String
    $isAutoUpdateFromRepoUnit: Boolean
    $repoBranch: String
    $repoCommit: String
  ) {
    updateUnit(
      uuid: $uuid
      unit: {
        visibilityLevel: $visibilityLevel
        name: $name
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        repoBranch: $repoBranch
        repoCommit: $repoCommit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      repoBranch
      repoCommit
      unitStateDict
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
    }
  }
`;
export type UpdateUnitMutationFn = Apollo.MutationFunction<
  UpdateUnitMutation,
  UpdateUnitMutationVariables
>;

/**
 * __useUpdateUnitMutation__
 *
 * To run a mutation, you first call `useUpdateUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnitMutation, { data, loading, error }] = useUpdateUnitMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      name: // value for 'name'
 *      isAutoUpdateFromRepoUnit: // value for 'isAutoUpdateFromRepoUnit'
 *      repoBranch: // value for 'repoBranch'
 *      repoCommit: // value for 'repoCommit'
 *   },
 * });
 */
export function useUpdateUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUnitMutation,
    UpdateUnitMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUnitMutation, UpdateUnitMutationVariables>(
    UpdateUnitDocument,
    options,
  );
}
export type UpdateUnitMutationHookResult = ReturnType<
  typeof useUpdateUnitMutation
>;
export type UpdateUnitMutationResult =
  Apollo.MutationResult<UpdateUnitMutation>;
export type UpdateUnitMutationOptions = Apollo.BaseMutationOptions<
  UpdateUnitMutation,
  UpdateUnitMutationVariables
>;
export const DeleteUnitDocument = gql`
  mutation deleteUnit($uuid: UUID!) {
    deleteUnit(uuid: $uuid) {
      isNone
    }
  }
`;
export type DeleteUnitMutationFn = Apollo.MutationFunction<
  DeleteUnitMutation,
  DeleteUnitMutationVariables
>;

/**
 * __useDeleteUnitMutation__
 *
 * To run a mutation, you first call `useDeleteUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUnitMutation, { data, loading, error }] = useDeleteUnitMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUnitMutation,
    DeleteUnitMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUnitMutation, DeleteUnitMutationVariables>(
    DeleteUnitDocument,
    options,
  );
}
export type DeleteUnitMutationHookResult = ReturnType<
  typeof useDeleteUnitMutation
>;
export type DeleteUnitMutationResult =
  Apollo.MutationResult<DeleteUnitMutation>;
export type DeleteUnitMutationOptions = Apollo.BaseMutationOptions<
  DeleteUnitMutation,
  DeleteUnitMutationVariables
>;
export const UpdateUnitEnvDocument = gql`
  mutation updateUnitEnv($uuid: UUID!, $envJsonStr: String!) {
    updateUnitEnv(uuid: $uuid, envJsonStr: $envJsonStr) {
      isNone
    }
  }
`;
export type UpdateUnitEnvMutationFn = Apollo.MutationFunction<
  UpdateUnitEnvMutation,
  UpdateUnitEnvMutationVariables
>;

/**
 * __useUpdateUnitEnvMutation__
 *
 * To run a mutation, you first call `useUpdateUnitEnvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnitEnvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnitEnvMutation, { data, loading, error }] = useUpdateUnitEnvMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      envJsonStr: // value for 'envJsonStr'
 *   },
 * });
 */
export function useUpdateUnitEnvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUnitEnvMutation,
    UpdateUnitEnvMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUnitEnvMutation,
    UpdateUnitEnvMutationVariables
  >(UpdateUnitEnvDocument, options);
}
export type UpdateUnitEnvMutationHookResult = ReturnType<
  typeof useUpdateUnitEnvMutation
>;
export type UpdateUnitEnvMutationResult =
  Apollo.MutationResult<UpdateUnitEnvMutation>;
export type UpdateUnitEnvMutationOptions = Apollo.BaseMutationOptions<
  UpdateUnitEnvMutation,
  UpdateUnitEnvMutationVariables
>;
export const UpdateUnitNodeDocument = gql`
  mutation updateUnitNode(
    $uuid: UUID!
    $visibilityLevel: VisibilityLevel
    $isRewritableInput: Boolean
  ) {
    updateUnitNode(
      uuid: $uuid
      unitNode: {
        visibilityLevel: $visibilityLevel
        isRewritableInput: $isRewritableInput
      }
    ) {
      uuid
      type
      visibilityLevel
      isRewritableInput
      topicName
      state
      unitUuid
    }
  }
`;
export type UpdateUnitNodeMutationFn = Apollo.MutationFunction<
  UpdateUnitNodeMutation,
  UpdateUnitNodeMutationVariables
>;

/**
 * __useUpdateUnitNodeMutation__
 *
 * To run a mutation, you first call `useUpdateUnitNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnitNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnitNodeMutation, { data, loading, error }] = useUpdateUnitNodeMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      isRewritableInput: // value for 'isRewritableInput'
 *   },
 * });
 */
export function useUpdateUnitNodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUnitNodeMutation,
    UpdateUnitNodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUnitNodeMutation,
    UpdateUnitNodeMutationVariables
  >(UpdateUnitNodeDocument, options);
}
export type UpdateUnitNodeMutationHookResult = ReturnType<
  typeof useUpdateUnitNodeMutation
>;
export type UpdateUnitNodeMutationResult =
  Apollo.MutationResult<UpdateUnitNodeMutation>;
export type UpdateUnitNodeMutationOptions = Apollo.BaseMutationOptions<
  UpdateUnitNodeMutation,
  UpdateUnitNodeMutationVariables
>;
export const SetStateUnitNodeInputDocument = gql`
  mutation setStateUnitNodeInput($uuid: UUID!, $state: String!) {
    setStateUnitNodeInput(uuid: $uuid, unitNode: { state: $state }) {
      uuid
      type
      visibilityLevel
      isRewritableInput
      topicName
      state
      unitUuid
    }
  }
`;
export type SetStateUnitNodeInputMutationFn = Apollo.MutationFunction<
  SetStateUnitNodeInputMutation,
  SetStateUnitNodeInputMutationVariables
>;

/**
 * __useSetStateUnitNodeInputMutation__
 *
 * To run a mutation, you first call `useSetStateUnitNodeInputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStateUnitNodeInputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStateUnitNodeInputMutation, { data, loading, error }] = useSetStateUnitNodeInputMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useSetStateUnitNodeInputMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetStateUnitNodeInputMutation,
    SetStateUnitNodeInputMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetStateUnitNodeInputMutation,
    SetStateUnitNodeInputMutationVariables
  >(SetStateUnitNodeInputDocument, options);
}
export type SetStateUnitNodeInputMutationHookResult = ReturnType<
  typeof useSetStateUnitNodeInputMutation
>;
export type SetStateUnitNodeInputMutationResult =
  Apollo.MutationResult<SetStateUnitNodeInputMutation>;
export type SetStateUnitNodeInputMutationOptions = Apollo.BaseMutationOptions<
  SetStateUnitNodeInputMutation,
  SetStateUnitNodeInputMutationVariables
>;
export const CreateUnitNodeEdgeDocument = gql`
  mutation createUnitNodeEdge($nodeOutputUuid: UUID!, $nodeInputUuid: UUID!) {
    createUnitNodeEdge(
      unitNodeEdge: {
        nodeOutputUuid: $nodeOutputUuid
        nodeInputUuid: $nodeInputUuid
      }
    ) {
      uuid
      nodeOutputUuid
      nodeInputUuid
    }
  }
`;
export type CreateUnitNodeEdgeMutationFn = Apollo.MutationFunction<
  CreateUnitNodeEdgeMutation,
  CreateUnitNodeEdgeMutationVariables
>;

/**
 * __useCreateUnitNodeEdgeMutation__
 *
 * To run a mutation, you first call `useCreateUnitNodeEdgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnitNodeEdgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnitNodeEdgeMutation, { data, loading, error }] = useCreateUnitNodeEdgeMutation({
 *   variables: {
 *      nodeOutputUuid: // value for 'nodeOutputUuid'
 *      nodeInputUuid: // value for 'nodeInputUuid'
 *   },
 * });
 */
export function useCreateUnitNodeEdgeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUnitNodeEdgeMutation,
    CreateUnitNodeEdgeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUnitNodeEdgeMutation,
    CreateUnitNodeEdgeMutationVariables
  >(CreateUnitNodeEdgeDocument, options);
}
export type CreateUnitNodeEdgeMutationHookResult = ReturnType<
  typeof useCreateUnitNodeEdgeMutation
>;
export type CreateUnitNodeEdgeMutationResult =
  Apollo.MutationResult<CreateUnitNodeEdgeMutation>;
export type CreateUnitNodeEdgeMutationOptions = Apollo.BaseMutationOptions<
  CreateUnitNodeEdgeMutation,
  CreateUnitNodeEdgeMutationVariables
>;
export const DeleteUnitNodeEdgeDocument = gql`
  mutation deleteUnitNodeEdge($inputUuid: UUID!, $outputUuid: UUID!) {
    deleteUnitNodeEdge(inputUuid: $inputUuid, outputUuid: $outputUuid) {
      isNone
    }
  }
`;
export type DeleteUnitNodeEdgeMutationFn = Apollo.MutationFunction<
  DeleteUnitNodeEdgeMutation,
  DeleteUnitNodeEdgeMutationVariables
>;

/**
 * __useDeleteUnitNodeEdgeMutation__
 *
 * To run a mutation, you first call `useDeleteUnitNodeEdgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUnitNodeEdgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUnitNodeEdgeMutation, { data, loading, error }] = useDeleteUnitNodeEdgeMutation({
 *   variables: {
 *      inputUuid: // value for 'inputUuid'
 *      outputUuid: // value for 'outputUuid'
 *   },
 * });
 */
export function useDeleteUnitNodeEdgeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUnitNodeEdgeMutation,
    DeleteUnitNodeEdgeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUnitNodeEdgeMutation,
    DeleteUnitNodeEdgeMutationVariables
  >(DeleteUnitNodeEdgeDocument, options);
}
export type DeleteUnitNodeEdgeMutationHookResult = ReturnType<
  typeof useDeleteUnitNodeEdgeMutation
>;
export type DeleteUnitNodeEdgeMutationResult =
  Apollo.MutationResult<DeleteUnitNodeEdgeMutation>;
export type DeleteUnitNodeEdgeMutationOptions = Apollo.BaseMutationOptions<
  DeleteUnitNodeEdgeMutation,
  DeleteUnitNodeEdgeMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($login: String!, $password: String!) {
    createUser(user: { login: $login, password: $password }) {
      uuid
      role
      status
      login
      createDatetime
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($login: String, $password: String) {
    updateUser(user: { login: $login, password: $password }) {
      uuid
      role
      status
      login
      createDatetime
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const BlockUserDocument = gql`
  mutation blockUser($uuid: UUID!) {
    blockUser(uuid: $uuid) {
      isNone
    }
  }
`;
export type BlockUserMutationFn = Apollo.MutationFunction<
  BlockUserMutation,
  BlockUserMutationVariables
>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useBlockUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BlockUserMutation,
    BlockUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(
    BlockUserDocument,
    options,
  );
}
export type BlockUserMutationHookResult = ReturnType<
  typeof useBlockUserMutation
>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<
  BlockUserMutation,
  BlockUserMutationVariables
>;
export const UnblockUserDocument = gql`
  mutation unblockUser($uuid: UUID!) {
    unblockUser(uuid: $uuid) {
      isNone
    }
  }
`;
export type UnblockUserMutationFn = Apollo.MutationFunction<
  UnblockUserMutation,
  UnblockUserMutationVariables
>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUnblockUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnblockUserMutation,
    UnblockUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(
    UnblockUserDocument,
    options,
  );
}
export type UnblockUserMutationHookResult = ReturnType<
  typeof useUnblockUserMutation
>;
export type UnblockUserMutationResult =
  Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<
  UnblockUserMutation,
  UnblockUserMutationVariables
>;
export const GetBaseMetricsDocument = gql`
  query getBaseMetrics {
    getBaseMetrics {
      userCount
      repoCount
      unitCount
      unitNodeCount
      unitNodeEdgeCount
    }
  }
`;

/**
 * __useGetBaseMetricsQuery__
 *
 * To run a query within a React component, call `useGetBaseMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBaseMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBaseMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBaseMetricsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetBaseMetricsQuery,
    GetBaseMetricsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBaseMetricsQuery, GetBaseMetricsQueryVariables>(
    GetBaseMetricsDocument,
    options,
  );
}
export function useGetBaseMetricsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBaseMetricsQuery,
    GetBaseMetricsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBaseMetricsQuery, GetBaseMetricsQueryVariables>(
    GetBaseMetricsDocument,
    options,
  );
}
export function useGetBaseMetricsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBaseMetricsQuery,
    GetBaseMetricsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBaseMetricsQuery,
    GetBaseMetricsQueryVariables
  >(GetBaseMetricsDocument, options);
}
export type GetBaseMetricsQueryHookResult = ReturnType<
  typeof useGetBaseMetricsQuery
>;
export type GetBaseMetricsLazyQueryHookResult = ReturnType<
  typeof useGetBaseMetricsLazyQuery
>;
export type GetBaseMetricsSuspenseQueryHookResult = ReturnType<
  typeof useGetBaseMetricsSuspenseQuery
>;
export type GetBaseMetricsQueryResult = Apollo.QueryResult<
  GetBaseMetricsQuery,
  GetBaseMetricsQueryVariables
>;
export const GetResourceAgentsDocument = gql`
  query getResourceAgents(
    $resourceUuid: UUID!
    $resourceType: PermissionEntities!
  ) {
    getResourceAgents(
      data: { resourceUuid: $resourceUuid, resourceType: $resourceType }
    ) {
      uuid
      agentUuid
      agentType
      resourceUuid
      resourceType
    }
  }
`;

/**
 * __useGetResourceAgentsQuery__
 *
 * To run a query within a React component, call `useGetResourceAgentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceAgentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceAgentsQuery({
 *   variables: {
 *      resourceUuid: // value for 'resourceUuid'
 *      resourceType: // value for 'resourceType'
 *   },
 * });
 */
export function useGetResourceAgentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  > &
    (
      | { variables: GetResourceAgentsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >(GetResourceAgentsDocument, options);
}
export function useGetResourceAgentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >(GetResourceAgentsDocument, options);
}
export function useGetResourceAgentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >(GetResourceAgentsDocument, options);
}
export type GetResourceAgentsQueryHookResult = ReturnType<
  typeof useGetResourceAgentsQuery
>;
export type GetResourceAgentsLazyQueryHookResult = ReturnType<
  typeof useGetResourceAgentsLazyQuery
>;
export type GetResourceAgentsSuspenseQueryHookResult = ReturnType<
  typeof useGetResourceAgentsSuspenseQuery
>;
export type GetResourceAgentsQueryResult = Apollo.QueryResult<
  GetResourceAgentsQuery,
  GetResourceAgentsQueryVariables
>;
export const GetRepoDocument = gql`
  query getRepo($uuid: UUID!) {
    getRepo(uuid: $uuid) {
      uuid
      visibilityLevel
      name
      createDatetime
      repoUrl
      isPublicRepository
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      lastUpdateDatetime
      branches
      creatorUuid
    }
  }
`;

/**
 * __useGetRepoQuery__
 *
 * To run a query within a React component, call `useGetRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepoQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetRepoQuery(
  baseOptions: Apollo.QueryHookOptions<GetRepoQuery, GetRepoQueryVariables> &
    ({ variables: GetRepoQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRepoQuery, GetRepoQueryVariables>(
    GetRepoDocument,
    options,
  );
}
export function useGetRepoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRepoQuery,
    GetRepoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRepoQuery, GetRepoQueryVariables>(
    GetRepoDocument,
    options,
  );
}
export function useGetRepoSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetRepoQuery,
    GetRepoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetRepoQuery, GetRepoQueryVariables>(
    GetRepoDocument,
    options,
  );
}
export type GetRepoQueryHookResult = ReturnType<typeof useGetRepoQuery>;
export type GetRepoLazyQueryHookResult = ReturnType<typeof useGetRepoLazyQuery>;
export type GetRepoSuspenseQueryHookResult = ReturnType<
  typeof useGetRepoSuspenseQuery
>;
export type GetRepoQueryResult = Apollo.QueryResult<
  GetRepoQuery,
  GetRepoQueryVariables
>;
export const GetReposDocument = gql`
  query getRepos(
    $creatorUuid: UUID
    $searchString: String
    $isPublicRepository: Boolean
    $isAutoUpdateRepo: Boolean
    $visibilityLevel: [VisibilityLevel!]
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getRepos(
      filters: {
        creatorUuid: $creatorUuid
        searchString: $searchString
        isPublicRepository: $isPublicRepository
        isAutoUpdateRepo: $isAutoUpdateRepo
        visibilityLevel: $visibilityLevel
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      repoUrl
      isPublicRepository
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      lastUpdateDatetime
      branches
      creatorUuid
    }
  }
`;

/**
 * __useGetReposQuery__
 *
 * To run a query within a React component, call `useGetReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReposQuery({
 *   variables: {
 *      creatorUuid: // value for 'creatorUuid'
 *      searchString: // value for 'searchString'
 *      isPublicRepository: // value for 'isPublicRepository'
 *      isAutoUpdateRepo: // value for 'isAutoUpdateRepo'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      orderByLastUpdate: // value for 'orderByLastUpdate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetReposQuery(
  baseOptions?: Apollo.QueryHookOptions<GetReposQuery, GetReposQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReposQuery, GetReposQueryVariables>(
    GetReposDocument,
    options,
  );
}
export function useGetReposLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetReposQuery,
    GetReposQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetReposQuery, GetReposQueryVariables>(
    GetReposDocument,
    options,
  );
}
export function useGetReposSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetReposQuery,
    GetReposQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetReposQuery, GetReposQueryVariables>(
    GetReposDocument,
    options,
  );
}
export type GetReposQueryHookResult = ReturnType<typeof useGetReposQuery>;
export type GetReposLazyQueryHookResult = ReturnType<
  typeof useGetReposLazyQuery
>;
export type GetReposSuspenseQueryHookResult = ReturnType<
  typeof useGetReposSuspenseQuery
>;
export type GetReposQueryResult = Apollo.QueryResult<
  GetReposQuery,
  GetReposQueryVariables
>;
export const GetBranchCommitsDocument = gql`
  query getBranchCommits(
    $uuid: UUID!
    $repoBranch: String!
    $onlyTag: Boolean!
    $offset: Int
    $limit: Int
  ) {
    getBranchCommits(
      uuid: $uuid
      filters: {
        repoBranch: $repoBranch
        onlyTag: $onlyTag
        offset: $offset
        limit: $limit
      }
    ) {
      commit
      summary
      tag
    }
  }
`;

/**
 * __useGetBranchCommitsQuery__
 *
 * To run a query within a React component, call `useGetBranchCommitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchCommitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchCommitsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      repoBranch: // value for 'repoBranch'
 *      onlyTag: // value for 'onlyTag'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBranchCommitsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  > &
    (
      | { variables: GetBranchCommitsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBranchCommitsQuery, GetBranchCommitsQueryVariables>(
    GetBranchCommitsDocument,
    options,
  );
}
export function useGetBranchCommitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  >(GetBranchCommitsDocument, options);
}
export function useGetBranchCommitsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  >(GetBranchCommitsDocument, options);
}
export type GetBranchCommitsQueryHookResult = ReturnType<
  typeof useGetBranchCommitsQuery
>;
export type GetBranchCommitsLazyQueryHookResult = ReturnType<
  typeof useGetBranchCommitsLazyQuery
>;
export type GetBranchCommitsSuspenseQueryHookResult = ReturnType<
  typeof useGetBranchCommitsSuspenseQuery
>;
export type GetBranchCommitsQueryResult = Apollo.QueryResult<
  GetBranchCommitsQuery,
  GetBranchCommitsQueryVariables
>;
export const GetVersionsDocument = gql`
  query getVersions($uuid: UUID!) {
    getVersions(uuid: $uuid) {
      unitCount
      versions {
        commit
        unitCount
        tag
      }
    }
  }
`;

/**
 * __useGetVersionsQuery__
 *
 * To run a query within a React component, call `useGetVersionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVersionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVersionsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetVersionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetVersionsQuery,
    GetVersionsQueryVariables
  > &
    (
      | { variables: GetVersionsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetVersionsQuery, GetVersionsQueryVariables>(
    GetVersionsDocument,
    options,
  );
}
export function useGetVersionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVersionsQuery,
    GetVersionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetVersionsQuery, GetVersionsQueryVariables>(
    GetVersionsDocument,
    options,
  );
}
export function useGetVersionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetVersionsQuery,
    GetVersionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetVersionsQuery, GetVersionsQueryVariables>(
    GetVersionsDocument,
    options,
  );
}
export type GetVersionsQueryHookResult = ReturnType<typeof useGetVersionsQuery>;
export type GetVersionsLazyQueryHookResult = ReturnType<
  typeof useGetVersionsLazyQuery
>;
export type GetVersionsSuspenseQueryHookResult = ReturnType<
  typeof useGetVersionsSuspenseQuery
>;
export type GetVersionsQueryResult = Apollo.QueryResult<
  GetVersionsQuery,
  GetVersionsQueryVariables
>;
export const GetUnitDocument = gql`
  query getUnit($uuid: UUID!) {
    getUnit(uuid: $uuid) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      repoBranch
      repoCommit
      unitStateDict
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
    }
  }
`;

/**
 * __useGetUnitQuery__
 *
 * To run a query within a React component, call `useGetUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetUnitQuery(
  baseOptions: Apollo.QueryHookOptions<GetUnitQuery, GetUnitQueryVariables> &
    ({ variables: GetUnitQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitQuery, GetUnitQueryVariables>(
    GetUnitDocument,
    options,
  );
}
export function useGetUnitLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitQuery,
    GetUnitQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitQuery, GetUnitQueryVariables>(
    GetUnitDocument,
    options,
  );
}
export function useGetUnitSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitQuery,
    GetUnitQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUnitQuery, GetUnitQueryVariables>(
    GetUnitDocument,
    options,
  );
}
export type GetUnitQueryHookResult = ReturnType<typeof useGetUnitQuery>;
export type GetUnitLazyQueryHookResult = ReturnType<typeof useGetUnitLazyQuery>;
export type GetUnitSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitSuspenseQuery
>;
export type GetUnitQueryResult = Apollo.QueryResult<
  GetUnitQuery,
  GetUnitQueryVariables
>;
export const GetUnitsDocument = gql`
  query getUnits(
    $creatorUuid: UUID
    $repoUuid: UUID
    $searchString: String
    $isAutoUpdateFromRepoUnit: Boolean
    $visibilityLevel: [VisibilityLevel!]
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUnits(
      filters: {
        creatorUuid: $creatorUuid
        repoUuid: $repoUuid
        searchString: $searchString
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        visibilityLevel: $visibilityLevel
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      repoBranch
      repoCommit
      unitStateDict
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
    }
  }
`;

/**
 * __useGetUnitsQuery__
 *
 * To run a query within a React component, call `useGetUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsQuery({
 *   variables: {
 *      creatorUuid: // value for 'creatorUuid'
 *      repoUuid: // value for 'repoUuid'
 *      searchString: // value for 'searchString'
 *      isAutoUpdateFromRepoUnit: // value for 'isAutoUpdateFromRepoUnit'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      orderByLastUpdate: // value for 'orderByLastUpdate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUnitsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitsQuery, GetUnitsQueryVariables>(
    GetUnitsDocument,
    options,
  );
}
export function useGetUnitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitsQuery,
    GetUnitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitsQuery, GetUnitsQueryVariables>(
    GetUnitsDocument,
    options,
  );
}
export function useGetUnitsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitsQuery,
    GetUnitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUnitsQuery, GetUnitsQueryVariables>(
    GetUnitsDocument,
    options,
  );
}
export type GetUnitsQueryHookResult = ReturnType<typeof useGetUnitsQuery>;
export type GetUnitsLazyQueryHookResult = ReturnType<
  typeof useGetUnitsLazyQuery
>;
export type GetUnitsSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitsSuspenseQuery
>;
export type GetUnitsQueryResult = Apollo.QueryResult<
  GetUnitsQuery,
  GetUnitsQueryVariables
>;
export const GetUnitsWithOutputDocument = gql`
  query getUnitsWithOutput(
    $creatorUuid: UUID
    $repoUuid: UUID
    $searchString: String
    $isAutoUpdateFromRepoUnit: Boolean
    $visibilityLevel: [VisibilityLevel!]
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUnits(
      filters: {
        creatorUuid: $creatorUuid
        repoUuid: $repoUuid
        searchString: $searchString
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        visibilityLevel: $visibilityLevel
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      repoBranch
      repoCommit
      unitStateDict
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
      outputUnitNodes {
        uuid
        type
        visibilityLevel
        isRewritableInput
        topicName
        createDatetime
        state
        unitUuid
        creatorUuid
      }
    }
  }
`;

/**
 * __useGetUnitsWithOutputQuery__
 *
 * To run a query within a React component, call `useGetUnitsWithOutputQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsWithOutputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsWithOutputQuery({
 *   variables: {
 *      creatorUuid: // value for 'creatorUuid'
 *      repoUuid: // value for 'repoUuid'
 *      searchString: // value for 'searchString'
 *      isAutoUpdateFromRepoUnit: // value for 'isAutoUpdateFromRepoUnit'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      orderByLastUpdate: // value for 'orderByLastUpdate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUnitsWithOutputQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUnitsWithOutputQuery,
    GetUnitsWithOutputQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUnitsWithOutputQuery,
    GetUnitsWithOutputQueryVariables
  >(GetUnitsWithOutputDocument, options);
}
export function useGetUnitsWithOutputLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitsWithOutputQuery,
    GetUnitsWithOutputQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUnitsWithOutputQuery,
    GetUnitsWithOutputQueryVariables
  >(GetUnitsWithOutputDocument, options);
}
export function useGetUnitsWithOutputSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitsWithOutputQuery,
    GetUnitsWithOutputQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUnitsWithOutputQuery,
    GetUnitsWithOutputQueryVariables
  >(GetUnitsWithOutputDocument, options);
}
export type GetUnitsWithOutputQueryHookResult = ReturnType<
  typeof useGetUnitsWithOutputQuery
>;
export type GetUnitsWithOutputLazyQueryHookResult = ReturnType<
  typeof useGetUnitsWithOutputLazyQuery
>;
export type GetUnitsWithOutputSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitsWithOutputSuspenseQuery
>;
export type GetUnitsWithOutputQueryResult = Apollo.QueryResult<
  GetUnitsWithOutputQuery,
  GetUnitsWithOutputQueryVariables
>;
export const GetUnitEnvDocument = gql`
  query getUnitEnv($uuid: UUID!) {
    getUnitEnv(uuid: $uuid)
  }
`;

/**
 * __useGetUnitEnvQuery__
 *
 * To run a query within a React component, call `useGetUnitEnvQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitEnvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitEnvQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetUnitEnvQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUnitEnvQuery,
    GetUnitEnvQueryVariables
  > &
    (
      | { variables: GetUnitEnvQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitEnvQuery, GetUnitEnvQueryVariables>(
    GetUnitEnvDocument,
    options,
  );
}
export function useGetUnitEnvLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitEnvQuery,
    GetUnitEnvQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitEnvQuery, GetUnitEnvQueryVariables>(
    GetUnitEnvDocument,
    options,
  );
}
export function useGetUnitEnvSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitEnvQuery,
    GetUnitEnvQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUnitEnvQuery, GetUnitEnvQueryVariables>(
    GetUnitEnvDocument,
    options,
  );
}
export type GetUnitEnvQueryHookResult = ReturnType<typeof useGetUnitEnvQuery>;
export type GetUnitEnvLazyQueryHookResult = ReturnType<
  typeof useGetUnitEnvLazyQuery
>;
export type GetUnitEnvSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitEnvSuspenseQuery
>;
export type GetUnitEnvQueryResult = Apollo.QueryResult<
  GetUnitEnvQuery,
  GetUnitEnvQueryVariables
>;
export const GetUnitNodeDocument = gql`
  query getUnitNode($uuid: UUID!) {
    getUnitNode(uuid: $uuid) {
      uuid
      type
      visibilityLevel
      isRewritableInput
      topicName
      state
      unitUuid
    }
  }
`;

/**
 * __useGetUnitNodeQuery__
 *
 * To run a query within a React component, call `useGetUnitNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitNodeQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetUnitNodeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUnitNodeQuery,
    GetUnitNodeQueryVariables
  > &
    (
      | { variables: GetUnitNodeQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitNodeQuery, GetUnitNodeQueryVariables>(
    GetUnitNodeDocument,
    options,
  );
}
export function useGetUnitNodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitNodeQuery,
    GetUnitNodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitNodeQuery, GetUnitNodeQueryVariables>(
    GetUnitNodeDocument,
    options,
  );
}
export function useGetUnitNodeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitNodeQuery,
    GetUnitNodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUnitNodeQuery, GetUnitNodeQueryVariables>(
    GetUnitNodeDocument,
    options,
  );
}
export type GetUnitNodeQueryHookResult = ReturnType<typeof useGetUnitNodeQuery>;
export type GetUnitNodeLazyQueryHookResult = ReturnType<
  typeof useGetUnitNodeLazyQuery
>;
export type GetUnitNodeSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitNodeSuspenseQuery
>;
export type GetUnitNodeQueryResult = Apollo.QueryResult<
  GetUnitNodeQuery,
  GetUnitNodeQueryVariables
>;
export const GetUnitNodesDocument = gql`
  query getUnitNodes(
    $unitUuid: UUID
    $searchString: String
    $type: [UnitNodeTypeEnum!]
    $visibilityLevel: [VisibilityLevel!]
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUnitNodes(
      filters: {
        unitUuid: $unitUuid
        searchString: $searchString
        type: $type
        visibilityLevel: $visibilityLevel
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      uuid
      type
      visibilityLevel
      isRewritableInput
      topicName
      state
      unitUuid
    }
  }
`;

/**
 * __useGetUnitNodesQuery__
 *
 * To run a query within a React component, call `useGetUnitNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitNodesQuery({
 *   variables: {
 *      unitUuid: // value for 'unitUuid'
 *      searchString: // value for 'searchString'
 *      type: // value for 'type'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUnitNodesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUnitNodesQuery,
    GetUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitNodesQuery, GetUnitNodesQueryVariables>(
    GetUnitNodesDocument,
    options,
  );
}
export function useGetUnitNodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitNodesQuery,
    GetUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitNodesQuery, GetUnitNodesQueryVariables>(
    GetUnitNodesDocument,
    options,
  );
}
export function useGetUnitNodesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitNodesQuery,
    GetUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUnitNodesQuery, GetUnitNodesQueryVariables>(
    GetUnitNodesDocument,
    options,
  );
}
export type GetUnitNodesQueryHookResult = ReturnType<
  typeof useGetUnitNodesQuery
>;
export type GetUnitNodesLazyQueryHookResult = ReturnType<
  typeof useGetUnitNodesLazyQuery
>;
export type GetUnitNodesSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitNodesSuspenseQuery
>;
export type GetUnitNodesQueryResult = Apollo.QueryResult<
  GetUnitNodesQuery,
  GetUnitNodesQueryVariables
>;
export const GetOutputUnitNodesDocument = gql`
  query getOutputUnitNodes(
    $unitNodeInputUuid: UUID!
    $searchString: String
    $visibilityLevel: [VisibilityLevel!]
    $orderByUnitName: OrderByText
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getOutputUnitNodes(
      filters: {
        unitNodeInputUuid: $unitNodeInputUuid
        searchString: $searchString
        visibilityLevel: $visibilityLevel
        orderByUnitName: $orderByUnitName
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      unit {
        uuid
        visibilityLevel
        name
        createDatetime
        isAutoUpdateFromRepoUnit
        repoBranch
        repoCommit
        unitStateDict
        currentCommitVersion
        lastUpdateDatetime
        creatorUuid
        repoUuid
      }
      unitOutputNodes {
        uuid
        type
        visibilityLevel
        isRewritableInput
        topicName
        state
        unitUuid
      }
    }
  }
`;

/**
 * __useGetOutputUnitNodesQuery__
 *
 * To run a query within a React component, call `useGetOutputUnitNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOutputUnitNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOutputUnitNodesQuery({
 *   variables: {
 *      unitNodeInputUuid: // value for 'unitNodeInputUuid'
 *      searchString: // value for 'searchString'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByUnitName: // value for 'orderByUnitName'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetOutputUnitNodesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOutputUnitNodesQuery,
    GetOutputUnitNodesQueryVariables
  > &
    (
      | { variables: GetOutputUnitNodesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetOutputUnitNodesQuery,
    GetOutputUnitNodesQueryVariables
  >(GetOutputUnitNodesDocument, options);
}
export function useGetOutputUnitNodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOutputUnitNodesQuery,
    GetOutputUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOutputUnitNodesQuery,
    GetOutputUnitNodesQueryVariables
  >(GetOutputUnitNodesDocument, options);
}
export function useGetOutputUnitNodesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetOutputUnitNodesQuery,
    GetOutputUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetOutputUnitNodesQuery,
    GetOutputUnitNodesQueryVariables
  >(GetOutputUnitNodesDocument, options);
}
export type GetOutputUnitNodesQueryHookResult = ReturnType<
  typeof useGetOutputUnitNodesQuery
>;
export type GetOutputUnitNodesLazyQueryHookResult = ReturnType<
  typeof useGetOutputUnitNodesLazyQuery
>;
export type GetOutputUnitNodesSuspenseQueryHookResult = ReturnType<
  typeof useGetOutputUnitNodesSuspenseQuery
>;
export type GetOutputUnitNodesQueryResult = Apollo.QueryResult<
  GetOutputUnitNodesQuery,
  GetOutputUnitNodesQueryVariables
>;
export const GetTokenDocument = gql`
  query getToken($credentials: String!, $password: String!) {
    getToken(data: { credentials: $credentials, password: $password })
  }
`;

/**
 * __useGetTokenQuery__
 *
 * To run a query within a React component, call `useGetTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenQuery({
 *   variables: {
 *      credentials: // value for 'credentials'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetTokenQuery(
  baseOptions: Apollo.QueryHookOptions<GetTokenQuery, GetTokenQueryVariables> &
    ({ variables: GetTokenQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokenQuery, GetTokenQueryVariables>(
    GetTokenDocument,
    options,
  );
}
export function useGetTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokenQuery,
    GetTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokenQuery, GetTokenQueryVariables>(
    GetTokenDocument,
    options,
  );
}
export function useGetTokenSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTokenQuery,
    GetTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTokenQuery, GetTokenQueryVariables>(
    GetTokenDocument,
    options,
  );
}
export type GetTokenQueryHookResult = ReturnType<typeof useGetTokenQuery>;
export type GetTokenLazyQueryHookResult = ReturnType<
  typeof useGetTokenLazyQuery
>;
export type GetTokenSuspenseQueryHookResult = ReturnType<
  typeof useGetTokenSuspenseQuery
>;
export type GetTokenQueryResult = Apollo.QueryResult<
  GetTokenQuery,
  GetTokenQueryVariables
>;
export const GetUserDocument = gql`
  query getUser($uuid: UUID!) {
    getUser(uuid: $uuid) {
      uuid
      role
      status
      login
      createDatetime
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> &
    ({ variables: GetUserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUserSuspenseQuery
>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetUsersDocument = gql`
  query getUsers(
    $searchString: String
    $role: [UserRole!]
    $status: [UserStatus!]
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUsers(
      filters: {
        searchString: $searchString
        role: $role
        status: $status
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      uuid
      role
      status
      login
      createDatetime
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      role: // value for 'role'
 *      status: // value for 'status'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const GetVerificationUserDocument = gql`
  query getVerificationUser {
    getVerificationUser
  }
`;

/**
 * __useGetVerificationUserQuery__
 *
 * To run a query within a React component, call `useGetVerificationUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVerificationUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVerificationUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVerificationUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >(GetVerificationUserDocument, options);
}
export function useGetVerificationUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >(GetVerificationUserDocument, options);
}
export function useGetVerificationUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >(GetVerificationUserDocument, options);
}
export type GetVerificationUserQueryHookResult = ReturnType<
  typeof useGetVerificationUserQuery
>;
export type GetVerificationUserLazyQueryHookResult = ReturnType<
  typeof useGetVerificationUserLazyQuery
>;
export type GetVerificationUserSuspenseQueryHookResult = ReturnType<
  typeof useGetVerificationUserSuspenseQuery
>;
export type GetVerificationUserQueryResult = Apollo.QueryResult<
  GetVerificationUserQuery,
  GetVerificationUserQueryVariables
>;
