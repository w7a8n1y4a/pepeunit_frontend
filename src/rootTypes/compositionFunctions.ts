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
  Upload: { input: File; output: File };
};

export enum AggregationFunctions {
  Avg = "AVG",
  Max = "MAX",
  Min = "MIN",
  Sum = "SUM",
}

export type AggregationType = {
  __typename?: "AggregationType";
  aggregationType: AggregationFunctions;
  createDatetime: Scalars["DateTime"]["output"];
  startWindowDatetime: Scalars["DateTime"]["output"];
  state: Scalars["Float"]["output"];
  timeWindowSize: Scalars["Int"]["output"];
  unitNodeUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export enum BackendTopicCommand {
  EnvUpdate = "ENV_UPDATE",
  LogSync = "LOG_SYNC",
  SchemaUpdate = "SCHEMA_UPDATE",
  Update = "UPDATE",
}

export type BaseMetricsType = {
  __typename?: "BaseMetricsType";
  repoCount: Scalars["Int"]["output"];
  repositoryRegistryCount: Scalars["Int"]["output"];
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

export enum CredentialStatus {
  Error = "ERROR",
  NotVerified = "NOT_VERIFIED",
  Valid = "VALID",
}

export type CredentialsInput = {
  patToken: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type CredentialsType = {
  __typename?: "CredentialsType";
  patToken: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type DataPipeFilterInput = {
  aggregationType?: InputMaybe<Array<AggregationFunctions>>;
  endAggWindowDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  endCreateDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  startAggWindowDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  startCreateDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  timeWindowSize?: InputMaybe<Scalars["Int"]["input"]>;
  type: ProcessingPolicyType;
  uuid: Scalars["UUID"]["input"];
};

export enum DataPipeStage {
  ActivePeriod = "ACTIVE_PERIOD",
  Filters = "FILTERS",
  ProcessingPolicy = "PROCESSING_POLICY",
  Transformations = "TRANSFORMATIONS",
}

export type DataPipeValidationErrorType = {
  __typename?: "DataPipeValidationErrorType";
  message: Scalars["String"]["output"];
  stage: DataPipeStage;
};

export enum GitPlatform {
  Github = "GITHUB",
  Gitlab = "GITLAB",
}

export enum LogLevel {
  Critical = "CRITICAL",
  Debug = "DEBUG",
  Error = "ERROR",
  Info = "INFO",
  Warning = "WARNING",
}

export type Mutation = {
  __typename?: "Mutation";
  blockUser: NoneType;
  bulkUpdate: NoneType;
  createPermission: PermissionType;
  createRepo: RepoType;
  createRepositoryRegistry: RepositoryRegistryType;
  createUnit: UnitType;
  createUnitNodeEdge: UnitNodeEdgeType;
  createUser: UserType;
  deleteDataPipeData: NoneType;
  deletePermission: NoneType;
  deleteRepo: NoneType;
  deleteRepositoryRegistry: NoneType;
  deleteUnit: NoneType;
  deleteUnitNodeEdge: NoneType;
  sendCommandToInputBaseTopic: NoneType;
  setCredentials: NoneType;
  setDataPipeConfig: NoneType;
  setStateStorage: NoneType;
  setStateUnitNodeInput: UnitNodeType;
  unblockUser: NoneType;
  updateLocalRepository: NoneType;
  updateRepo: RepoType;
  updateUnit: UnitType;
  updateUnitEnv: NoneType;
  updateUnitNode: UnitNodeType;
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

export type MutationCreateRepositoryRegistryArgs = {
  repositoryRegistry: RepositoryRegistryCreateInput;
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

export type MutationDeleteDataPipeDataArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeletePermissionArgs = {
  agentUuid: Scalars["UUID"]["input"];
  resourceUuid: Scalars["UUID"]["input"];
};

export type MutationDeleteRepoArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteRepositoryRegistryArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUnitArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUnitNodeEdgeArgs = {
  inputUuid: Scalars["UUID"]["input"];
  outputUuid: Scalars["UUID"]["input"];
};

export type MutationSendCommandToInputBaseTopicArgs = {
  command: BackendTopicCommand;
  uuid: Scalars["UUID"]["input"];
};

export type MutationSetCredentialsArgs = {
  data: CredentialsInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationSetDataPipeConfigArgs = {
  file: Scalars["Upload"]["input"];
  uuid: Scalars["UUID"]["input"];
};

export type MutationSetStateStorageArgs = {
  state: Scalars["String"]["input"];
  uuid: Scalars["UUID"]["input"];
};

export type MutationSetStateUnitNodeInputArgs = {
  unitNode: UnitNodeSetStateInput;
  uuid: Scalars["UUID"]["input"];
};

export type MutationUnblockUserArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateLocalRepositoryArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateRepoArgs = {
  repo: RepoUpdateInput;
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

export type MutationUpdateUnitsFirmwareArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUserArgs = {
  user: UserUpdateInput;
};

export type NRecordsType = {
  __typename?: "NRecordsType";
  createDatetime: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  maxCount: Scalars["Int"]["output"];
  size: Scalars["Int"]["output"];
  state: Scalars["String"]["output"];
  stateType: TypeInputValue;
  unitNodeUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export type NRecordsTypeTimeWindowTypeAggregationType =
  | AggregationType
  | NRecordsType
  | TimeWindowType;

export type NoneType = {
  __typename?: "NoneType";
  isNone: Scalars["Boolean"]["output"];
};

export type OneRepositoryRegistryCredentialsType = {
  __typename?: "OneRepositoryRegistryCredentialsType";
  credentials: CredentialsType;
  status: CredentialStatus;
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

export type PermissionFilterInput = {
  agentType?: InputMaybe<PermissionEntities>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  resourceType: PermissionEntities;
  resourceUuid: Scalars["UUID"]["input"];
};

export type PermissionType = {
  __typename?: "PermissionType";
  agentType: PermissionEntities;
  agentUuid: Scalars["UUID"]["output"];
  resourceType: PermissionEntities;
  resourceUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export type PermissionsType = {
  __typename?: "PermissionsType";
  count: Scalars["Int"]["output"];
  permissions: Array<PermissionType>;
};

export type PipeDataResultType = {
  __typename?: "PipeDataResultType";
  count: Scalars["Int"]["output"];
  pipeData: Array<NRecordsTypeTimeWindowTypeAggregationType>;
};

export type PlatformType = {
  __typename?: "PlatformType";
  link: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export enum ProcessingPolicyType {
  Aggregation = "AGGREGATION",
  LastValue = "LAST_VALUE",
  NRecords = "N_RECORDS",
  TimeWindow = "TIME_WINDOW",
}

export type Query = {
  __typename?: "Query";
  checkDataPipeConfig: Array<DataPipeValidationErrorType>;
  getAvailablePlatforms: Array<PlatformType>;
  getBaseMetrics: BaseMetricsType;
  getBranchCommits: Array<CommitType>;
  getCredentials?: Maybe<OneRepositoryRegistryCredentialsType>;
  getDataPipeConfig: Scalars["String"]["output"];
  getPipeData: PipeDataResultType;
  getRepo: RepoType;
  getRepos: ReposResultType;
  getRepositoriesRegistry: RepositoriesRegistryResultType;
  getRepositoryRegistry: RepositoryRegistryType;
  getResourceAgents: PermissionsType;
  getStateStorage: Scalars["String"]["output"];
  getTargetVersion: TargetVersionType;
  getToken: Scalars["String"]["output"];
  getUnit: UnitType;
  getUnitCurrentSchema: Scalars["String"]["output"];
  getUnitEnv: Scalars["String"]["output"];
  getUnitLogs: UnitLogsResultType;
  getUnitNode: UnitNodeType;
  getUnitNodes: UnitNodesResultType;
  getUnits: UnitsResultType;
  getUser: UserType;
  getUsers: UsersResultType;
  getVerificationUser: Scalars["String"]["output"];
  getVersions: RepoVersionsType;
};

export type QueryCheckDataPipeConfigArgs = {
  file: Scalars["Upload"]["input"];
};

export type QueryGetAvailablePlatformsArgs = {
  targetCommit?: InputMaybe<Scalars["String"]["input"]>;
  targetTag?: InputMaybe<Scalars["String"]["input"]>;
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetBranchCommitsArgs = {
  filters: CommitFilterInput;
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetCredentialsArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetDataPipeConfigArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetPipeDataArgs = {
  filters: DataPipeFilterInput;
};

export type QueryGetRepoArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetReposArgs = {
  filters: RepoFilterInput;
};

export type QueryGetRepositoriesRegistryArgs = {
  filters: RepositoryRegistryFilterInput;
};

export type QueryGetRepositoryRegistryArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetResourceAgentsArgs = {
  filters: PermissionFilterInput;
};

export type QueryGetStateStorageArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetTargetVersionArgs = {
  uuid: Scalars["UUID"]["input"];
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

export type QueryGetUnitLogsArgs = {
  filters: UnitLogFilterInput;
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
  isCompilableRepo: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  repositoryRegistryUuid: Scalars["UUID"]["input"];
  visibilityLevel: VisibilityLevel;
};

export type RepoFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  creatorsUuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  repositoryRegistryUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  uuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type RepoType = {
  __typename?: "RepoType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  defaultBranch?: Maybe<Scalars["String"]["output"]>;
  defaultCommit?: Maybe<Scalars["String"]["output"]>;
  isAutoUpdateRepo: Scalars["Boolean"]["output"];
  isCompilableRepo: Scalars["Boolean"]["output"];
  isOnlyTagUpdate: Scalars["Boolean"]["output"];
  lastUpdateDatetime: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  repositoryRegistryUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
  visibilityLevel: VisibilityLevel;
};

export type RepoUpdateInput = {
  defaultBranch?: InputMaybe<Scalars["String"]["input"]>;
  defaultCommit?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  isCompilableRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
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

export type ReposResultType = {
  __typename?: "ReposResultType";
  count: Scalars["Int"]["output"];
  repos: Array<RepoType>;
};

export type RepositoriesRegistryResultType = {
  __typename?: "RepositoriesRegistryResultType";
  count: Scalars["Int"]["output"];
  repositoriesRegistry: Array<RepositoryRegistryType>;
};

export type RepositoryRegistryCreateInput = {
  credentials?: InputMaybe<CredentialsInput>;
  isPublicRepository: Scalars["Boolean"]["input"];
  platform: GitPlatform;
  repositoryUrl: Scalars["String"]["input"];
};

export type RepositoryRegistryFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  isPublicRepository?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  uuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
};

export enum RepositoryRegistryStatus {
  Error = "ERROR",
  Processing = "PROCESSING",
  Updated = "UPDATED",
}

export type RepositoryRegistryType = {
  __typename?: "RepositoryRegistryType";
  branches: Array<Scalars["String"]["output"]>;
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid?: Maybe<Scalars["UUID"]["output"]>;
  isPublicRepository: Scalars["Boolean"]["output"];
  lastUpdateDatetime: Scalars["DateTime"]["output"];
  localRepositorySize: Scalars["Int"]["output"];
  platform: GitPlatform;
  releasesData?: Maybe<Scalars["String"]["output"]>;
  repositoryUrl: Scalars["String"]["output"];
  syncError?: Maybe<Scalars["String"]["output"]>;
  syncLastDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  syncStatus?: Maybe<RepositoryRegistryStatus>;
  uuid: Scalars["UUID"]["output"];
};

export type TargetVersionType = {
  __typename?: "TargetVersionType";
  commit: Scalars["String"]["output"];
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type TimeWindowType = {
  __typename?: "TimeWindowType";
  createDatetime: Scalars["DateTime"]["output"];
  expirationDatetime: Scalars["DateTime"]["output"];
  size: Scalars["Int"]["output"];
  state: Scalars["String"]["output"];
  stateType: TypeInputValue;
  unitNodeUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export enum TypeInputValue {
  Number = "NUMBER",
  Text = "TEXT",
}

export type UnitCreateInput = {
  isAutoUpdateFromRepoUnit: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
  repoUuid: Scalars["UUID"]["input"];
  targetFirmwarePlatform?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel: VisibilityLevel;
};

export type UnitFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  orderByUnitName?: InputMaybe<OrderByText>;
  repoUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  reposUuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  unitNodeInputUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  unitNodeType?: InputMaybe<Array<UnitNodeTypeEnum>>;
  unitNodeUuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  uuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export enum UnitFirmwareUpdateStatus {
  Error = "ERROR",
  RequestSent = "REQUEST_SENT",
  Success = "SUCCESS",
}

export type UnitLogFilterInput = {
  level?: InputMaybe<Array<LogLevel>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  uuid: Scalars["UUID"]["input"];
};

export type UnitLogType = {
  __typename?: "UnitLogType";
  createDatetime: Scalars["DateTime"]["output"];
  expirationDatetime: Scalars["DateTime"]["output"];
  level: LogLevel;
  text: Scalars["String"]["output"];
  unitUuid: Scalars["UUID"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export type UnitLogsResultType = {
  __typename?: "UnitLogsResultType";
  count: Scalars["Int"]["output"];
  unitLogs: Array<UnitLogType>;
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
  outputUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Array<UnitNodeTypeEnum>>;
  unitUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  uuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type UnitNodeSetStateInput = {
  state?: InputMaybe<Scalars["String"]["input"]>;
};

export type UnitNodeType = {
  __typename?: "UnitNodeType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  dataPipeError?: Maybe<Scalars["String"]["output"]>;
  dataPipeStatus?: Maybe<Scalars["String"]["output"]>;
  dataPipeYml?: Maybe<Scalars["String"]["output"]>;
  isDataPipeActive: Scalars["Boolean"]["output"];
  isRewritableInput: Scalars["Boolean"]["output"];
  lastUpdateDatetime: Scalars["DateTime"]["output"];
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
  isDataPipeActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isRewritableInput?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<VisibilityLevel>;
};

export type UnitNodesResultType = {
  __typename?: "UnitNodesResultType";
  count: Scalars["Int"]["output"];
  unitNodes: Array<UnitNodeType>;
};

export type UnitStateType = {
  __typename?: "UnitStateType";
  commitVersion?: Maybe<Scalars["String"]["output"]>;
  freq?: Maybe<Scalars["Float"]["output"]>;
  ifconfig: Array<Scalars["String"]["output"]>;
  memAlloc?: Maybe<Scalars["Float"]["output"]>;
  memFree?: Maybe<Scalars["Float"]["output"]>;
  millis?: Maybe<Scalars["Float"]["output"]>;
  statvfs: Array<Scalars["Float"]["output"]>;
};

export type UnitType = {
  __typename?: "UnitType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  currentCommitVersion?: Maybe<Scalars["String"]["output"]>;
  firmwareUpdateError?: Maybe<Scalars["String"]["output"]>;
  firmwareUpdateStatus?: Maybe<UnitFirmwareUpdateStatus>;
  isAutoUpdateFromRepoUnit: Scalars["Boolean"]["output"];
  lastFirmwareUpdateDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  lastUpdateDatetime: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  repoBranch?: Maybe<Scalars["String"]["output"]>;
  repoCommit?: Maybe<Scalars["String"]["output"]>;
  repoUuid: Scalars["UUID"]["output"];
  targetFirmwarePlatform?: Maybe<Scalars["String"]["output"]>;
  unitNodes: Array<UnitNodeType>;
  unitState?: Maybe<UnitStateType>;
  uuid: Scalars["UUID"]["output"];
  visibilityLevel: VisibilityLevel;
};

export type UnitUpdateInput = {
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
  targetFirmwarePlatform?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<VisibilityLevel>;
};

export type UnitsResultType = {
  __typename?: "UnitsResultType";
  count: Scalars["Int"]["output"];
  units: Array<UnitType>;
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
  uuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
};

export enum UserRole {
  Admin = "ADMIN",
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

export type UsersResultType = {
  __typename?: "UsersResultType";
  count: Scalars["Int"]["output"];
  users: Array<UserType>;
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
  agentUuid: Scalars["UUID"]["input"];
  resourceUuid: Scalars["UUID"]["input"];
}>;

export type DeletePermissionMutation = {
  __typename?: "Mutation";
  deletePermission: { __typename?: "NoneType"; isNone: boolean };
};

export type CreateRepoMutationVariables = Exact<{
  repositoryRegistryUuid: Scalars["UUID"]["input"];
  visibilityLevel: VisibilityLevel;
  name: Scalars["String"]["input"];
  isCompilableRepo: Scalars["Boolean"]["input"];
}>;

export type CreateRepoMutation = {
  __typename?: "Mutation";
  createRepo: {
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    isCompilableRepo: boolean;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repositoryRegistryUuid: string;
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
  isCompilableRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateRepoMutation = {
  __typename?: "Mutation";
  updateRepo: {
    __typename?: "RepoType";
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    isCompilableRepo: boolean;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repositoryRegistryUuid: string;
  };
};

export type UpdateUnitsFirmwareMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UpdateUnitsFirmwareMutation = {
  __typename?: "Mutation";
  updateUnitsFirmware: { __typename?: "NoneType"; isNone: boolean };
};

export type BulkUpdateMutationVariables = Exact<{ [key: string]: never }>;

export type BulkUpdateMutation = {
  __typename?: "Mutation";
  bulkUpdate: { __typename?: "NoneType"; isNone: boolean };
};

export type DeleteRepoMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type DeleteRepoMutation = {
  __typename?: "Mutation";
  deleteRepo: { __typename?: "NoneType"; isNone: boolean };
};

export type CreateRepositoryRegistryMutationVariables = Exact<{
  platform: GitPlatform;
  repositoryUrl: Scalars["String"]["input"];
  isPublicRepository: Scalars["Boolean"]["input"];
  credentials?: InputMaybe<CredentialsInput>;
}>;

export type CreateRepositoryRegistryMutation = {
  __typename?: "Mutation";
  createRepositoryRegistry: {
    __typename?: "RepositoryRegistryType";
    uuid: string;
    platform: GitPlatform;
    repositoryUrl: string;
    isPublicRepository: boolean;
    releasesData?: string | null;
    localRepositorySize: number;
    syncStatus?: RepositoryRegistryStatus | null;
    syncError?: string | null;
    syncLastDatetime?: string | null;
    createDatetime: string;
    lastUpdateDatetime: string;
    creatorUuid?: string | null;
    branches: Array<string>;
  };
};

export type SetCredentialsMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  data: CredentialsInput;
}>;

export type SetCredentialsMutation = {
  __typename?: "Mutation";
  setCredentials: { __typename?: "NoneType"; isNone: boolean };
};

export type UpdateLocalRepositoryMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UpdateLocalRepositoryMutation = {
  __typename?: "Mutation";
  updateLocalRepository: { __typename?: "NoneType"; isNone: boolean };
};

export type DeleteRepositoryRegistryMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type DeleteRepositoryRegistryMutation = {
  __typename?: "Mutation";
  deleteRepositoryRegistry: { __typename?: "NoneType"; isNone: boolean };
};

export type CreateUnitMutationVariables = Exact<{
  repoUuid: Scalars["UUID"]["input"];
  visibilityLevel: VisibilityLevel;
  name: Scalars["String"]["input"];
  isAutoUpdateFromRepoUnit: Scalars["Boolean"]["input"];
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
  targetFirmwarePlatform?: InputMaybe<Scalars["String"]["input"]>;
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
    targetFirmwarePlatform?: string | null;
    repoBranch?: string | null;
    repoCommit?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    firmwareUpdateStatus?: UnitFirmwareUpdateStatus | null;
    firmwareUpdateError?: string | null;
    lastFirmwareUpdateDatetime?: string | null;
    unitState?: {
      __typename?: "UnitStateType";
      ifconfig: Array<string>;
      millis?: number | null;
      memFree?: number | null;
      memAlloc?: number | null;
      freq?: number | null;
      statvfs: Array<number>;
      commitVersion?: string | null;
    } | null;
  };
};

export type UpdateUnitMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  visibilityLevel?: InputMaybe<VisibilityLevel>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  repoBranch?: InputMaybe<Scalars["String"]["input"]>;
  repoCommit?: InputMaybe<Scalars["String"]["input"]>;
  targetFirmwarePlatform?: InputMaybe<Scalars["String"]["input"]>;
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
    targetFirmwarePlatform?: string | null;
    repoBranch?: string | null;
    repoCommit?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    firmwareUpdateStatus?: UnitFirmwareUpdateStatus | null;
    firmwareUpdateError?: string | null;
    lastFirmwareUpdateDatetime?: string | null;
    unitState?: {
      __typename?: "UnitStateType";
      ifconfig: Array<string>;
      millis?: number | null;
      memFree?: number | null;
      memAlloc?: number | null;
      freq?: number | null;
      statvfs: Array<number>;
      commitVersion?: string | null;
    } | null;
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

export type SetStateStorageMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  state: Scalars["String"]["input"];
}>;

export type SetStateStorageMutation = {
  __typename?: "Mutation";
  setStateStorage: { __typename?: "NoneType"; isNone: boolean };
};

export type SendCommandToInputBaseTopicMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  command: BackendTopicCommand;
}>;

export type SendCommandToInputBaseTopicMutation = {
  __typename?: "Mutation";
  sendCommandToInputBaseTopic: { __typename?: "NoneType"; isNone: boolean };
};

export type UpdateUnitNodeMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  visibilityLevel?: InputMaybe<VisibilityLevel>;
  isRewritableInput?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDataPipeActive?: InputMaybe<Scalars["Boolean"]["input"]>;
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
    lastUpdateDatetime: string;
    isDataPipeActive: boolean;
    dataPipeYml?: string | null;
    dataPipeStatus?: string | null;
    dataPipeError?: string | null;
    createDatetime: string;
    state?: string | null;
    unitUuid: string;
    creatorUuid: string;
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
    lastUpdateDatetime: string;
    isDataPipeActive: boolean;
    dataPipeYml?: string | null;
    dataPipeStatus?: string | null;
    dataPipeError?: string | null;
    createDatetime: string;
    state?: string | null;
    unitUuid: string;
    creatorUuid: string;
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

export type SetDataPipeConfigMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  file: Scalars["Upload"]["input"];
}>;

export type SetDataPipeConfigMutation = {
  __typename?: "Mutation";
  setDataPipeConfig: { __typename?: "NoneType"; isNone: boolean };
};

export type DeleteDataPipeDataMutationVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type DeleteDataPipeDataMutation = {
  __typename?: "Mutation";
  deleteDataPipeData: { __typename?: "NoneType"; isNone: boolean };
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
    repositoryRegistryCount: number;
    repoCount: number;
    unitCount: number;
    unitNodeCount: number;
    unitNodeEdgeCount: number;
  };
};

export type GetResourceAgentsQueryVariables = Exact<{
  resourceUuid: Scalars["UUID"]["input"];
  resourceType: PermissionEntities;
  agentType?: InputMaybe<PermissionEntities>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetResourceAgentsQuery = {
  __typename?: "Query";
  getResourceAgents: {
    __typename?: "PermissionsType";
    count: number;
    permissions: Array<{
      __typename?: "PermissionType";
      uuid: string;
      agentUuid: string;
      agentType: PermissionEntities;
      resourceUuid: string;
      resourceType: PermissionEntities;
    }>;
  };
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
    defaultBranch?: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit?: string | null;
    isOnlyTagUpdate: boolean;
    isCompilableRepo: boolean;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repositoryRegistryUuid: string;
  };
};

export type GetReposQueryVariables = Exact<{
  repositoryRegistryUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  uuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  creatorsUuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetReposQuery = {
  __typename?: "Query";
  getRepos: {
    __typename?: "ReposResultType";
    count: number;
    repos: Array<{
      __typename?: "RepoType";
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      defaultBranch?: string | null;
      isAutoUpdateRepo: boolean;
      defaultCommit?: string | null;
      isOnlyTagUpdate: boolean;
      isCompilableRepo: boolean;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repositoryRegistryUuid: string;
    }>;
  };
};

export type GetAvailablePlatformsQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  targetTag?: InputMaybe<Scalars["String"]["input"]>;
  targetCommit?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetAvailablePlatformsQuery = {
  __typename?: "Query";
  getAvailablePlatforms: Array<{
    __typename?: "PlatformType";
    name: string;
    link: string;
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

export type GetRepositoryRegistryQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetRepositoryRegistryQuery = {
  __typename?: "Query";
  getRepositoryRegistry: {
    __typename?: "RepositoryRegistryType";
    uuid: string;
    platform: GitPlatform;
    repositoryUrl: string;
    isPublicRepository: boolean;
    releasesData?: string | null;
    localRepositorySize: number;
    syncStatus?: RepositoryRegistryStatus | null;
    syncError?: string | null;
    syncLastDatetime?: string | null;
    createDatetime: string;
    lastUpdateDatetime: string;
    creatorUuid?: string | null;
    branches: Array<string>;
  };
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

export type GetCredentialsQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetCredentialsQuery = {
  __typename?: "Query";
  getCredentials?: {
    __typename?: "OneRepositoryRegistryCredentialsType";
    status: CredentialStatus;
    credentials: {
      __typename?: "CredentialsType";
      username: string;
      patToken: string;
    };
  } | null;
};

export type GetRepositoriesRegistryQueryVariables = Exact<{
  uuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isPublicRepository?: InputMaybe<Scalars["Boolean"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetRepositoriesRegistryQuery = {
  __typename?: "Query";
  getRepositoriesRegistry: {
    __typename?: "RepositoriesRegistryResultType";
    count: number;
    repositoriesRegistry: Array<{
      __typename?: "RepositoryRegistryType";
      uuid: string;
      platform: GitPlatform;
      repositoryUrl: string;
      isPublicRepository: boolean;
      releasesData?: string | null;
      localRepositorySize: number;
      syncStatus?: RepositoryRegistryStatus | null;
      syncError?: string | null;
      syncLastDatetime?: string | null;
      createDatetime: string;
      lastUpdateDatetime: string;
      creatorUuid?: string | null;
      branches: Array<string>;
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
    targetFirmwarePlatform?: string | null;
    repoBranch?: string | null;
    repoCommit?: string | null;
    currentCommitVersion?: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    firmwareUpdateStatus?: UnitFirmwareUpdateStatus | null;
    firmwareUpdateError?: string | null;
    lastFirmwareUpdateDatetime?: string | null;
    unitState?: {
      __typename?: "UnitStateType";
      ifconfig: Array<string>;
      millis?: number | null;
      memFree?: number | null;
      memAlloc?: number | null;
      freq?: number | null;
      statvfs: Array<number>;
      commitVersion?: string | null;
    } | null;
  };
};

export type GetUnitsQueryVariables = Exact<{
  uuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  repoUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  reposUuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByUnitName?: InputMaybe<OrderByText>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUnitsQuery = {
  __typename?: "Query";
  getUnits: {
    __typename?: "UnitsResultType";
    count: number;
    units: Array<{
      __typename?: "UnitType";
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      targetFirmwarePlatform?: string | null;
      repoBranch?: string | null;
      repoCommit?: string | null;
      currentCommitVersion?: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
      firmwareUpdateStatus?: UnitFirmwareUpdateStatus | null;
      firmwareUpdateError?: string | null;
      lastFirmwareUpdateDatetime?: string | null;
      unitState?: {
        __typename?: "UnitStateType";
        ifconfig: Array<string>;
        millis?: number | null;
        memFree?: number | null;
        memAlloc?: number | null;
        freq?: number | null;
        statvfs: Array<number>;
        commitVersion?: string | null;
      } | null;
    }>;
  };
};

export type GetUnitsWithUnitNodesQueryVariables = Exact<{
  uuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  repoUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  reposUuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  isAutoUpdateFromRepoUnit?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByUnitName?: InputMaybe<OrderByText>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  unitNodeType?: InputMaybe<Array<UnitNodeTypeEnum> | UnitNodeTypeEnum>;
}>;

export type GetUnitsWithUnitNodesQuery = {
  __typename?: "Query";
  getUnits: {
    __typename?: "UnitsResultType";
    count: number;
    units: Array<{
      __typename?: "UnitType";
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      targetFirmwarePlatform?: string | null;
      repoBranch?: string | null;
      repoCommit?: string | null;
      currentCommitVersion?: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
      firmwareUpdateStatus?: UnitFirmwareUpdateStatus | null;
      firmwareUpdateError?: string | null;
      lastFirmwareUpdateDatetime?: string | null;
      unitState?: {
        __typename?: "UnitStateType";
        ifconfig: Array<string>;
        millis?: number | null;
        memFree?: number | null;
        memAlloc?: number | null;
        freq?: number | null;
        statvfs: Array<number>;
        commitVersion?: string | null;
      } | null;
      unitNodes: Array<{
        __typename?: "UnitNodeType";
        uuid: string;
        type: UnitNodeTypeEnum;
        visibilityLevel: VisibilityLevel;
        isRewritableInput: boolean;
        topicName: string;
        lastUpdateDatetime: string;
        isDataPipeActive: boolean;
        dataPipeYml?: string | null;
        dataPipeStatus?: string | null;
        dataPipeError?: string | null;
        createDatetime: string;
        state?: string | null;
        unitUuid: string;
        creatorUuid: string;
      }>;
    }>;
  };
};

export type GetUnitsOutputByInputQueryVariables = Exact<{
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  unitNodeInputUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel> | VisibilityLevel>;
  orderByUnitName?: InputMaybe<OrderByText>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUnitsOutputByInputQuery = {
  __typename?: "Query";
  getUnits: {
    __typename?: "UnitsResultType";
    count: number;
    units: Array<{
      __typename?: "UnitType";
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      targetFirmwarePlatform?: string | null;
      repoBranch?: string | null;
      repoCommit?: string | null;
      currentCommitVersion?: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
      firmwareUpdateStatus?: UnitFirmwareUpdateStatus | null;
      firmwareUpdateError?: string | null;
      lastFirmwareUpdateDatetime?: string | null;
      unitState?: {
        __typename?: "UnitStateType";
        ifconfig: Array<string>;
        millis?: number | null;
        memFree?: number | null;
        memAlloc?: number | null;
        freq?: number | null;
        statvfs: Array<number>;
        commitVersion?: string | null;
      } | null;
      unitNodes: Array<{
        __typename?: "UnitNodeType";
        uuid: string;
        type: UnitNodeTypeEnum;
        visibilityLevel: VisibilityLevel;
        isRewritableInput: boolean;
        topicName: string;
        lastUpdateDatetime: string;
        isDataPipeActive: boolean;
        dataPipeYml?: string | null;
        dataPipeStatus?: string | null;
        dataPipeError?: string | null;
        createDatetime: string;
        state?: string | null;
        unitUuid: string;
        creatorUuid: string;
      }>;
    }>;
  };
};

export type GetUnitLogsQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  level?: InputMaybe<Array<LogLevel> | LogLevel>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUnitLogsQuery = {
  __typename?: "Query";
  getUnitLogs: {
    __typename?: "UnitLogsResultType";
    count: number;
    unitLogs: Array<{
      __typename?: "UnitLogType";
      uuid: string;
      level: LogLevel;
      unitUuid: string;
      text: string;
      createDatetime: string;
      expirationDatetime: string;
    }>;
  };
};

export type GetUnitEnvQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetUnitEnvQuery = { __typename?: "Query"; getUnitEnv: string };

export type GetUnitCurrentSchemaQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetUnitCurrentSchemaQuery = {
  __typename?: "Query";
  getUnitCurrentSchema: string;
};

export type GetTargetVersionQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetTargetVersionQuery = {
  __typename?: "Query";
  getTargetVersion: {
    __typename?: "TargetVersionType";
    commit: string;
    tag?: string | null;
  };
};

export type GetStateStorageQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetStateStorageQuery = {
  __typename?: "Query";
  getStateStorage: string;
};

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
    lastUpdateDatetime: string;
    isDataPipeActive: boolean;
    dataPipeYml?: string | null;
    dataPipeStatus?: string | null;
    dataPipeError?: string | null;
    createDatetime: string;
    state?: string | null;
    unitUuid: string;
    creatorUuid: string;
  };
};

export type GetUnitNodesQueryVariables = Exact<{
  uuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
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
  getUnitNodes: {
    __typename?: "UnitNodesResultType";
    count: number;
    unitNodes: Array<{
      __typename?: "UnitNodeType";
      uuid: string;
      type: UnitNodeTypeEnum;
      visibilityLevel: VisibilityLevel;
      isRewritableInput: boolean;
      topicName: string;
      lastUpdateDatetime: string;
      isDataPipeActive: boolean;
      dataPipeYml?: string | null;
      dataPipeStatus?: string | null;
      dataPipeError?: string | null;
      createDatetime: string;
      state?: string | null;
      unitUuid: string;
      creatorUuid: string;
    }>;
  };
};

export type CheckDataPipeConfigQueryVariables = Exact<{
  file: Scalars["Upload"]["input"];
}>;

export type CheckDataPipeConfigQuery = {
  __typename?: "Query";
  checkDataPipeConfig: Array<{
    __typename?: "DataPipeValidationErrorType";
    stage: DataPipeStage;
    message: string;
  }>;
};

export type GetPipeDataQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
  type: ProcessingPolicyType;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  aggregationType?: InputMaybe<
    Array<AggregationFunctions> | AggregationFunctions
  >;
  timeWindowSize?: InputMaybe<Scalars["Int"]["input"]>;
  startAggWindowDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  endAggWindowDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  startCreateDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  endCreateDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPipeDataQuery = {
  __typename?: "Query";
  getPipeData: {
    __typename?: "PipeDataResultType";
    count: number;
    pipeData: Array<
      | {
          __typename: "AggregationType";
          uuid: string;
          unitNodeUuid: string;
          aggregationType: AggregationFunctions;
          timeWindowSize: number;
          createDatetime: string;
          startWindowDatetime: string;
          state_float: number;
        }
      | {
          __typename: "NRecordsType";
          id: number;
          uuid: string;
          unitNodeUuid: string;
          stateType: TypeInputValue;
          createDatetime: string;
          maxCount: number;
          size: number;
          state: string;
        }
      | {
          __typename: "TimeWindowType";
          uuid: string;
          unitNodeUuid: string;
          stateType: TypeInputValue;
          createDatetime: string;
          expirationDatetime: string;
          size: number;
          state: string;
        }
    >;
  };
};

export type GetDataPipeConfigQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetDataPipeConfigQuery = {
  __typename?: "Query";
  getDataPipeConfig: string;
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
  uuids?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Array<UserRole> | UserRole>;
  status?: InputMaybe<Array<UserStatus> | UserStatus>;
  orderByCreateDate?: InputMaybe<OrderByDate>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: {
    __typename?: "UsersResultType";
    count: number;
    users: Array<{
      __typename?: "UserType";
      uuid: string;
      role: UserRole;
      status: UserStatus;
      login: string;
      createDatetime: string;
    }>;
  };
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
  mutation deletePermission($agentUuid: UUID!, $resourceUuid: UUID!) {
    deletePermission(agentUuid: $agentUuid, resourceUuid: $resourceUuid) {
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
 *      agentUuid: // value for 'agentUuid'
 *      resourceUuid: // value for 'resourceUuid'
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
    $repositoryRegistryUuid: UUID!
    $visibilityLevel: VisibilityLevel!
    $name: String!
    $isCompilableRepo: Boolean!
  ) {
    createRepo(
      repo: {
        repositoryRegistryUuid: $repositoryRegistryUuid
        visibilityLevel: $visibilityLevel
        name: $name
        isCompilableRepo: $isCompilableRepo
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      isCompilableRepo
      lastUpdateDatetime
      creatorUuid
      repositoryRegistryUuid
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
 *      repositoryRegistryUuid: // value for 'repositoryRegistryUuid'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      name: // value for 'name'
 *      isCompilableRepo: // value for 'isCompilableRepo'
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
    $isCompilableRepo: Boolean
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
        isCompilableRepo: $isCompilableRepo
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      isCompilableRepo
      lastUpdateDatetime
      creatorUuid
      repositoryRegistryUuid
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
 *      isCompilableRepo: // value for 'isCompilableRepo'
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
export const CreateRepositoryRegistryDocument = gql`
  mutation createRepositoryRegistry(
    $platform: GitPlatform!
    $repositoryUrl: String!
    $isPublicRepository: Boolean!
    $credentials: CredentialsInput
  ) {
    createRepositoryRegistry(
      repositoryRegistry: {
        platform: $platform
        repositoryUrl: $repositoryUrl
        isPublicRepository: $isPublicRepository
        credentials: $credentials
      }
    ) {
      uuid
      platform
      repositoryUrl
      isPublicRepository
      releasesData
      localRepositorySize
      syncStatus
      syncError
      syncLastDatetime
      createDatetime
      lastUpdateDatetime
      creatorUuid
      branches
    }
  }
`;
export type CreateRepositoryRegistryMutationFn = Apollo.MutationFunction<
  CreateRepositoryRegistryMutation,
  CreateRepositoryRegistryMutationVariables
>;

/**
 * __useCreateRepositoryRegistryMutation__
 *
 * To run a mutation, you first call `useCreateRepositoryRegistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRepositoryRegistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRepositoryRegistryMutation, { data, loading, error }] = useCreateRepositoryRegistryMutation({
 *   variables: {
 *      platform: // value for 'platform'
 *      repositoryUrl: // value for 'repositoryUrl'
 *      isPublicRepository: // value for 'isPublicRepository'
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useCreateRepositoryRegistryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRepositoryRegistryMutation,
    CreateRepositoryRegistryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateRepositoryRegistryMutation,
    CreateRepositoryRegistryMutationVariables
  >(CreateRepositoryRegistryDocument, options);
}
export type CreateRepositoryRegistryMutationHookResult = ReturnType<
  typeof useCreateRepositoryRegistryMutation
>;
export type CreateRepositoryRegistryMutationResult =
  Apollo.MutationResult<CreateRepositoryRegistryMutation>;
export type CreateRepositoryRegistryMutationOptions =
  Apollo.BaseMutationOptions<
    CreateRepositoryRegistryMutation,
    CreateRepositoryRegistryMutationVariables
  >;
export const SetCredentialsDocument = gql`
  mutation setCredentials($uuid: UUID!, $data: CredentialsInput!) {
    setCredentials(uuid: $uuid, data: $data) {
      isNone
    }
  }
`;
export type SetCredentialsMutationFn = Apollo.MutationFunction<
  SetCredentialsMutation,
  SetCredentialsMutationVariables
>;

/**
 * __useSetCredentialsMutation__
 *
 * To run a mutation, you first call `useSetCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCredentialsMutation, { data, loading, error }] = useSetCredentialsMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetCredentialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetCredentialsMutation,
    SetCredentialsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetCredentialsMutation,
    SetCredentialsMutationVariables
  >(SetCredentialsDocument, options);
}
export type SetCredentialsMutationHookResult = ReturnType<
  typeof useSetCredentialsMutation
>;
export type SetCredentialsMutationResult =
  Apollo.MutationResult<SetCredentialsMutation>;
export type SetCredentialsMutationOptions = Apollo.BaseMutationOptions<
  SetCredentialsMutation,
  SetCredentialsMutationVariables
>;
export const UpdateLocalRepositoryDocument = gql`
  mutation updateLocalRepository($uuid: UUID!) {
    updateLocalRepository(uuid: $uuid) {
      isNone
    }
  }
`;
export type UpdateLocalRepositoryMutationFn = Apollo.MutationFunction<
  UpdateLocalRepositoryMutation,
  UpdateLocalRepositoryMutationVariables
>;

/**
 * __useUpdateLocalRepositoryMutation__
 *
 * To run a mutation, you first call `useUpdateLocalRepositoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocalRepositoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocalRepositoryMutation, { data, loading, error }] = useUpdateLocalRepositoryMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUpdateLocalRepositoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLocalRepositoryMutation,
    UpdateLocalRepositoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateLocalRepositoryMutation,
    UpdateLocalRepositoryMutationVariables
  >(UpdateLocalRepositoryDocument, options);
}
export type UpdateLocalRepositoryMutationHookResult = ReturnType<
  typeof useUpdateLocalRepositoryMutation
>;
export type UpdateLocalRepositoryMutationResult =
  Apollo.MutationResult<UpdateLocalRepositoryMutation>;
export type UpdateLocalRepositoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateLocalRepositoryMutation,
  UpdateLocalRepositoryMutationVariables
>;
export const DeleteRepositoryRegistryDocument = gql`
  mutation deleteRepositoryRegistry($uuid: UUID!) {
    deleteRepositoryRegistry(uuid: $uuid) {
      isNone
    }
  }
`;
export type DeleteRepositoryRegistryMutationFn = Apollo.MutationFunction<
  DeleteRepositoryRegistryMutation,
  DeleteRepositoryRegistryMutationVariables
>;

/**
 * __useDeleteRepositoryRegistryMutation__
 *
 * To run a mutation, you first call `useDeleteRepositoryRegistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRepositoryRegistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRepositoryRegistryMutation, { data, loading, error }] = useDeleteRepositoryRegistryMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteRepositoryRegistryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRepositoryRegistryMutation,
    DeleteRepositoryRegistryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteRepositoryRegistryMutation,
    DeleteRepositoryRegistryMutationVariables
  >(DeleteRepositoryRegistryDocument, options);
}
export type DeleteRepositoryRegistryMutationHookResult = ReturnType<
  typeof useDeleteRepositoryRegistryMutation
>;
export type DeleteRepositoryRegistryMutationResult =
  Apollo.MutationResult<DeleteRepositoryRegistryMutation>;
export type DeleteRepositoryRegistryMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteRepositoryRegistryMutation,
    DeleteRepositoryRegistryMutationVariables
  >;
export const CreateUnitDocument = gql`
  mutation createUnit(
    $repoUuid: UUID!
    $visibilityLevel: VisibilityLevel!
    $name: String!
    $isAutoUpdateFromRepoUnit: Boolean!
    $repoBranch: String
    $repoCommit: String
    $targetFirmwarePlatform: String
  ) {
    createUnit(
      unit: {
        repoUuid: $repoUuid
        visibilityLevel: $visibilityLevel
        name: $name
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        targetFirmwarePlatform: $targetFirmwarePlatform
        repoBranch: $repoBranch
        repoCommit: $repoCommit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      targetFirmwarePlatform
      repoBranch
      repoCommit
      unitState {
        ifconfig
        millis
        memFree
        memAlloc
        freq
        statvfs
        commitVersion
      }
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
      firmwareUpdateStatus
      firmwareUpdateError
      lastFirmwareUpdateDatetime
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
 *      targetFirmwarePlatform: // value for 'targetFirmwarePlatform'
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
    $targetFirmwarePlatform: String
  ) {
    updateUnit(
      uuid: $uuid
      unit: {
        visibilityLevel: $visibilityLevel
        name: $name
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        targetFirmwarePlatform: $targetFirmwarePlatform
        repoBranch: $repoBranch
        repoCommit: $repoCommit
      }
    ) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      targetFirmwarePlatform
      repoBranch
      repoCommit
      unitState {
        ifconfig
        millis
        memFree
        memAlloc
        freq
        statvfs
        commitVersion
      }
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
      firmwareUpdateStatus
      firmwareUpdateError
      lastFirmwareUpdateDatetime
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
 *      targetFirmwarePlatform: // value for 'targetFirmwarePlatform'
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
export const SetStateStorageDocument = gql`
  mutation setStateStorage($uuid: UUID!, $state: String!) {
    setStateStorage(uuid: $uuid, state: $state) {
      isNone
    }
  }
`;
export type SetStateStorageMutationFn = Apollo.MutationFunction<
  SetStateStorageMutation,
  SetStateStorageMutationVariables
>;

/**
 * __useSetStateStorageMutation__
 *
 * To run a mutation, you first call `useSetStateStorageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStateStorageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStateStorageMutation, { data, loading, error }] = useSetStateStorageMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useSetStateStorageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetStateStorageMutation,
    SetStateStorageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetStateStorageMutation,
    SetStateStorageMutationVariables
  >(SetStateStorageDocument, options);
}
export type SetStateStorageMutationHookResult = ReturnType<
  typeof useSetStateStorageMutation
>;
export type SetStateStorageMutationResult =
  Apollo.MutationResult<SetStateStorageMutation>;
export type SetStateStorageMutationOptions = Apollo.BaseMutationOptions<
  SetStateStorageMutation,
  SetStateStorageMutationVariables
>;
export const SendCommandToInputBaseTopicDocument = gql`
  mutation sendCommandToInputBaseTopic(
    $uuid: UUID!
    $command: BackendTopicCommand!
  ) {
    sendCommandToInputBaseTopic(uuid: $uuid, command: $command) {
      isNone
    }
  }
`;
export type SendCommandToInputBaseTopicMutationFn = Apollo.MutationFunction<
  SendCommandToInputBaseTopicMutation,
  SendCommandToInputBaseTopicMutationVariables
>;

/**
 * __useSendCommandToInputBaseTopicMutation__
 *
 * To run a mutation, you first call `useSendCommandToInputBaseTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCommandToInputBaseTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCommandToInputBaseTopicMutation, { data, loading, error }] = useSendCommandToInputBaseTopicMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      command: // value for 'command'
 *   },
 * });
 */
export function useSendCommandToInputBaseTopicMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendCommandToInputBaseTopicMutation,
    SendCommandToInputBaseTopicMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendCommandToInputBaseTopicMutation,
    SendCommandToInputBaseTopicMutationVariables
  >(SendCommandToInputBaseTopicDocument, options);
}
export type SendCommandToInputBaseTopicMutationHookResult = ReturnType<
  typeof useSendCommandToInputBaseTopicMutation
>;
export type SendCommandToInputBaseTopicMutationResult =
  Apollo.MutationResult<SendCommandToInputBaseTopicMutation>;
export type SendCommandToInputBaseTopicMutationOptions =
  Apollo.BaseMutationOptions<
    SendCommandToInputBaseTopicMutation,
    SendCommandToInputBaseTopicMutationVariables
  >;
export const UpdateUnitNodeDocument = gql`
  mutation updateUnitNode(
    $uuid: UUID!
    $visibilityLevel: VisibilityLevel
    $isRewritableInput: Boolean
    $isDataPipeActive: Boolean
  ) {
    updateUnitNode(
      uuid: $uuid
      unitNode: {
        visibilityLevel: $visibilityLevel
        isRewritableInput: $isRewritableInput
        isDataPipeActive: $isDataPipeActive
      }
    ) {
      uuid
      type
      visibilityLevel
      isRewritableInput
      topicName
      lastUpdateDatetime
      isDataPipeActive
      dataPipeYml
      dataPipeStatus
      dataPipeError
      createDatetime
      state
      unitUuid
      creatorUuid
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
 *      isDataPipeActive: // value for 'isDataPipeActive'
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
      lastUpdateDatetime
      isDataPipeActive
      dataPipeYml
      dataPipeStatus
      dataPipeError
      createDatetime
      state
      unitUuid
      creatorUuid
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
export const SetDataPipeConfigDocument = gql`
  mutation setDataPipeConfig($uuid: UUID!, $file: Upload!) {
    setDataPipeConfig(uuid: $uuid, file: $file) {
      isNone
    }
  }
`;
export type SetDataPipeConfigMutationFn = Apollo.MutationFunction<
  SetDataPipeConfigMutation,
  SetDataPipeConfigMutationVariables
>;

/**
 * __useSetDataPipeConfigMutation__
 *
 * To run a mutation, you first call `useSetDataPipeConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDataPipeConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDataPipeConfigMutation, { data, loading, error }] = useSetDataPipeConfigMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useSetDataPipeConfigMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetDataPipeConfigMutation,
    SetDataPipeConfigMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetDataPipeConfigMutation,
    SetDataPipeConfigMutationVariables
  >(SetDataPipeConfigDocument, options);
}
export type SetDataPipeConfigMutationHookResult = ReturnType<
  typeof useSetDataPipeConfigMutation
>;
export type SetDataPipeConfigMutationResult =
  Apollo.MutationResult<SetDataPipeConfigMutation>;
export type SetDataPipeConfigMutationOptions = Apollo.BaseMutationOptions<
  SetDataPipeConfigMutation,
  SetDataPipeConfigMutationVariables
>;
export const DeleteDataPipeDataDocument = gql`
  mutation deleteDataPipeData($uuid: UUID!) {
    deleteDataPipeData(uuid: $uuid) {
      isNone
    }
  }
`;
export type DeleteDataPipeDataMutationFn = Apollo.MutationFunction<
  DeleteDataPipeDataMutation,
  DeleteDataPipeDataMutationVariables
>;

/**
 * __useDeleteDataPipeDataMutation__
 *
 * To run a mutation, you first call `useDeleteDataPipeDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataPipeDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataPipeDataMutation, { data, loading, error }] = useDeleteDataPipeDataMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteDataPipeDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteDataPipeDataMutation,
    DeleteDataPipeDataMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteDataPipeDataMutation,
    DeleteDataPipeDataMutationVariables
  >(DeleteDataPipeDataDocument, options);
}
export type DeleteDataPipeDataMutationHookResult = ReturnType<
  typeof useDeleteDataPipeDataMutation
>;
export type DeleteDataPipeDataMutationResult =
  Apollo.MutationResult<DeleteDataPipeDataMutation>;
export type DeleteDataPipeDataMutationOptions = Apollo.BaseMutationOptions<
  DeleteDataPipeDataMutation,
  DeleteDataPipeDataMutationVariables
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
      repositoryRegistryCount
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
    $agentType: PermissionEntities
    $offset: Int
    $limit: Int
  ) {
    getResourceAgents(
      filters: {
        resourceUuid: $resourceUuid
        resourceType: $resourceType
        agentType: $agentType
        offset: $offset
        limit: $limit
      }
    ) {
      count
      permissions {
        uuid
        agentUuid
        agentType
        resourceUuid
        resourceType
      }
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
 *      agentType: // value for 'agentType'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
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
      defaultBranch
      isAutoUpdateRepo
      defaultCommit
      isOnlyTagUpdate
      isCompilableRepo
      lastUpdateDatetime
      creatorUuid
      repositoryRegistryUuid
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
    $repositoryRegistryUuid: UUID
    $uuids: [UUID!]
    $creatorUuid: UUID
    $creatorsUuids: [UUID!]
    $searchString: String
    $isAutoUpdateRepo: Boolean
    $visibilityLevel: [VisibilityLevel!]
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getRepos(
      filters: {
        repositoryRegistryUuid: $repositoryRegistryUuid
        uuids: $uuids
        creatorUuid: $creatorUuid
        creatorsUuids: $creatorsUuids
        searchString: $searchString
        isAutoUpdateRepo: $isAutoUpdateRepo
        visibilityLevel: $visibilityLevel
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      repos {
        uuid
        visibilityLevel
        name
        createDatetime
        defaultBranch
        isAutoUpdateRepo
        defaultCommit
        isOnlyTagUpdate
        isCompilableRepo
        lastUpdateDatetime
        creatorUuid
        repositoryRegistryUuid
      }
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
 *      repositoryRegistryUuid: // value for 'repositoryRegistryUuid'
 *      uuids: // value for 'uuids'
 *      creatorUuid: // value for 'creatorUuid'
 *      creatorsUuids: // value for 'creatorsUuids'
 *      searchString: // value for 'searchString'
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
export const GetAvailablePlatformsDocument = gql`
  query getAvailablePlatforms(
    $uuid: UUID!
    $targetTag: String
    $targetCommit: String
  ) {
    getAvailablePlatforms(
      uuid: $uuid
      targetTag: $targetTag
      targetCommit: $targetCommit
    ) {
      name
      link
    }
  }
`;

/**
 * __useGetAvailablePlatformsQuery__
 *
 * To run a query within a React component, call `useGetAvailablePlatformsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailablePlatformsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailablePlatformsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      targetTag: // value for 'targetTag'
 *      targetCommit: // value for 'targetCommit'
 *   },
 * });
 */
export function useGetAvailablePlatformsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  > &
    (
      | { variables: GetAvailablePlatformsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >(GetAvailablePlatformsDocument, options);
}
export function useGetAvailablePlatformsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >(GetAvailablePlatformsDocument, options);
}
export function useGetAvailablePlatformsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >(GetAvailablePlatformsDocument, options);
}
export type GetAvailablePlatformsQueryHookResult = ReturnType<
  typeof useGetAvailablePlatformsQuery
>;
export type GetAvailablePlatformsLazyQueryHookResult = ReturnType<
  typeof useGetAvailablePlatformsLazyQuery
>;
export type GetAvailablePlatformsSuspenseQueryHookResult = ReturnType<
  typeof useGetAvailablePlatformsSuspenseQuery
>;
export type GetAvailablePlatformsQueryResult = Apollo.QueryResult<
  GetAvailablePlatformsQuery,
  GetAvailablePlatformsQueryVariables
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
export const GetRepositoryRegistryDocument = gql`
  query getRepositoryRegistry($uuid: UUID!) {
    getRepositoryRegistry(uuid: $uuid) {
      uuid
      platform
      repositoryUrl
      isPublicRepository
      releasesData
      localRepositorySize
      syncStatus
      syncError
      syncLastDatetime
      createDatetime
      lastUpdateDatetime
      creatorUuid
      branches
    }
  }
`;

/**
 * __useGetRepositoryRegistryQuery__
 *
 * To run a query within a React component, call `useGetRepositoryRegistryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoryRegistryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoryRegistryQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetRepositoryRegistryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  > &
    (
      | { variables: GetRepositoryRegistryQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >(GetRepositoryRegistryDocument, options);
}
export function useGetRepositoryRegistryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >(GetRepositoryRegistryDocument, options);
}
export function useGetRepositoryRegistrySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >(GetRepositoryRegistryDocument, options);
}
export type GetRepositoryRegistryQueryHookResult = ReturnType<
  typeof useGetRepositoryRegistryQuery
>;
export type GetRepositoryRegistryLazyQueryHookResult = ReturnType<
  typeof useGetRepositoryRegistryLazyQuery
>;
export type GetRepositoryRegistrySuspenseQueryHookResult = ReturnType<
  typeof useGetRepositoryRegistrySuspenseQuery
>;
export type GetRepositoryRegistryQueryResult = Apollo.QueryResult<
  GetRepositoryRegistryQuery,
  GetRepositoryRegistryQueryVariables
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
export const GetCredentialsDocument = gql`
  query getCredentials($uuid: UUID!) {
    getCredentials(uuid: $uuid) {
      credentials {
        username
        patToken
      }
      status
    }
  }
`;

/**
 * __useGetCredentialsQuery__
 *
 * To run a query within a React component, call `useGetCredentialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCredentialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCredentialsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetCredentialsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCredentialsQuery,
    GetCredentialsQueryVariables
  > &
    (
      | { variables: GetCredentialsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCredentialsQuery, GetCredentialsQueryVariables>(
    GetCredentialsDocument,
    options,
  );
}
export function useGetCredentialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCredentialsQuery,
    GetCredentialsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCredentialsQuery, GetCredentialsQueryVariables>(
    GetCredentialsDocument,
    options,
  );
}
export function useGetCredentialsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCredentialsQuery,
    GetCredentialsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCredentialsQuery,
    GetCredentialsQueryVariables
  >(GetCredentialsDocument, options);
}
export type GetCredentialsQueryHookResult = ReturnType<
  typeof useGetCredentialsQuery
>;
export type GetCredentialsLazyQueryHookResult = ReturnType<
  typeof useGetCredentialsLazyQuery
>;
export type GetCredentialsSuspenseQueryHookResult = ReturnType<
  typeof useGetCredentialsSuspenseQuery
>;
export type GetCredentialsQueryResult = Apollo.QueryResult<
  GetCredentialsQuery,
  GetCredentialsQueryVariables
>;
export const GetRepositoriesRegistryDocument = gql`
  query getRepositoriesRegistry(
    $uuids: [UUID!]
    $creatorUuid: UUID
    $searchString: String
    $isPublicRepository: Boolean
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getRepositoriesRegistry(
      filters: {
        uuids: $uuids
        creatorUuid: $creatorUuid
        searchString: $searchString
        isPublicRepository: $isPublicRepository
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      repositoriesRegistry {
        uuid
        platform
        repositoryUrl
        isPublicRepository
        releasesData
        localRepositorySize
        syncStatus
        syncError
        syncLastDatetime
        createDatetime
        lastUpdateDatetime
        creatorUuid
        branches
      }
    }
  }
`;

/**
 * __useGetRepositoriesRegistryQuery__
 *
 * To run a query within a React component, call `useGetRepositoriesRegistryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoriesRegistryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoriesRegistryQuery({
 *   variables: {
 *      uuids: // value for 'uuids'
 *      creatorUuid: // value for 'creatorUuid'
 *      searchString: // value for 'searchString'
 *      isPublicRepository: // value for 'isPublicRepository'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      orderByLastUpdate: // value for 'orderByLastUpdate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetRepositoriesRegistryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >(GetRepositoriesRegistryDocument, options);
}
export function useGetRepositoriesRegistryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >(GetRepositoriesRegistryDocument, options);
}
export function useGetRepositoriesRegistrySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >(GetRepositoriesRegistryDocument, options);
}
export type GetRepositoriesRegistryQueryHookResult = ReturnType<
  typeof useGetRepositoriesRegistryQuery
>;
export type GetRepositoriesRegistryLazyQueryHookResult = ReturnType<
  typeof useGetRepositoriesRegistryLazyQuery
>;
export type GetRepositoriesRegistrySuspenseQueryHookResult = ReturnType<
  typeof useGetRepositoriesRegistrySuspenseQuery
>;
export type GetRepositoriesRegistryQueryResult = Apollo.QueryResult<
  GetRepositoriesRegistryQuery,
  GetRepositoriesRegistryQueryVariables
>;
export const GetUnitDocument = gql`
  query getUnit($uuid: UUID!) {
    getUnit(uuid: $uuid) {
      uuid
      visibilityLevel
      name
      createDatetime
      isAutoUpdateFromRepoUnit
      targetFirmwarePlatform
      repoBranch
      repoCommit
      unitState {
        ifconfig
        millis
        memFree
        memAlloc
        freq
        statvfs
        commitVersion
      }
      currentCommitVersion
      lastUpdateDatetime
      creatorUuid
      repoUuid
      firmwareUpdateStatus
      firmwareUpdateError
      lastFirmwareUpdateDatetime
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
    $uuids: [UUID!]
    $creatorUuid: UUID
    $repoUuid: UUID
    $reposUuids: [UUID!]
    $searchString: String
    $isAutoUpdateFromRepoUnit: Boolean
    $visibilityLevel: [VisibilityLevel!]
    $orderByUnitName: OrderByText
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUnits(
      filters: {
        uuids: $uuids
        creatorUuid: $creatorUuid
        repoUuid: $repoUuid
        reposUuids: $reposUuids
        searchString: $searchString
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        visibilityLevel: $visibilityLevel
        orderByUnitName: $orderByUnitName
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      units {
        uuid
        visibilityLevel
        name
        createDatetime
        isAutoUpdateFromRepoUnit
        targetFirmwarePlatform
        repoBranch
        repoCommit
        unitState {
          ifconfig
          millis
          memFree
          memAlloc
          freq
          statvfs
          commitVersion
        }
        currentCommitVersion
        lastUpdateDatetime
        creatorUuid
        repoUuid
        firmwareUpdateStatus
        firmwareUpdateError
        lastFirmwareUpdateDatetime
      }
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
 *      uuids: // value for 'uuids'
 *      creatorUuid: // value for 'creatorUuid'
 *      repoUuid: // value for 'repoUuid'
 *      reposUuids: // value for 'reposUuids'
 *      searchString: // value for 'searchString'
 *      isAutoUpdateFromRepoUnit: // value for 'isAutoUpdateFromRepoUnit'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByUnitName: // value for 'orderByUnitName'
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
export const GetUnitsWithUnitNodesDocument = gql`
  query getUnitsWithUnitNodes(
    $uuids: [UUID!]
    $creatorUuid: UUID
    $repoUuid: UUID
    $reposUuids: [UUID!]
    $searchString: String
    $isAutoUpdateFromRepoUnit: Boolean
    $visibilityLevel: [VisibilityLevel!]
    $orderByUnitName: OrderByText
    $orderByCreateDate: OrderByDate
    $orderByLastUpdate: OrderByDate
    $offset: Int
    $limit: Int
    $unitNodeType: [UnitNodeTypeEnum!]
  ) {
    getUnits(
      filters: {
        uuids: $uuids
        creatorUuid: $creatorUuid
        repoUuid: $repoUuid
        reposUuids: $reposUuids
        searchString: $searchString
        isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
        visibilityLevel: $visibilityLevel
        orderByUnitName: $orderByUnitName
        orderByCreateDate: $orderByCreateDate
        orderByLastUpdate: $orderByLastUpdate
        offset: $offset
        limit: $limit
        unitNodeType: $unitNodeType
      }
    ) {
      count
      units {
        uuid
        visibilityLevel
        name
        createDatetime
        isAutoUpdateFromRepoUnit
        targetFirmwarePlatform
        repoBranch
        repoCommit
        unitState {
          ifconfig
          millis
          memFree
          memAlloc
          freq
          statvfs
          commitVersion
        }
        currentCommitVersion
        lastUpdateDatetime
        creatorUuid
        repoUuid
        firmwareUpdateStatus
        firmwareUpdateError
        lastFirmwareUpdateDatetime
        unitNodes {
          uuid
          type
          visibilityLevel
          isRewritableInput
          topicName
          lastUpdateDatetime
          isDataPipeActive
          dataPipeYml
          dataPipeStatus
          dataPipeError
          createDatetime
          state
          unitUuid
          creatorUuid
        }
      }
    }
  }
`;

/**
 * __useGetUnitsWithUnitNodesQuery__
 *
 * To run a query within a React component, call `useGetUnitsWithUnitNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsWithUnitNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsWithUnitNodesQuery({
 *   variables: {
 *      uuids: // value for 'uuids'
 *      creatorUuid: // value for 'creatorUuid'
 *      repoUuid: // value for 'repoUuid'
 *      reposUuids: // value for 'reposUuids'
 *      searchString: // value for 'searchString'
 *      isAutoUpdateFromRepoUnit: // value for 'isAutoUpdateFromRepoUnit'
 *      visibilityLevel: // value for 'visibilityLevel'
 *      orderByUnitName: // value for 'orderByUnitName'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      orderByLastUpdate: // value for 'orderByLastUpdate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      unitNodeType: // value for 'unitNodeType'
 *   },
 * });
 */
export function useGetUnitsWithUnitNodesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >(GetUnitsWithUnitNodesDocument, options);
}
export function useGetUnitsWithUnitNodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >(GetUnitsWithUnitNodesDocument, options);
}
export function useGetUnitsWithUnitNodesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >(GetUnitsWithUnitNodesDocument, options);
}
export type GetUnitsWithUnitNodesQueryHookResult = ReturnType<
  typeof useGetUnitsWithUnitNodesQuery
>;
export type GetUnitsWithUnitNodesLazyQueryHookResult = ReturnType<
  typeof useGetUnitsWithUnitNodesLazyQuery
>;
export type GetUnitsWithUnitNodesSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitsWithUnitNodesSuspenseQuery
>;
export type GetUnitsWithUnitNodesQueryResult = Apollo.QueryResult<
  GetUnitsWithUnitNodesQuery,
  GetUnitsWithUnitNodesQueryVariables
>;
export const GetUnitsOutputByInputDocument = gql`
  query getUnitsOutputByInput(
    $creatorUuid: UUID
    $unitNodeInputUuid: UUID
    $searchString: String
    $visibilityLevel: [VisibilityLevel!]
    $orderByUnitName: OrderByText
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUnits(
      filters: {
        creatorUuid: $creatorUuid
        unitNodeInputUuid: $unitNodeInputUuid
        searchString: $searchString
        visibilityLevel: $visibilityLevel
        orderByUnitName: $orderByUnitName
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      units {
        uuid
        visibilityLevel
        name
        createDatetime
        isAutoUpdateFromRepoUnit
        targetFirmwarePlatform
        repoBranch
        repoCommit
        unitState {
          ifconfig
          millis
          memFree
          memAlloc
          freq
          statvfs
          commitVersion
        }
        currentCommitVersion
        lastUpdateDatetime
        creatorUuid
        repoUuid
        firmwareUpdateStatus
        firmwareUpdateError
        lastFirmwareUpdateDatetime
        unitNodes {
          uuid
          type
          visibilityLevel
          isRewritableInput
          topicName
          lastUpdateDatetime
          isDataPipeActive
          dataPipeYml
          dataPipeStatus
          dataPipeError
          createDatetime
          state
          unitUuid
          creatorUuid
        }
      }
    }
  }
`;

/**
 * __useGetUnitsOutputByInputQuery__
 *
 * To run a query within a React component, call `useGetUnitsOutputByInputQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitsOutputByInputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitsOutputByInputQuery({
 *   variables: {
 *      creatorUuid: // value for 'creatorUuid'
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
export function useGetUnitsOutputByInputQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >(GetUnitsOutputByInputDocument, options);
}
export function useGetUnitsOutputByInputLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >(GetUnitsOutputByInputDocument, options);
}
export function useGetUnitsOutputByInputSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >(GetUnitsOutputByInputDocument, options);
}
export type GetUnitsOutputByInputQueryHookResult = ReturnType<
  typeof useGetUnitsOutputByInputQuery
>;
export type GetUnitsOutputByInputLazyQueryHookResult = ReturnType<
  typeof useGetUnitsOutputByInputLazyQuery
>;
export type GetUnitsOutputByInputSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitsOutputByInputSuspenseQuery
>;
export type GetUnitsOutputByInputQueryResult = Apollo.QueryResult<
  GetUnitsOutputByInputQuery,
  GetUnitsOutputByInputQueryVariables
>;
export const GetUnitLogsDocument = gql`
  query getUnitLogs(
    $uuid: UUID!
    $level: [LogLevel!]
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUnitLogs(
      filters: {
        uuid: $uuid
        level: $level
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      unitLogs {
        uuid
        level
        unitUuid
        text
        createDatetime
        expirationDatetime
      }
    }
  }
`;

/**
 * __useGetUnitLogsQuery__
 *
 * To run a query within a React component, call `useGetUnitLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitLogsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      level: // value for 'level'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUnitLogsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUnitLogsQuery,
    GetUnitLogsQueryVariables
  > &
    (
      | { variables: GetUnitLogsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnitLogsQuery, GetUnitLogsQueryVariables>(
    GetUnitLogsDocument,
    options,
  );
}
export function useGetUnitLogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitLogsQuery,
    GetUnitLogsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUnitLogsQuery, GetUnitLogsQueryVariables>(
    GetUnitLogsDocument,
    options,
  );
}
export function useGetUnitLogsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitLogsQuery,
    GetUnitLogsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUnitLogsQuery, GetUnitLogsQueryVariables>(
    GetUnitLogsDocument,
    options,
  );
}
export type GetUnitLogsQueryHookResult = ReturnType<typeof useGetUnitLogsQuery>;
export type GetUnitLogsLazyQueryHookResult = ReturnType<
  typeof useGetUnitLogsLazyQuery
>;
export type GetUnitLogsSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitLogsSuspenseQuery
>;
export type GetUnitLogsQueryResult = Apollo.QueryResult<
  GetUnitLogsQuery,
  GetUnitLogsQueryVariables
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
export const GetUnitCurrentSchemaDocument = gql`
  query getUnitCurrentSchema($uuid: UUID!) {
    getUnitCurrentSchema(uuid: $uuid)
  }
`;

/**
 * __useGetUnitCurrentSchemaQuery__
 *
 * To run a query within a React component, call `useGetUnitCurrentSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitCurrentSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitCurrentSchemaQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetUnitCurrentSchemaQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  > &
    (
      | { variables: GetUnitCurrentSchemaQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >(GetUnitCurrentSchemaDocument, options);
}
export function useGetUnitCurrentSchemaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >(GetUnitCurrentSchemaDocument, options);
}
export function useGetUnitCurrentSchemaSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >(GetUnitCurrentSchemaDocument, options);
}
export type GetUnitCurrentSchemaQueryHookResult = ReturnType<
  typeof useGetUnitCurrentSchemaQuery
>;
export type GetUnitCurrentSchemaLazyQueryHookResult = ReturnType<
  typeof useGetUnitCurrentSchemaLazyQuery
>;
export type GetUnitCurrentSchemaSuspenseQueryHookResult = ReturnType<
  typeof useGetUnitCurrentSchemaSuspenseQuery
>;
export type GetUnitCurrentSchemaQueryResult = Apollo.QueryResult<
  GetUnitCurrentSchemaQuery,
  GetUnitCurrentSchemaQueryVariables
>;
export const GetTargetVersionDocument = gql`
  query getTargetVersion($uuid: UUID!) {
    getTargetVersion(uuid: $uuid) {
      commit
      tag
    }
  }
`;

/**
 * __useGetTargetVersionQuery__
 *
 * To run a query within a React component, call `useGetTargetVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTargetVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTargetVersionQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetTargetVersionQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  > &
    (
      | { variables: GetTargetVersionQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTargetVersionQuery, GetTargetVersionQueryVariables>(
    GetTargetVersionDocument,
    options,
  );
}
export function useGetTargetVersionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  >(GetTargetVersionDocument, options);
}
export function useGetTargetVersionSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  >(GetTargetVersionDocument, options);
}
export type GetTargetVersionQueryHookResult = ReturnType<
  typeof useGetTargetVersionQuery
>;
export type GetTargetVersionLazyQueryHookResult = ReturnType<
  typeof useGetTargetVersionLazyQuery
>;
export type GetTargetVersionSuspenseQueryHookResult = ReturnType<
  typeof useGetTargetVersionSuspenseQuery
>;
export type GetTargetVersionQueryResult = Apollo.QueryResult<
  GetTargetVersionQuery,
  GetTargetVersionQueryVariables
>;
export const GetStateStorageDocument = gql`
  query getStateStorage($uuid: UUID!) {
    getStateStorage(uuid: $uuid)
  }
`;

/**
 * __useGetStateStorageQuery__
 *
 * To run a query within a React component, call `useGetStateStorageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStateStorageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStateStorageQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetStateStorageQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  > &
    (
      | { variables: GetStateStorageQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStateStorageQuery, GetStateStorageQueryVariables>(
    GetStateStorageDocument,
    options,
  );
}
export function useGetStateStorageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  >(GetStateStorageDocument, options);
}
export function useGetStateStorageSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  >(GetStateStorageDocument, options);
}
export type GetStateStorageQueryHookResult = ReturnType<
  typeof useGetStateStorageQuery
>;
export type GetStateStorageLazyQueryHookResult = ReturnType<
  typeof useGetStateStorageLazyQuery
>;
export type GetStateStorageSuspenseQueryHookResult = ReturnType<
  typeof useGetStateStorageSuspenseQuery
>;
export type GetStateStorageQueryResult = Apollo.QueryResult<
  GetStateStorageQuery,
  GetStateStorageQueryVariables
>;
export const GetUnitNodeDocument = gql`
  query getUnitNode($uuid: UUID!) {
    getUnitNode(uuid: $uuid) {
      uuid
      type
      visibilityLevel
      isRewritableInput
      topicName
      lastUpdateDatetime
      isDataPipeActive
      dataPipeYml
      dataPipeStatus
      dataPipeError
      createDatetime
      state
      unitUuid
      creatorUuid
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
    $uuids: [UUID!]
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
        uuids: $uuids
        unitUuid: $unitUuid
        searchString: $searchString
        type: $type
        visibilityLevel: $visibilityLevel
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      unitNodes {
        uuid
        type
        visibilityLevel
        isRewritableInput
        topicName
        lastUpdateDatetime
        isDataPipeActive
        dataPipeYml
        dataPipeStatus
        dataPipeError
        createDatetime
        state
        unitUuid
        creatorUuid
      }
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
 *      uuids: // value for 'uuids'
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
export const CheckDataPipeConfigDocument = gql`
  query checkDataPipeConfig($file: Upload!) {
    checkDataPipeConfig(file: $file) {
      stage
      message
    }
  }
`;

/**
 * __useCheckDataPipeConfigQuery__
 *
 * To run a query within a React component, call `useCheckDataPipeConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckDataPipeConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckDataPipeConfigQuery({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCheckDataPipeConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  > &
    (
      | { variables: CheckDataPipeConfigQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >(CheckDataPipeConfigDocument, options);
}
export function useCheckDataPipeConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >(CheckDataPipeConfigDocument, options);
}
export function useCheckDataPipeConfigSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >(CheckDataPipeConfigDocument, options);
}
export type CheckDataPipeConfigQueryHookResult = ReturnType<
  typeof useCheckDataPipeConfigQuery
>;
export type CheckDataPipeConfigLazyQueryHookResult = ReturnType<
  typeof useCheckDataPipeConfigLazyQuery
>;
export type CheckDataPipeConfigSuspenseQueryHookResult = ReturnType<
  typeof useCheckDataPipeConfigSuspenseQuery
>;
export type CheckDataPipeConfigQueryResult = Apollo.QueryResult<
  CheckDataPipeConfigQuery,
  CheckDataPipeConfigQueryVariables
>;
export const GetPipeDataDocument = gql`
  query getPipeData(
    $uuid: UUID!
    $type: ProcessingPolicyType!
    $searchString: String
    $aggregationType: [AggregationFunctions!]
    $timeWindowSize: Int
    $startAggWindowDatetime: DateTime
    $endAggWindowDatetime: DateTime
    $startCreateDatetime: DateTime
    $endCreateDatetime: DateTime
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getPipeData(
      filters: {
        uuid: $uuid
        type: $type
        searchString: $searchString
        aggregationType: $aggregationType
        timeWindowSize: $timeWindowSize
        startAggWindowDatetime: $startAggWindowDatetime
        endAggWindowDatetime: $endAggWindowDatetime
        startCreateDatetime: $startCreateDatetime
        endCreateDatetime: $endCreateDatetime
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      pipeData {
        __typename
        ... on NRecordsType {
          id
          uuid
          unitNodeUuid
          state: state
          stateType
          createDatetime
          maxCount
          size
        }
        ... on TimeWindowType {
          uuid
          unitNodeUuid
          state: state
          stateType
          createDatetime
          expirationDatetime
          size
        }
        ... on AggregationType {
          uuid
          unitNodeUuid
          state_float: state
          aggregationType
          timeWindowSize
          createDatetime
          startWindowDatetime
        }
      }
    }
  }
`;

/**
 * __useGetPipeDataQuery__
 *
 * To run a query within a React component, call `useGetPipeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPipeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPipeDataQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      type: // value for 'type'
 *      searchString: // value for 'searchString'
 *      aggregationType: // value for 'aggregationType'
 *      timeWindowSize: // value for 'timeWindowSize'
 *      startAggWindowDatetime: // value for 'startAggWindowDatetime'
 *      endAggWindowDatetime: // value for 'endAggWindowDatetime'
 *      startCreateDatetime: // value for 'startCreateDatetime'
 *      endCreateDatetime: // value for 'endCreateDatetime'
 *      orderByCreateDate: // value for 'orderByCreateDate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPipeDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPipeDataQuery,
    GetPipeDataQueryVariables
  > &
    (
      | { variables: GetPipeDataQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPipeDataQuery, GetPipeDataQueryVariables>(
    GetPipeDataDocument,
    options,
  );
}
export function useGetPipeDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPipeDataQuery,
    GetPipeDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPipeDataQuery, GetPipeDataQueryVariables>(
    GetPipeDataDocument,
    options,
  );
}
export function useGetPipeDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetPipeDataQuery,
    GetPipeDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPipeDataQuery, GetPipeDataQueryVariables>(
    GetPipeDataDocument,
    options,
  );
}
export type GetPipeDataQueryHookResult = ReturnType<typeof useGetPipeDataQuery>;
export type GetPipeDataLazyQueryHookResult = ReturnType<
  typeof useGetPipeDataLazyQuery
>;
export type GetPipeDataSuspenseQueryHookResult = ReturnType<
  typeof useGetPipeDataSuspenseQuery
>;
export type GetPipeDataQueryResult = Apollo.QueryResult<
  GetPipeDataQuery,
  GetPipeDataQueryVariables
>;
export const GetDataPipeConfigDocument = gql`
  query getDataPipeConfig($uuid: UUID!) {
    getDataPipeConfig(uuid: $uuid)
  }
`;

/**
 * __useGetDataPipeConfigQuery__
 *
 * To run a query within a React component, call `useGetDataPipeConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataPipeConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataPipeConfigQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetDataPipeConfigQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  > &
    (
      | { variables: GetDataPipeConfigQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >(GetDataPipeConfigDocument, options);
}
export function useGetDataPipeConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >(GetDataPipeConfigDocument, options);
}
export function useGetDataPipeConfigSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >(GetDataPipeConfigDocument, options);
}
export type GetDataPipeConfigQueryHookResult = ReturnType<
  typeof useGetDataPipeConfigQuery
>;
export type GetDataPipeConfigLazyQueryHookResult = ReturnType<
  typeof useGetDataPipeConfigLazyQuery
>;
export type GetDataPipeConfigSuspenseQueryHookResult = ReturnType<
  typeof useGetDataPipeConfigSuspenseQuery
>;
export type GetDataPipeConfigQueryResult = Apollo.QueryResult<
  GetDataPipeConfigQuery,
  GetDataPipeConfigQueryVariables
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
    $uuids: [UUID!]
    $searchString: String
    $role: [UserRole!]
    $status: [UserStatus!]
    $orderByCreateDate: OrderByDate
    $offset: Int
    $limit: Int
  ) {
    getUsers(
      filters: {
        uuids: $uuids
        searchString: $searchString
        role: $role
        status: $status
        orderByCreateDate: $orderByCreateDate
        offset: $offset
        limit: $limit
      }
    ) {
      count
      users {
        uuid
        role
        status
        login
        createDatetime
      }
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
 *      uuids: // value for 'uuids'
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
