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
  uuid: Scalars["UUID"]["input"];
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
  visibilityLevel?: Array<VisibilityLevel>;
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
  visibilityLevel?: Array<VisibilityLevel>;
};

export type UnitNodeEdgeCreateInput = {
  nodeInputUuid: Scalars["UUID"]["input"];
  nodeOutputUuid: Scalars["UUID"]["input"];
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
  type?: InputMaybe<Array<Scalars["String"]["input"]>>;
  unitUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  visibilityLevel?: Array<VisibilityLevel>;
};

export type UnitNodeSetStateInput = {
  state?: InputMaybe<Scalars["String"]["input"]>;
};

export type UnitNodeType = {
  __typename?: "UnitNodeType";
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
  role?: Array<UserRole>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  status?: Array<UserStatus>;
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

export type GetVerificationUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetVerificationUserQuery = {
  __typename?: "Query";
  getVerificationUser: string;
};

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
