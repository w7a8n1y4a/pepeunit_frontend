export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  JSON: { input: Record<string, unknown>; output: Record<string, unknown> };
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
};

export enum BackendTopicCommand {
  EnvUpdate = "ENV_UPDATE",
  LogSync = "LOG_SYNC",
  Reset = "RESET",
  SchemaUpdate = "SCHEMA_UPDATE",
  Update = "UPDATE",
}

export type CommitFilterInput = {
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
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

export type CurrentInstanceContactsType = {
  __typename?: "CurrentInstanceContactsType";
  email: Scalars["String"]["output"];
  telegram: Scalars["String"]["output"];
};

export type CurrentInstanceMetricsType = {
  __typename?: "CurrentInstanceMetricsType";
  repoCount: Scalars["Int"]["output"];
  repositoryRegistryCount: Scalars["Int"]["output"];
  unitCount: Scalars["Int"]["output"];
  unitNodeCount: Scalars["Int"]["output"];
  unitNodeEdgeCount: Scalars["Int"]["output"];
  userCount: Scalars["Int"]["output"];
};

export type CurrentInstanceSettingsType = {
  __typename?: "CurrentInstanceSettingsType";
  puAuthTokenExpiration: Scalars["Int"]["output"];
  puAvailableNameEntitySymbols: Scalars["String"]["output"];
  puAvailableTopicSymbols: Scalars["String"]["output"];
  puGrafanaLimitUnitNodePerOnePanel: Scalars["Int"]["output"];
  puHttpConnectTimeout: Scalars["Float"]["output"];
  puHttpTimeout: Scalars["Float"]["output"];
  puInstanceMaxStateSize: Scalars["Int"]["output"];
  puInstanceRetentionDays: Scalars["Int"]["output"];
  puMaxCipherLength: Scalars["Int"]["output"];
  puMaxExternalRepoSize: Scalars["Int"]["output"];
  puMaxPaginationSize: Scalars["Int"]["output"];
  puMinIntervalSyncRepository: Scalars["Int"]["output"];
  puMqttClientMaxBytesRate: Scalars["String"]["output"];
  puMqttClientMaxMessagesRate: Scalars["String"]["output"];
  puMqttHost: Scalars["String"]["output"];
  puMqttKeepalive: Scalars["Int"]["output"];
  puMqttMaxClientConnectionRate: Scalars["String"]["output"];
  puMqttMaxClientIdLen: Scalars["Int"]["output"];
  puMqttMaxClients: Scalars["Int"]["output"];
  puMqttMaxLenMessageQueue: Scalars["Int"]["output"];
  puMqttMaxPayloadSize: Scalars["Int"]["output"];
  puMqttMaxQos: Scalars["Int"]["output"];
  puMqttMaxTopicAlias: Scalars["Int"]["output"];
  puMqttMaxTopicLevels: Scalars["Int"]["output"];
  puMqttPort: Scalars["Int"]["output"];
  puMqttSecure: Scalars["Boolean"]["output"];
  puStateSendInterval: Scalars["Int"]["output"];
  puTimeWindowSizes: Array<Scalars["Int"]["output"]>;
  puUnitLogExpiration: Scalars["Int"]["output"];
};

export type CurrentInstanceStateType = {
  __typename?: "CurrentInstanceStateType";
  instanceDatetime: Scalars["DateTime"]["output"];
  integrationTestsDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  integrationTestsStatus?: Maybe<IntegrationTestsStatus>;
  integrationTestsSuccessPercentage?: Maybe<Scalars["Float"]["output"]>;
};

export type CurrentInstanceType = {
  __typename?: "CurrentInstanceType";
  contacts: CurrentInstanceContactsType;
  description: Scalars["String"]["output"];
  featureFlags: FeatureFlagsType;
  grafana: Scalars["String"]["output"];
  graphql: Scalars["String"]["output"];
  license: Scalars["String"]["output"];
  metrics: CurrentInstanceMetricsType;
  name: Scalars["String"]["output"];
  schemaVersion: Scalars["String"]["output"];
  settings: CurrentInstanceSettingsType;
  state: CurrentInstanceStateType;
  swagger: Scalars["String"]["output"];
  telegramBot: Scalars["String"]["output"];
  version: Scalars["String"]["output"];
};

export type DashboardCreateInput = {
  name: Scalars["String"]["input"];
};

export type DashboardFilterInput = {
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  orderByCreateDate?: InputMaybe<OrderByDate>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
};

export type DashboardPanelCreateInput = {
  dashboardUuid: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
  type: DashboardPanelTypeEnum;
};

export type DashboardPanelType = {
  __typename?: "DashboardPanelType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  dashboardUuid: Scalars["UUID"]["output"];
  title: Scalars["String"]["output"];
  type: DashboardPanelTypeEnum;
  unitNodesForPanel: Array<UnitNodeForPanelType>;
  uuid: Scalars["UUID"]["output"];
};

export enum DashboardPanelTypeEnum {
  AlertList = "ALERT_LIST",
  AnnotationList = "ANNOTATION_LIST",
  BarChart = "BAR_CHART",
  BarGauge = "BAR_GAUGE",
  Candlestick = "CANDLESTICK",
  Canvas = "CANVAS",
  DashboardList = "DASHBOARD_LIST",
  FlameGraph = "FLAME_GRAPH",
  Gauge = "GAUGE",
  Geomap = "GEOMAP",
  Heatmap = "HEATMAP",
  Histogram = "HISTOGRAM",
  HourlyHeatmap = "HOURLY_HEATMAP",
  Logs = "LOGS",
  News = "NEWS",
  NodeGraph = "NODE_GRAPH",
  PieChart = "PIE_CHART",
  Stat = "STAT",
  StateTimeline = "STATE_TIMELINE",
  StatusHistory = "STATUS_HISTORY",
  Table = "TABLE",
  Text = "TEXT",
  TimeSeries = "TIME_SERIES",
  Traces = "TRACES",
  Trend = "TREND",
  XyChart = "XY_CHART",
}

export type DashboardPanelsResultType = {
  __typename?: "DashboardPanelsResultType";
  count: Scalars["Int"]["output"];
  panels: Array<DashboardPanelType>;
};

export enum DashboardStatus {
  Error = "ERROR",
  Processing = "PROCESSING",
  Success = "SUCCESS",
}

export type DashboardType = {
  __typename?: "DashboardType";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  dashboardUrl?: Maybe<Scalars["String"]["output"]>;
  grafanaUuid: Scalars["UUID"]["output"];
  incLastVersion?: Maybe<Scalars["Int"]["output"]>;
  name: Scalars["String"]["output"];
  syncError?: Maybe<Scalars["String"]["output"]>;
  syncLastDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  syncStatus?: Maybe<DashboardStatus>;
  uuid: Scalars["UUID"]["output"];
};

export type DashboardsResultType = {
  __typename?: "DashboardsResultType";
  count: Scalars["Int"]["output"];
  dashboards: Array<DashboardType>;
};

export type DataPipeFilterInput = {
  aggregationType?: InputMaybe<Array<AggregationFunctions>>;
  endAggWindowDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  endCreateDatetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  orderByCreateDate?: InputMaybe<OrderByDate>;
  relativeTime?: InputMaybe<Scalars["String"]["input"]>;
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

export type FeatureFlagsType = {
  __typename?: "FeatureFlagsType";
  puFfDatapipeDefaultLastValueEnable: Scalars["Boolean"]["output"];
  puFfDatapipeEnable: Scalars["Boolean"]["output"];
  puFfFederationEnable: Scalars["Boolean"]["output"];
  puFfGrafanaIntegrationEnable: Scalars["Boolean"]["output"];
  puFfPrometheusEnable: Scalars["Boolean"]["output"];
  puFfTelegramBotEnable: Scalars["Boolean"]["output"];
};

export enum GitPlatform {
  Github = "GITHUB",
  Gitlab = "GITLAB",
}

export enum InstanceCollectionStatus {
  Blocking = "BLOCKING",
  Error = "ERROR",
  Success = "SUCCESS",
  Timeout = "TIMEOUT",
}

export type InstanceCreateInput = {
  url: Scalars["String"]["input"];
};

export type InstanceFilterInput = {
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  trustStatus?: InputMaybe<Array<InstanceTrustStatus>>;
};

export type InstancePublicRegistryType = {
  __typename?: "InstancePublicRegistryType";
  platform: GitPlatform;
  url: Scalars["String"]["output"];
};

export type InstanceRegistriesPageType = {
  __typename?: "InstanceRegistriesPageType";
  registries: Array<InstancePublicRegistryType>;
  totalCount: Scalars["Int"]["output"];
};

export enum InstanceTrustStatus {
  Blocking = "BLOCKING",
  Pending = "PENDING",
  Trust = "TRUST",
}

export type InstanceType = {
  __typename?: "InstanceType";
  consecutiveSuccessCount: Scalars["Int"]["output"];
  createDatetime: Scalars["DateTime"]["output"];
  lastAttemptDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  lastCollectionError?: Maybe<Scalars["String"]["output"]>;
  lastCollectionStatus?: Maybe<InstanceCollectionStatus>;
  lastPing?: Maybe<Scalars["Float"]["output"]>;
  lastSuccessDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  state?: Maybe<Scalars["JSON"]["output"]>;
  trustStatus: InstanceTrustStatus;
  url: Scalars["String"]["output"];
  uuid: Scalars["UUID"]["output"];
};

export type InstanceUpdateInput = {
  trustStatus: InstanceTrustStatus;
};

export type InstanceUrlsPageType = {
  __typename?: "InstanceUrlsPageType";
  totalCount: Scalars["Int"]["output"];
  urls: Array<Scalars["String"]["output"]>;
};

export type InstancesPageType = {
  __typename?: "InstancesPageType";
  instances: Array<InstanceType>;
  totalCount: Scalars["Int"]["output"];
};

export enum IntegrationTestsStatus {
  Error = "ERROR",
  Running = "RUNNING",
  Success = "SUCCESS",
  Warning = "WARNING",
}

export type LastValueType = {
  __typename?: "LastValueType";
  lastUpdateDatetime: Scalars["DateTime"]["output"];
  state: Scalars["String"]["output"];
  unitNodeUuid: Scalars["UUID"]["output"];
};

export type LinkUnitNodeToPanelInput = {
  dashboardPanelsUuid: Scalars["UUID"]["input"];
  isForcedToJson: Scalars["Boolean"]["input"];
  isLastData: Scalars["Boolean"]["input"];
  unitNodeUuid: Scalars["UUID"]["input"];
};

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
  createDashboard: DashboardType;
  createDashboardPanel: DashboardPanelType;
  createInstance: InstanceType;
  createPermission: PermissionType;
  createRepo: RepoType;
  createRepositoryRegistry: RepositoryRegistryType;
  createUnit: UnitType;
  createUnitNodeEdge: UnitNodeEdgeType;
  createUser: UserType;
  deleteDashboard: NoneType;
  deleteDataPipeData: NoneType;
  deleteInstance: NoneType;
  deleteLink: NoneType;
  deletePanel: NoneType;
  deletePermission: NoneType;
  deleteRepo: NoneType;
  deleteRepositoryRegistry: NoneType;
  deleteUnit: NoneType;
  deleteUnitNodeEdge: NoneType;
  deleteUserCookies: NoneType;
  linkUnitNodeToPanel: UnitNodeForPanelType;
  resetUnitEnv: NoneType;
  runIntegrationTests: NoneType;
  scanInstance: NoneType;
  scanInstances: NoneType;
  sendCommandToInputBaseTopic: NoneType;
  setCredentials: NoneType;
  setDataPipeConfig: NoneType;
  setDataPipeDataCsv: NoneType;
  setGrafanaCookies: NoneType;
  setStateStorage: NoneType;
  setStateUnitNodeInput: UnitNodeType;
  syncDashboard: DashboardType;
  unblockUser: NoneType;
  updateAllRegistries: NoneType;
  updateInstance: InstanceType;
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

export type MutationCreateDashboardArgs = {
  dashboard: DashboardCreateInput;
};

export type MutationCreateDashboardPanelArgs = {
  dashboardPanel: DashboardPanelCreateInput;
};

export type MutationCreateInstanceArgs = {
  instance: InstanceCreateInput;
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

export type MutationDeleteDashboardArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteDataPipeDataArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteInstanceArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteLinkArgs = {
  dashboardPanelUuid: Scalars["UUID"]["input"];
  unitNodeUuid: Scalars["UUID"]["input"];
};

export type MutationDeletePanelArgs = {
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

export type MutationLinkUnitNodeToPanelArgs = {
  dashboard: LinkUnitNodeToPanelInput;
};

export type MutationResetUnitEnvArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationScanInstanceArgs = {
  uuid: Scalars["UUID"]["input"];
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

export type MutationSetDataPipeDataCsvArgs = {
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

export type MutationSyncDashboardArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUnblockUserArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateInstanceArgs = {
  instance: InstanceUpdateInput;
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
  maxCount: Scalars["Int"]["output"];
  size: Scalars["Int"]["output"];
  state: Scalars["String"]["output"];
  stateType: TypeInputValue;
  unitNodeUuid: Scalars["UUID"]["output"];
};

export type NRecordsTypeTimeWindowTypeAggregationTypeLastValueType =
  AggregationType | LastValueType | NRecordsType | TimeWindowType;

export type NoneType = {
  __typename?: "NoneType";
  isNone: Scalars["Boolean"]["output"];
};

export type OneRepositoryRegistryCredentialsType = {
  __typename?: "OneRepositoryRegistryCredentialsType";
  credentials: CredentialsType;
  status: CredentialStatus;
};

export type OperationTask = {
  __typename?: "OperationTask";
  createDatetime: Scalars["DateTime"]["output"];
  creatorUuid: Scalars["UUID"]["output"];
  finishDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  result?: Maybe<Scalars["String"]["output"]>;
  startDatetime?: Maybe<Scalars["DateTime"]["output"]>;
  status: OperationTaskStatus;
  taskType: OperationTaskType;
  uuid: Scalars["UUID"]["output"];
};

export type OperationTaskFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  status?: InputMaybe<Array<OperationTaskStatus>>;
  taskType?: InputMaybe<Array<OperationTaskType>>;
};

export enum OperationTaskStatus {
  Error = "ERROR",
  Running = "RUNNING",
  Success = "SUCCESS",
}

export enum OperationTaskType {
  IntegrationTests = "INTEGRATION_TESTS",
  ScanAllInstances = "SCAN_ALL_INSTANCES",
  ScanInstance = "SCAN_INSTANCE",
  UpdateAllRegistries = "UPDATE_ALL_REGISTRIES",
  UpdateAllUnitsFirmware = "UPDATE_ALL_UNITS_FIRMWARE",
  UpdateRegistry = "UPDATE_REGISTRY",
  UpdateUnitsFirmware = "UPDATE_UNITS_FIRMWARE",
}

export type OperationTasksResultType = {
  __typename?: "OperationTasksResultType";
  count: Scalars["Int"]["output"];
  operationTasks: Array<OperationTask>;
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
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
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
  pipeData: Array<NRecordsTypeTimeWindowTypeAggregationTypeLastValueType>;
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
  getBranchCommits: Array<CommitType>;
  getConvertTomlToMd: Scalars["String"]["output"];
  getCredentials?: Maybe<OneRepositoryRegistryCredentialsType>;
  getCurrentInstance: CurrentInstanceType;
  getDashboard: DashboardType;
  getDashboardPanels: DashboardPanelsResultType;
  getDashboards: DashboardsResultType;
  getDataPipeConfig: Scalars["String"]["output"];
  getInstances: InstancesPageType;
  getInstancesRegistries: InstanceRegistriesPageType;
  getInstancesUrls: InstanceUrlsPageType;
  getOperationTask: OperationTask;
  getOperationTasks: OperationTasksResultType;
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

export type QueryGetConvertTomlToMdArgs = {
  file: Scalars["Upload"]["input"];
};

export type QueryGetCredentialsArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetDashboardArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetDashboardPanelsArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetDashboardsArgs = {
  filters: DashboardFilterInput;
};

export type QueryGetDataPipeConfigArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetInstancesArgs = {
  filters: InstanceFilterInput;
};

export type QueryGetInstancesRegistriesArgs = {
  filters: InstanceFilterInput;
};

export type QueryGetInstancesUrlsArgs = {
  filters: InstanceFilterInput;
};

export type QueryGetOperationTaskArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetOperationTasksArgs = {
  filters: OperationTaskFilterInput;
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
  defaultBranch: Scalars["String"]["input"];
  isCompilableRepo: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  repositoryRegistryUuid: Scalars["UUID"]["input"];
  visibilityLevel: VisibilityLevel;
};

export type RepoFilterInput = {
  creatorUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  creatorsUuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  isAutoUpdateRepo?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
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
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  orderByCreateDate?: InputMaybe<OrderByDate>;
  orderByLastUpdate?: InputMaybe<OrderByDate>;
  orderByRepositoryUrl?: InputMaybe<OrderByText>;
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
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
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
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
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
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  orderByCreateDate?: InputMaybe<OrderByDate>;
  outputUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Array<UnitNodeTypeEnum>>;
  unitUuid?: InputMaybe<Scalars["UUID"]["input"]>;
  uuids?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  visibilityLevel?: InputMaybe<Array<VisibilityLevel>>;
};

export type UnitNodeForPanelType = {
  __typename?: "UnitNodeForPanelType";
  isForcedToJson: Scalars["Boolean"]["output"];
  isLastData: Scalars["Boolean"]["output"];
  unitNode: UnitNodeType;
  unitWithUnitNodeName: Scalars["String"]["output"];
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
  maxConnections: Scalars["Int"]["output"];
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
  maxConnections?: InputMaybe<Scalars["Int"]["input"]>;
  visibilityLevel?: InputMaybe<VisibilityLevel>;
};

export type UnitNodesResultType = {
  __typename?: "UnitNodesResultType";
  count: Scalars["Int"]["output"];
  unitNodes: Array<UnitNodeType>;
};

export type UnitStateType = {
  __typename?: "UnitStateType";
  freq?: Maybe<Scalars["Float"]["output"]>;
  ifconfig: Array<Scalars["String"]["output"]>;
  memAlloc?: Maybe<Scalars["Float"]["output"]>;
  memFree?: Maybe<Scalars["Float"]["output"]>;
  millis?: Maybe<Scalars["Float"]["output"]>;
  puCommitVersion?: Maybe<Scalars["String"]["output"]>;
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
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
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
  grafanaOrgId?: Maybe<Scalars["String"]["output"]>;
  grafanaOrgName: Scalars["UUID"]["output"];
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
