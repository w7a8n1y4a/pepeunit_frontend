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
  updateRepoDefaultBranch: RepoType;
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

export type MutationUpdateRepoDefaultBranchArgs = {
  defaultBranch: Scalars["String"]["input"];
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
  isAutoUpdateRepo: Scalars["Boolean"]["output"];
  isCredentialsSet: Scalars["Boolean"]["output"];
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

export type GetTokenQueryVariables = Exact<{
  credentials: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type GetTokenQuery = { __typename?: "Query"; getToken: string };

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
