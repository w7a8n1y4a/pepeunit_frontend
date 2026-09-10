// @ts-nocheck
import type {
  AggregationFunctions,
  AggregationType,
  BackendTopicCommand,
  CommitFilterInput,
  CommitType,
  CredentialStatus,
  CredentialsInput,
  CredentialsType,
  CurrentInstanceContactsType,
  CurrentInstanceMetricsType,
  CurrentInstanceSettingsType,
  CurrentInstanceStateType,
  CurrentInstanceType,
  DashboardCreateInput,
  DashboardFilterInput,
  DashboardPanelCreateInput,
  DashboardPanelType,
  DashboardPanelTypeEnum,
  DashboardPanelsResultType,
  DashboardStatus,
  DashboardType,
  DashboardsResultType,
  DataPipeFilterInput,
  DataPipeStage,
  DataPipeValidationErrorType,
  FeatureFlagsType,
  GitPlatform,
  InstanceCollectionStatus,
  InstanceCreateInput,
  InstanceFilterInput,
  InstancePublicRegistryType,
  InstanceRegistriesPageType,
  InstanceTrustStatus,
  InstanceType,
  InstanceUpdateInput,
  InstanceUrlsPageType,
  InstancesPageType,
  IntegrationTestsStatus,
  LastValueType,
  LinkUnitNodeToPanelInput,
  LogLevel,
  Mutation,
  MutationBlockUserArgs,
  MutationCreateDashboardArgs,
  MutationCreateDashboardPanelArgs,
  MutationCreateInstanceArgs,
  MutationCreatePermissionArgs,
  MutationCreateRepoArgs,
  MutationCreateRepositoryRegistryArgs,
  MutationCreateUnitArgs,
  MutationCreateUnitNodeEdgeArgs,
  MutationCreateUserArgs,
  MutationDeleteDashboardArgs,
  MutationDeleteDataPipeDataArgs,
  MutationDeleteInstanceArgs,
  MutationDeleteLinkArgs,
  MutationDeletePanelArgs,
  MutationDeletePermissionArgs,
  MutationDeleteRepoArgs,
  MutationDeleteRepositoryRegistryArgs,
  MutationDeleteUnitArgs,
  MutationDeleteUnitNodeEdgeArgs,
  MutationLinkUnitNodeToPanelArgs,
  MutationResetUnitEnvArgs,
  MutationScanInstanceArgs,
  MutationSendCommandToInputBaseTopicArgs,
  MutationSetCredentialsArgs,
  MutationSetDataPipeConfigArgs,
  MutationSetDataPipeDataCsvArgs,
  MutationSetStateStorageArgs,
  MutationSetStateUnitNodeInputArgs,
  MutationSyncDashboardArgs,
  MutationUnblockUserArgs,
  MutationUpdateInstanceArgs,
  MutationUpdateLocalRepositoryArgs,
  MutationUpdateRepoArgs,
  MutationUpdateUnitArgs,
  MutationUpdateUnitEnvArgs,
  MutationUpdateUnitNodeArgs,
  MutationUpdateUnitsFirmwareArgs,
  MutationUpdateUserArgs,
  NRecordsType,
  NRecordsTypeTimeWindowTypeAggregationTypeLastValueType,
  NoneType,
  OneRepositoryRegistryCredentialsType,
  OperationTask,
  OperationTaskFilterInput,
  OperationTaskStatus,
  OperationTaskType,
  OperationTasksResultType,
  OrderByDate,
  OrderByText,
  PermissionCreateInput,
  PermissionEntities,
  PermissionFilterInput,
  PermissionType,
  PermissionsType,
  PipeDataResultType,
  PlatformType,
  ProcessingPolicyType,
  Query,
  QueryCheckDataPipeConfigArgs,
  QueryGetAvailablePlatformsArgs,
  QueryGetBranchCommitsArgs,
  QueryGetConvertTomlToMdArgs,
  QueryGetCredentialsArgs,
  QueryGetDashboardArgs,
  QueryGetDashboardPanelsArgs,
  QueryGetDashboardsArgs,
  QueryGetDataPipeConfigArgs,
  QueryGetInstancesArgs,
  QueryGetInstancesRegistriesArgs,
  QueryGetInstancesUrlsArgs,
  QueryGetOperationTaskArgs,
  QueryGetOperationTasksArgs,
  QueryGetPipeDataArgs,
  QueryGetRepoArgs,
  QueryGetReposArgs,
  QueryGetRepositoriesRegistryArgs,
  QueryGetRepositoryRegistryArgs,
  QueryGetResourceAgentsArgs,
  QueryGetStateStorageArgs,
  QueryGetTargetVersionArgs,
  QueryGetTokenArgs,
  QueryGetUnitArgs,
  QueryGetUnitCurrentSchemaArgs,
  QueryGetUnitEnvArgs,
  QueryGetUnitLogsArgs,
  QueryGetUnitNodeArgs,
  QueryGetUnitNodesArgs,
  QueryGetUnitsArgs,
  QueryGetUserArgs,
  QueryGetUsersArgs,
  QueryGetVersionsArgs,
  RepoCreateInput,
  RepoFilterInput,
  RepoType,
  RepoUpdateInput,
  RepoVersionType,
  RepoVersionsType,
  ReposResultType,
  RepositoriesRegistryResultType,
  RepositoryRegistryCreateInput,
  RepositoryRegistryFilterInput,
  RepositoryRegistryStatus,
  RepositoryRegistryType,
  TargetVersionType,
  TimeWindowType,
  TypeInputValue,
  UnitCreateInput,
  UnitFilterInput,
  UnitFirmwareUpdateStatus,
  UnitLogFilterInput,
  UnitLogType,
  UnitLogsResultType,
  UnitNodeEdgeCreateInput,
  UnitNodeEdgeType,
  UnitNodeFilterInput,
  UnitNodeForPanelType,
  UnitNodeSetStateInput,
  UnitNodeType,
  UnitNodeTypeEnum,
  UnitNodeUpdateInput,
  UnitNodesResultType,
  UnitStateType,
  UnitType,
  UnitUpdateInput,
  UnitsResultType,
  UserAuthInput,
  UserCreateInput,
  UserFilterInput,
  UserRole,
  UserStatus,
  UserType,
  UserUpdateInput,
  UsersResultType,
  VisibilityLevel,
} from "./schemaTypes";
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type CreateDashboardMutationVariables = Exact<{
  name: string;
}>;

export type CreateDashboardMutation = {
  createDashboard: {
    uuid: string;
    grafanaUuid: string;
    name: string;
    createDatetime: string;
    dashboardUrl: string | null;
    incLastVersion: number | null;
    syncStatus: DashboardStatus | null;
    syncError: string | null;
    syncLastDatetime: string | null;
    creatorUuid: string;
  };
};

export type CreateDashboardPanelMutationVariables = Exact<{
  dashboardUuid: string;
  title: string;
  type: DashboardPanelTypeEnum;
}>;

export type CreateDashboardPanelMutation = {
  createDashboardPanel: {
    uuid: string;
    type: DashboardPanelTypeEnum;
    title: string;
    createDatetime: string;
    creatorUuid: string;
    dashboardUuid: string;
    unitNodesForPanel: Array<{
      isLastData: boolean;
      isForcedToJson: boolean;
      unitWithUnitNodeName: string;
      unitNode: {
        uuid: string;
        type: UnitNodeTypeEnum;
        visibilityLevel: VisibilityLevel;
        isRewritableInput: boolean;
        topicName: string;
        lastUpdateDatetime: string;
        isDataPipeActive: boolean;
        dataPipeYml: string | null;
        dataPipeStatus: string | null;
        dataPipeError: string | null;
        createDatetime: string;
        state: string | null;
        unitUuid: string;
        creatorUuid: string;
      };
    }>;
  };
};

export type LinkUnitNodeToPanelMutationVariables = Exact<{
  unitNodeUuid: string;
  dashboardPanelsUuid: string;
  isLastData: boolean;
  isForcedToJson: boolean;
}>;

export type LinkUnitNodeToPanelMutation = {
  linkUnitNodeToPanel: {
    isLastData: boolean;
    isForcedToJson: boolean;
    unitWithUnitNodeName: string;
    unitNode: {
      uuid: string;
      type: UnitNodeTypeEnum;
      visibilityLevel: VisibilityLevel;
      isRewritableInput: boolean;
      topicName: string;
      lastUpdateDatetime: string;
      isDataPipeActive: boolean;
      dataPipeYml: string | null;
      dataPipeStatus: string | null;
      dataPipeError: string | null;
      createDatetime: string;
      state: string | null;
      unitUuid: string;
      creatorUuid: string;
    };
  };
};

export type SyncDashboardMutationVariables = Exact<{
  uuid: string;
}>;

export type SyncDashboardMutation = {
  syncDashboard: {
    uuid: string;
    grafanaUuid: string;
    name: string;
    createDatetime: string;
    dashboardUrl: string | null;
    incLastVersion: number | null;
    syncStatus: DashboardStatus | null;
    syncError: string | null;
    syncLastDatetime: string | null;
    creatorUuid: string;
  };
};

export type DeleteDashboardMutationVariables = Exact<{
  uuid: string;
}>;

export type DeleteDashboardMutation = { deleteDashboard: { isNone: boolean } };

export type DeletePanelMutationVariables = Exact<{
  uuid: string;
}>;

export type DeletePanelMutation = { deletePanel: { isNone: boolean } };

export type DeleteLinkMutationVariables = Exact<{
  unitNodeUuid: string;
  dashboardPanelUuid: string;
}>;

export type DeleteLinkMutation = { deleteLink: { isNone: boolean } };

export type CreateInstanceMutationVariables = Exact<{
  url: string;
}>;

export type CreateInstanceMutation = {
  createInstance: {
    uuid: string;
    url: string;
    trustStatus: InstanceTrustStatus;
    lastPing: number | null;
    lastCollectionStatus: InstanceCollectionStatus | null;
    lastSuccessDatetime: string | null;
    lastAttemptDatetime: string | null;
    consecutiveSuccessCount: number;
    lastCollectionError: string | null;
    state: Record<string, unknown> | null;
    createDatetime: string;
  };
};

export type UpdateInstanceMutationVariables = Exact<{
  uuid: string;
  trustStatus: InstanceTrustStatus;
}>;

export type UpdateInstanceMutation = {
  updateInstance: {
    uuid: string;
    url: string;
    trustStatus: InstanceTrustStatus;
    lastPing: number | null;
    lastCollectionStatus: InstanceCollectionStatus | null;
    lastSuccessDatetime: string | null;
    lastAttemptDatetime: string | null;
    consecutiveSuccessCount: number;
    lastCollectionError: string | null;
    state: Record<string, unknown> | null;
    createDatetime: string;
  };
};

export type DeleteInstanceMutationVariables = Exact<{
  uuid: string;
}>;

export type DeleteInstanceMutation = { deleteInstance: { isNone: boolean } };

export type ScanInstancesMutationVariables = Exact<{ [key: string]: never }>;

export type ScanInstancesMutation = { scanInstances: { isNone: boolean } };

export type ScanInstanceMutationVariables = Exact<{
  uuid: string;
}>;

export type ScanInstanceMutation = { scanInstance: { isNone: boolean } };

export type RunIntegrationTestsMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RunIntegrationTestsMutation = {
  runIntegrationTests: { isNone: boolean };
};

export type CreatePermissionMutationVariables = Exact<{
  agentUuid: string;
  agentType: PermissionEntities;
  resourceUuid: string;
  resourceType: PermissionEntities;
}>;

export type CreatePermissionMutation = {
  createPermission: {
    uuid: string;
    agentUuid: string;
    agentType: PermissionEntities;
    resourceUuid: string;
    resourceType: PermissionEntities;
  };
};

export type DeletePermissionMutationVariables = Exact<{
  agentUuid: string;
  resourceUuid: string;
}>;

export type DeletePermissionMutation = {
  deletePermission: { isNone: boolean };
};

export type CreateRepoMutationVariables = Exact<{
  repositoryRegistryUuid: string;
  defaultBranch: string;
  visibilityLevel: VisibilityLevel;
  name: string;
  isCompilableRepo: boolean;
}>;

export type CreateRepoMutation = {
  createRepo: {
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    defaultBranch: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit: string | null;
    isOnlyTagUpdate: boolean;
    isCompilableRepo: boolean;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repositoryRegistryUuid: string;
  };
};

export type UpdateRepoMutationVariables = Exact<{
  uuid: string;
  visibilityLevel?: VisibilityLevel | null | undefined;
  name?: string | null | undefined;
  isAutoUpdateRepo?: boolean | null | undefined;
  defaultBranch?: string | null | undefined;
  defaultCommit?: string | null | undefined;
  isOnlyTagUpdate?: boolean | null | undefined;
  isCompilableRepo?: boolean | null | undefined;
}>;

export type UpdateRepoMutation = {
  updateRepo: {
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    defaultBranch: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit: string | null;
    isOnlyTagUpdate: boolean;
    isCompilableRepo: boolean;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repositoryRegistryUuid: string;
  };
};

export type UpdateUnitsFirmwareMutationVariables = Exact<{
  uuid: string;
}>;

export type UpdateUnitsFirmwareMutation = {
  updateUnitsFirmware: { isNone: boolean };
};

export type BulkUpdateMutationVariables = Exact<{ [key: string]: never }>;

export type BulkUpdateMutation = { bulkUpdate: { isNone: boolean } };

export type DeleteRepoMutationVariables = Exact<{
  uuid: string;
}>;

export type DeleteRepoMutation = { deleteRepo: { isNone: boolean } };

export type CreateRepositoryRegistryMutationVariables = Exact<{
  platform: GitPlatform;
  repositoryUrl: string;
  isPublicRepository: boolean;
  credentials?: CredentialsInput | null | undefined;
}>;

export type CreateRepositoryRegistryMutation = {
  createRepositoryRegistry: {
    uuid: string;
    platform: GitPlatform;
    repositoryUrl: string;
    isPublicRepository: boolean;
    releasesData: string | null;
    localRepositorySize: number;
    syncStatus: RepositoryRegistryStatus | null;
    syncError: string | null;
    syncLastDatetime: string | null;
    createDatetime: string;
    lastUpdateDatetime: string;
    creatorUuid: string | null;
    branches: Array<string>;
  };
};

export type SetCredentialsMutationVariables = Exact<{
  uuid: string;
  data: CredentialsInput;
}>;

export type SetCredentialsMutation = { setCredentials: { isNone: boolean } };

export type UpdateLocalRepositoryMutationVariables = Exact<{
  uuid: string;
}>;

export type UpdateLocalRepositoryMutation = {
  updateLocalRepository: { isNone: boolean };
};

export type UpdateAllRegistriesMutationVariables = Exact<{
  [key: string]: never;
}>;

export type UpdateAllRegistriesMutation = {
  updateAllRegistries: { isNone: boolean };
};

export type DeleteRepositoryRegistryMutationVariables = Exact<{
  uuid: string;
}>;

export type DeleteRepositoryRegistryMutation = {
  deleteRepositoryRegistry: { isNone: boolean };
};

export type CreateUnitMutationVariables = Exact<{
  repoUuid: string;
  visibilityLevel: VisibilityLevel;
  name: string;
  isAutoUpdateFromRepoUnit: boolean;
  repoBranch?: string | null | undefined;
  repoCommit?: string | null | undefined;
  targetFirmwarePlatform?: string | null | undefined;
}>;

export type CreateUnitMutation = {
  createUnit: {
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    targetFirmwarePlatform: string | null;
    repoBranch: string | null;
    repoCommit: string | null;
    currentCommitVersion: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    firmwareUpdateStatus: UnitFirmwareUpdateStatus | null;
    firmwareUpdateError: string | null;
    lastFirmwareUpdateDatetime: string | null;
    unitState: {
      ifconfig: Array<string>;
      millis: number | null;
      memFree: number | null;
      memAlloc: number | null;
      freq: number | null;
      statvfs: Array<number>;
      puCommitVersion: string | null;
    } | null;
  };
};

export type UpdateUnitMutationVariables = Exact<{
  uuid: string;
  visibilityLevel?: VisibilityLevel | null | undefined;
  name?: string | null | undefined;
  isAutoUpdateFromRepoUnit?: boolean | null | undefined;
  repoBranch?: string | null | undefined;
  repoCommit?: string | null | undefined;
  targetFirmwarePlatform?: string | null | undefined;
}>;

export type UpdateUnitMutation = {
  updateUnit: {
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    targetFirmwarePlatform: string | null;
    repoBranch: string | null;
    repoCommit: string | null;
    currentCommitVersion: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    firmwareUpdateStatus: UnitFirmwareUpdateStatus | null;
    firmwareUpdateError: string | null;
    lastFirmwareUpdateDatetime: string | null;
    unitState: {
      ifconfig: Array<string>;
      millis: number | null;
      memFree: number | null;
      memAlloc: number | null;
      freq: number | null;
      statvfs: Array<number>;
      puCommitVersion: string | null;
    } | null;
  };
};

export type DeleteUnitMutationVariables = Exact<{
  uuid: string;
}>;

export type DeleteUnitMutation = { deleteUnit: { isNone: boolean } };

export type UpdateUnitEnvMutationVariables = Exact<{
  uuid: string;
  envJsonStr: string;
}>;

export type UpdateUnitEnvMutation = { updateUnitEnv: { isNone: boolean } };

export type ResetUnitEnvMutationVariables = Exact<{
  uuid: string;
}>;

export type ResetUnitEnvMutation = { resetUnitEnv: { isNone: boolean } };

export type SetStateStorageMutationVariables = Exact<{
  uuid: string;
  state: string;
}>;

export type SetStateStorageMutation = { setStateStorage: { isNone: boolean } };

export type SendCommandToInputBaseTopicMutationVariables = Exact<{
  uuid: string;
  command: BackendTopicCommand;
}>;

export type SendCommandToInputBaseTopicMutation = {
  sendCommandToInputBaseTopic: { isNone: boolean };
};

export type UpdateUnitNodeMutationVariables = Exact<{
  uuid: string;
  visibilityLevel?: VisibilityLevel | null | undefined;
  isRewritableInput?: boolean | null | undefined;
  isDataPipeActive?: boolean | null | undefined;
  maxConnections?: number | null | undefined;
}>;

export type UpdateUnitNodeMutation = {
  updateUnitNode: {
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    maxConnections: number;
    lastUpdateDatetime: string;
    isDataPipeActive: boolean;
    dataPipeYml: string | null;
    dataPipeStatus: string | null;
    dataPipeError: string | null;
    createDatetime: string;
    state: string | null;
    unitUuid: string;
    creatorUuid: string;
  };
};

export type SetStateUnitNodeInputMutationVariables = Exact<{
  uuid: string;
  state: string;
}>;

export type SetStateUnitNodeInputMutation = {
  setStateUnitNodeInput: {
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    maxConnections: number;
    lastUpdateDatetime: string;
    isDataPipeActive: boolean;
    dataPipeYml: string | null;
    dataPipeStatus: string | null;
    dataPipeError: string | null;
    createDatetime: string;
    state: string | null;
    unitUuid: string;
    creatorUuid: string;
  };
};

export type CreateUnitNodeEdgeMutationVariables = Exact<{
  nodeOutputUuid: string;
  nodeInputUuid: string;
}>;

export type CreateUnitNodeEdgeMutation = {
  createUnitNodeEdge: {
    uuid: string;
    nodeOutputUuid: string;
    nodeInputUuid: string;
  };
};

export type DeleteUnitNodeEdgeMutationVariables = Exact<{
  inputUuid: string;
  outputUuid: string;
}>;

export type DeleteUnitNodeEdgeMutation = {
  deleteUnitNodeEdge: { isNone: boolean };
};

export type SetDataPipeConfigMutationVariables = Exact<{
  uuid: string;
  file: File;
}>;

export type SetDataPipeConfigMutation = {
  setDataPipeConfig: { isNone: boolean };
};

export type SetDataPipeDataCsvMutationVariables = Exact<{
  uuid: string;
  file: File;
}>;

export type SetDataPipeDataCsvMutation = {
  setDataPipeDataCsv: { isNone: boolean };
};

export type DeleteDataPipeDataMutationVariables = Exact<{
  uuid: string;
}>;

export type DeleteDataPipeDataMutation = {
  deleteDataPipeData: { isNone: boolean };
};

export type CreateUserMutationVariables = Exact<{
  login: string;
  password: string;
}>;

export type CreateUserMutation = {
  createUser: {
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    grafanaOrgName: string;
    grafanaOrgId: string | null;
    createDatetime: string;
  };
};

export type UpdateUserMutationVariables = Exact<{
  login?: string | null | undefined;
  password?: string | null | undefined;
}>;

export type UpdateUserMutation = {
  updateUser: {
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    grafanaOrgName: string;
    grafanaOrgId: string | null;
    createDatetime: string;
  };
};

export type BlockUserMutationVariables = Exact<{
  uuid: string;
}>;

export type BlockUserMutation = { blockUser: { isNone: boolean } };

export type SetGrafanaCookiesMutationVariables = Exact<{
  [key: string]: never;
}>;

export type SetGrafanaCookiesMutation = {
  setGrafanaCookies: { isNone: boolean };
};

export type DeleteUserCookiesMutationVariables = Exact<{
  [key: string]: never;
}>;

export type DeleteUserCookiesMutation = {
  deleteUserCookies: { isNone: boolean };
};

export type UnblockUserMutationVariables = Exact<{
  uuid: string;
}>;

export type UnblockUserMutation = { unblockUser: { isNone: boolean } };

export type GetDashboardQueryVariables = Exact<{
  uuid: string;
}>;

export type GetDashboardQuery = {
  getDashboard: {
    uuid: string;
    grafanaUuid: string;
    name: string;
    createDatetime: string;
    dashboardUrl: string | null;
    incLastVersion: number | null;
    syncStatus: DashboardStatus | null;
    syncError: string | null;
    syncLastDatetime: string | null;
    creatorUuid: string;
  };
};

export type GetDashboardsQueryVariables = Exact<{
  searchString?: string | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetDashboardsQuery = {
  getDashboards: {
    count: number;
    dashboards: Array<{
      uuid: string;
      grafanaUuid: string;
      name: string;
      createDatetime: string;
      dashboardUrl: string | null;
      incLastVersion: number | null;
      syncStatus: DashboardStatus | null;
      syncError: string | null;
      syncLastDatetime: string | null;
      creatorUuid: string;
    }>;
  };
};

export type GetDashboardPanelsQueryVariables = Exact<{
  uuid: string;
}>;

export type GetDashboardPanelsQuery = {
  getDashboardPanels: {
    count: number;
    panels: Array<{
      uuid: string;
      type: DashboardPanelTypeEnum;
      title: string;
      createDatetime: string;
      creatorUuid: string;
      dashboardUuid: string;
      unitNodesForPanel: Array<{
        isLastData: boolean;
        isForcedToJson: boolean;
        unitWithUnitNodeName: string;
        unitNode: {
          uuid: string;
          type: UnitNodeTypeEnum;
          visibilityLevel: VisibilityLevel;
          isRewritableInput: boolean;
          topicName: string;
          lastUpdateDatetime: string;
          isDataPipeActive: boolean;
          dataPipeYml: string | null;
          dataPipeStatus: string | null;
          dataPipeError: string | null;
          createDatetime: string;
          state: string | null;
          unitUuid: string;
          creatorUuid: string;
        };
      }>;
    }>;
  };
};

export type GetCurrentInstanceQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentInstanceQuery = {
  getCurrentInstance: {
    schemaVersion: string;
    name: string;
    version: string;
    description: string;
    license: string;
    swagger: string;
    graphql: string;
    grafana: string;
    telegramBot: string;
    featureFlags: {
      puFfTelegramBotEnable: boolean;
      puFfGrafanaIntegrationEnable: boolean;
      puFfDatapipeEnable: boolean;
      puFfDatapipeDefaultLastValueEnable: boolean;
      puFfPrometheusEnable: boolean;
      puFfFederationEnable: boolean;
    };
    settings: {
      puAuthTokenExpiration: number;
      puMinIntervalSyncRepository: number;
      puStateSendInterval: number;
      puMaxExternalRepoSize: number;
      puMaxCipherLength: number;
      puHttpTimeout: number;
      puHttpConnectTimeout: number;
      puInstanceMaxStateSize: number;
      puInstanceRetentionDays: number;
      puUnitLogExpiration: number;
      puMaxPaginationSize: number;
      puAvailableTopicSymbols: string;
      puAvailableNameEntitySymbols: string;
      puTimeWindowSizes: Array<number>;
      puMqttHost: string;
      puMqttSecure: boolean;
      puMqttPort: number;
      puMqttKeepalive: number;
      puMqttMaxClients: number;
      puMqttMaxClientConnectionRate: string;
      puMqttMaxClientIdLen: number;
      puMqttClientMaxMessagesRate: string;
      puMqttClientMaxBytesRate: string;
      puMqttMaxPayloadSize: number;
      puMqttMaxQos: number;
      puMqttMaxTopicLevels: number;
      puMqttMaxLenMessageQueue: number;
      puMqttMaxTopicAlias: number;
      puGrafanaLimitUnitNodePerOnePanel: number;
    };
    state: {
      instanceDatetime: string;
      integrationTestsDatetime: string | null;
      integrationTestsStatus: IntegrationTestsStatus | null;
      integrationTestsSuccessPercentage: number | null;
    };
    metrics: {
      userCount: number;
      repositoryRegistryCount: number;
      repoCount: number;
      unitCount: number;
      unitNodeCount: number;
      unitNodeEdgeCount: number;
    };
    contacts: { email: string; telegram: string };
  };
};

export type GetInstancesQueryVariables = Exact<{
  filters: InstanceFilterInput;
}>;

export type GetInstancesQuery = {
  getInstances: {
    totalCount: number;
    instances: Array<{
      uuid: string;
      url: string;
      trustStatus: InstanceTrustStatus;
      lastPing: number | null;
      lastCollectionStatus: InstanceCollectionStatus | null;
      lastSuccessDatetime: string | null;
      lastAttemptDatetime: string | null;
      consecutiveSuccessCount: number;
      lastCollectionError: string | null;
      state: Record<string, unknown> | null;
      createDatetime: string;
    }>;
  };
};

export type GetInstancesUrlsQueryVariables = Exact<{
  filters: InstanceFilterInput;
}>;

export type GetInstancesUrlsQuery = {
  getInstancesUrls: { totalCount: number; urls: Array<string> };
};

export type GetInstancesRegistriesQueryVariables = Exact<{
  filters: InstanceFilterInput;
}>;

export type GetInstancesRegistriesQuery = {
  getInstancesRegistries: {
    totalCount: number;
    registries: Array<{ url: string; platform: GitPlatform }>;
  };
};

export type GetOperationTaskQueryVariables = Exact<{
  uuid: string;
}>;

export type GetOperationTaskQuery = {
  getOperationTask: {
    uuid: string;
    creatorUuid: string;
    createDatetime: string;
    startDatetime: string | null;
    finishDatetime: string | null;
    status: OperationTaskStatus;
    result: string | null;
    taskType: OperationTaskType;
  };
};

export type GetOperationTasksQueryVariables = Exact<{
  filters: OperationTaskFilterInput;
}>;

export type GetOperationTasksQuery = {
  getOperationTasks: {
    count: number;
    operationTasks: Array<{
      uuid: string;
      creatorUuid: string;
      createDatetime: string;
      startDatetime: string | null;
      finishDatetime: string | null;
      status: OperationTaskStatus;
      result: string | null;
      taskType: OperationTaskType;
    }>;
  };
};

export type GetResourceAgentsQueryVariables = Exact<{
  resourceUuid: string;
  resourceType: PermissionEntities;
  agentType?: PermissionEntities | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetResourceAgentsQuery = {
  getResourceAgents: {
    count: number;
    permissions: Array<{
      uuid: string;
      agentUuid: string;
      agentType: PermissionEntities;
      resourceUuid: string;
      resourceType: PermissionEntities;
    }>;
  };
};

export type GetRepoQueryVariables = Exact<{
  uuid: string;
}>;

export type GetRepoQuery = {
  getRepo: {
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    defaultBranch: string | null;
    isAutoUpdateRepo: boolean;
    defaultCommit: string | null;
    isOnlyTagUpdate: boolean;
    isCompilableRepo: boolean;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repositoryRegistryUuid: string;
  };
};

export type GetReposQueryVariables = Exact<{
  repositoryRegistryUuid?: string | null | undefined;
  uuids?: Array<string> | string | null | undefined;
  creatorUuid?: string | null | undefined;
  creatorsUuids?: Array<string> | string | null | undefined;
  searchString?: string | null | undefined;
  isAutoUpdateRepo?: boolean | null | undefined;
  visibilityLevel?: Array<VisibilityLevel> | VisibilityLevel | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  orderByLastUpdate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetReposQuery = {
  getRepos: {
    count: number;
    repos: Array<{
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      defaultBranch: string | null;
      isAutoUpdateRepo: boolean;
      defaultCommit: string | null;
      isOnlyTagUpdate: boolean;
      isCompilableRepo: boolean;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repositoryRegistryUuid: string;
    }>;
  };
};

export type GetAvailablePlatformsQueryVariables = Exact<{
  uuid: string;
  targetTag?: string | null | undefined;
  targetCommit?: string | null | undefined;
}>;

export type GetAvailablePlatformsQuery = {
  getAvailablePlatforms: Array<{ name: string; link: string }>;
};

export type GetVersionsQueryVariables = Exact<{
  uuid: string;
}>;

export type GetVersionsQuery = {
  getVersions: {
    unitCount: number;
    versions: Array<{ commit: string; unitCount: number; tag: string | null }>;
  };
};

export type GetRepositoryRegistryQueryVariables = Exact<{
  uuid: string;
}>;

export type GetRepositoryRegistryQuery = {
  getRepositoryRegistry: {
    uuid: string;
    platform: GitPlatform;
    repositoryUrl: string;
    isPublicRepository: boolean;
    releasesData: string | null;
    localRepositorySize: number;
    syncStatus: RepositoryRegistryStatus | null;
    syncError: string | null;
    syncLastDatetime: string | null;
    createDatetime: string;
    lastUpdateDatetime: string;
    creatorUuid: string | null;
    branches: Array<string>;
  };
};

export type GetBranchCommitsQueryVariables = Exact<{
  uuid: string;
  repoBranch: string;
  onlyTag: boolean;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetBranchCommitsQuery = {
  getBranchCommits: Array<{
    commit: string;
    summary: string;
    tag: string | null;
  }>;
};

export type GetCredentialsQueryVariables = Exact<{
  uuid: string;
}>;

export type GetCredentialsQuery = {
  getCredentials: {
    status: CredentialStatus;
    credentials: { username: string; patToken: string };
  } | null;
};

export type GetRepositoriesRegistryQueryVariables = Exact<{
  uuids?: Array<string> | string | null | undefined;
  creatorUuid?: string | null | undefined;
  searchString?: string | null | undefined;
  isPublicRepository?: boolean | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  orderByLastUpdate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetRepositoriesRegistryQuery = {
  getRepositoriesRegistry: {
    count: number;
    repositoriesRegistry: Array<{
      uuid: string;
      platform: GitPlatform;
      repositoryUrl: string;
      isPublicRepository: boolean;
      releasesData: string | null;
      localRepositorySize: number;
      syncStatus: RepositoryRegistryStatus | null;
      syncError: string | null;
      syncLastDatetime: string | null;
      createDatetime: string;
      lastUpdateDatetime: string;
      creatorUuid: string | null;
      branches: Array<string>;
    }>;
  };
};

export type GetUnitQueryVariables = Exact<{
  uuid: string;
}>;

export type GetUnitQuery = {
  getUnit: {
    uuid: string;
    visibilityLevel: VisibilityLevel;
    name: string;
    createDatetime: string;
    isAutoUpdateFromRepoUnit: boolean;
    targetFirmwarePlatform: string | null;
    repoBranch: string | null;
    repoCommit: string | null;
    currentCommitVersion: string | null;
    lastUpdateDatetime: string;
    creatorUuid: string;
    repoUuid: string;
    firmwareUpdateStatus: UnitFirmwareUpdateStatus | null;
    firmwareUpdateError: string | null;
    lastFirmwareUpdateDatetime: string | null;
    unitState: {
      ifconfig: Array<string>;
      millis: number | null;
      memFree: number | null;
      memAlloc: number | null;
      freq: number | null;
      statvfs: Array<number>;
      puCommitVersion: string | null;
    } | null;
  };
};

export type GetUnitsQueryVariables = Exact<{
  uuids?: Array<string> | string | null | undefined;
  creatorUuid?: string | null | undefined;
  repoUuid?: string | null | undefined;
  reposUuids?: Array<string> | string | null | undefined;
  searchString?: string | null | undefined;
  isAutoUpdateFromRepoUnit?: boolean | null | undefined;
  visibilityLevel?: Array<VisibilityLevel> | VisibilityLevel | null | undefined;
  orderByUnitName?: OrderByText | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  orderByLastUpdate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetUnitsQuery = {
  getUnits: {
    count: number;
    units: Array<{
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      targetFirmwarePlatform: string | null;
      repoBranch: string | null;
      repoCommit: string | null;
      currentCommitVersion: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
      firmwareUpdateStatus: UnitFirmwareUpdateStatus | null;
      firmwareUpdateError: string | null;
      lastFirmwareUpdateDatetime: string | null;
      unitState: {
        ifconfig: Array<string>;
        millis: number | null;
        memFree: number | null;
        memAlloc: number | null;
        freq: number | null;
        statvfs: Array<number>;
        puCommitVersion: string | null;
      } | null;
    }>;
  };
};

export type GetUnitsWithUnitNodesQueryVariables = Exact<{
  uuids?: Array<string> | string | null | undefined;
  creatorUuid?: string | null | undefined;
  repoUuid?: string | null | undefined;
  reposUuids?: Array<string> | string | null | undefined;
  searchString?: string | null | undefined;
  isAutoUpdateFromRepoUnit?: boolean | null | undefined;
  visibilityLevel?: Array<VisibilityLevel> | VisibilityLevel | null | undefined;
  orderByUnitName?: OrderByText | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  orderByLastUpdate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
  unitNodeType?: Array<UnitNodeTypeEnum> | UnitNodeTypeEnum | null | undefined;
}>;

export type GetUnitsWithUnitNodesQuery = {
  getUnits: {
    count: number;
    units: Array<{
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      targetFirmwarePlatform: string | null;
      repoBranch: string | null;
      repoCommit: string | null;
      currentCommitVersion: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
      firmwareUpdateStatus: UnitFirmwareUpdateStatus | null;
      firmwareUpdateError: string | null;
      lastFirmwareUpdateDatetime: string | null;
      unitState: {
        ifconfig: Array<string>;
        millis: number | null;
        memFree: number | null;
        memAlloc: number | null;
        freq: number | null;
        statvfs: Array<number>;
        puCommitVersion: string | null;
      } | null;
      unitNodes: Array<{
        uuid: string;
        type: UnitNodeTypeEnum;
        visibilityLevel: VisibilityLevel;
        isRewritableInput: boolean;
        topicName: string;
        lastUpdateDatetime: string;
        isDataPipeActive: boolean;
        dataPipeYml: string | null;
        dataPipeStatus: string | null;
        dataPipeError: string | null;
        createDatetime: string;
        state: string | null;
        unitUuid: string;
        creatorUuid: string;
      }>;
    }>;
  };
};

export type GetUnitsOutputByInputQueryVariables = Exact<{
  creatorUuid?: string | null | undefined;
  unitNodeInputUuid?: string | null | undefined;
  searchString?: string | null | undefined;
  visibilityLevel?: Array<VisibilityLevel> | VisibilityLevel | null | undefined;
  orderByUnitName?: OrderByText | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetUnitsOutputByInputQuery = {
  getUnits: {
    count: number;
    units: Array<{
      uuid: string;
      visibilityLevel: VisibilityLevel;
      name: string;
      createDatetime: string;
      isAutoUpdateFromRepoUnit: boolean;
      targetFirmwarePlatform: string | null;
      repoBranch: string | null;
      repoCommit: string | null;
      currentCommitVersion: string | null;
      lastUpdateDatetime: string;
      creatorUuid: string;
      repoUuid: string;
      firmwareUpdateStatus: UnitFirmwareUpdateStatus | null;
      firmwareUpdateError: string | null;
      lastFirmwareUpdateDatetime: string | null;
      unitState: {
        ifconfig: Array<string>;
        millis: number | null;
        memFree: number | null;
        memAlloc: number | null;
        freq: number | null;
        statvfs: Array<number>;
        puCommitVersion: string | null;
      } | null;
      unitNodes: Array<{
        uuid: string;
        type: UnitNodeTypeEnum;
        visibilityLevel: VisibilityLevel;
        isRewritableInput: boolean;
        topicName: string;
        lastUpdateDatetime: string;
        isDataPipeActive: boolean;
        dataPipeYml: string | null;
        dataPipeStatus: string | null;
        dataPipeError: string | null;
        createDatetime: string;
        state: string | null;
        unitUuid: string;
        creatorUuid: string;
      }>;
    }>;
  };
};

export type GetUnitLogsQueryVariables = Exact<{
  uuid: string;
  level?: Array<LogLevel> | LogLevel | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetUnitLogsQuery = {
  getUnitLogs: {
    count: number;
    unitLogs: Array<{
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
  uuid: string;
}>;

export type GetUnitEnvQuery = { getUnitEnv: string };

export type GetUnitCurrentSchemaQueryVariables = Exact<{
  uuid: string;
}>;

export type GetUnitCurrentSchemaQuery = { getUnitCurrentSchema: string };

export type GetTargetVersionQueryVariables = Exact<{
  uuid: string;
}>;

export type GetTargetVersionQuery = {
  getTargetVersion: { commit: string; tag: string | null };
};

export type GetStateStorageQueryVariables = Exact<{
  uuid: string;
}>;

export type GetStateStorageQuery = { getStateStorage: string };

export type GetConvertTomlToMdQueryVariables = Exact<{
  file: File;
}>;

export type GetConvertTomlToMdQuery = { getConvertTomlToMd: string };

export type GetUnitNodeQueryVariables = Exact<{
  uuid: string;
}>;

export type GetUnitNodeQuery = {
  getUnitNode: {
    uuid: string;
    type: UnitNodeTypeEnum;
    visibilityLevel: VisibilityLevel;
    isRewritableInput: boolean;
    topicName: string;
    maxConnections: number;
    lastUpdateDatetime: string;
    isDataPipeActive: boolean;
    dataPipeYml: string | null;
    dataPipeStatus: string | null;
    dataPipeError: string | null;
    createDatetime: string;
    state: string | null;
    unitUuid: string;
    creatorUuid: string;
  };
};

export type GetUnitNodesQueryVariables = Exact<{
  uuids?: Array<string> | string | null | undefined;
  unitUuid?: string | null | undefined;
  searchString?: string | null | undefined;
  type?: Array<UnitNodeTypeEnum> | UnitNodeTypeEnum | null | undefined;
  visibilityLevel?: Array<VisibilityLevel> | VisibilityLevel | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetUnitNodesQuery = {
  getUnitNodes: {
    count: number;
    unitNodes: Array<{
      uuid: string;
      type: UnitNodeTypeEnum;
      visibilityLevel: VisibilityLevel;
      isRewritableInput: boolean;
      topicName: string;
      maxConnections: number;
      lastUpdateDatetime: string;
      isDataPipeActive: boolean;
      dataPipeYml: string | null;
      dataPipeStatus: string | null;
      dataPipeError: string | null;
      createDatetime: string;
      state: string | null;
      unitUuid: string;
      creatorUuid: string;
    }>;
  };
};

export type CheckDataPipeConfigQueryVariables = Exact<{
  file: File;
}>;

export type CheckDataPipeConfigQuery = {
  checkDataPipeConfig: Array<{ stage: DataPipeStage; message: string }>;
};

export type GetPipeDataQueryVariables = Exact<{
  uuid: string;
  type: ProcessingPolicyType;
  searchString?: string | null | undefined;
  aggregationType?:
    Array<AggregationFunctions> | AggregationFunctions | null | undefined;
  timeWindowSize?: number | null | undefined;
  startAggWindowDatetime?: string | null | undefined;
  endAggWindowDatetime?: string | null | undefined;
  startCreateDatetime?: string | null | undefined;
  endCreateDatetime?: string | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetPipeDataQuery = {
  getPipeData: {
    count: number;
    pipeData: Array<
      | {
          __typename: "AggregationType";
          unitNodeUuid: string;
          aggregationType: AggregationFunctions;
          timeWindowSize: number;
          createDatetime: string;
          startWindowDatetime: string;
          state_float: number;
        }
      | {
          __typename: "LastValueType";
          unitNodeUuid: string;
          lastUpdateDatetime: string;
          state: string;
        }
      | {
          __typename: "NRecordsType";
          unitNodeUuid: string;
          stateType: TypeInputValue;
          createDatetime: string;
          maxCount: number;
          size: number;
          state: string;
        }
      | {
          __typename: "TimeWindowType";
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
  uuid: string;
}>;

export type GetDataPipeConfigQuery = { getDataPipeConfig: string };

export type GetTokenQueryVariables = Exact<{
  credentials: string;
  password: string;
}>;

export type GetTokenQuery = { getToken: string };

export type GetUserQueryVariables = Exact<{
  uuid: string;
}>;

export type GetUserQuery = {
  getUser: {
    uuid: string;
    role: UserRole;
    status: UserStatus;
    login: string;
    grafanaOrgName: string;
    grafanaOrgId: string | null;
    createDatetime: string;
  };
};

export type GetUsersQueryVariables = Exact<{
  uuids?: Array<string> | string | null | undefined;
  searchString?: string | null | undefined;
  role?: Array<UserRole> | UserRole | null | undefined;
  status?: Array<UserStatus> | UserStatus | null | undefined;
  orderByCreateDate?: OrderByDate | null | undefined;
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;

export type GetUsersQuery = {
  getUsers: {
    count: number;
    users: Array<{
      uuid: string;
      role: UserRole;
      status: UserStatus;
      login: string;
      grafanaOrgName: string;
      grafanaOrgId: string | null;
      createDatetime: string;
    }>;
  };
};

export type GetVerificationUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetVerificationUserQuery = { getVerificationUser: string };

export const CreateDashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createDashboard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDashboard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "dashboard" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "name" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "grafanaUuid" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dashboardUrl" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "incLastVersion" },
                },
                { kind: "Field", name: { kind: "Name", value: "syncStatus" } },
                { kind: "Field", name: { kind: "Name", value: "syncError" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "syncLastDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDashboardMutation,
  CreateDashboardMutationVariables
>;
export const CreateDashboardPanelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createDashboardPanel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dashboardUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DashboardPanelTypeEnum" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDashboardPanel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "dashboardPanel" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dashboardUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "dashboardUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "title" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "title" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "type" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "type" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dashboardUuid" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitNodesForPanel" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitNode" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "uuid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "visibilityLevel" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "isRewritableInput",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "topicName" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "lastUpdateDatetime",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isDataPipeActive" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeYml" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeStatus" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeError" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createDatetime" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitUuid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "creatorUuid" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isLastData" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isForcedToJson" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitWithUnitNodeName" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDashboardPanelMutation,
  CreateDashboardPanelMutationVariables
>;
export const LinkUnitNodeToPanelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "linkUnitNodeToPanel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "unitNodeUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dashboardPanelsUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isLastData" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isForcedToJson" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "linkUnitNodeToPanel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "dashboard" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "unitNodeUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "unitNodeUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dashboardPanelsUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "dashboardPanelsUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isLastData" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isLastData" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isForcedToJson" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isForcedToJson" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitNode" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isRewritableInput" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "topicName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDataPipeActive" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataPipeYml" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataPipeStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataPipeError" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "isLastData" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isForcedToJson" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitWithUnitNodeName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LinkUnitNodeToPanelMutation,
  LinkUnitNodeToPanelMutationVariables
>;
export const SyncDashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "syncDashboard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "syncDashboard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "grafanaUuid" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dashboardUrl" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "incLastVersion" },
                },
                { kind: "Field", name: { kind: "Name", value: "syncStatus" } },
                { kind: "Field", name: { kind: "Name", value: "syncError" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "syncLastDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SyncDashboardMutation,
  SyncDashboardMutationVariables
>;
export const DeleteDashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteDashboard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteDashboard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDashboardMutation,
  DeleteDashboardMutationVariables
>;
export const DeletePanelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deletePanel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePanel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePanelMutation, DeletePanelMutationVariables>;
export const DeleteLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "unitNodeUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dashboardPanelUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "unitNodeUuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "unitNodeUuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dashboardPanelUuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "dashboardPanelUuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const CreateInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "instance" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "url" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "url" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "trustStatus" } },
                { kind: "Field", name: { kind: "Name", value: "lastPing" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastCollectionStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastSuccessDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastAttemptDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "consecutiveSuccessCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastCollectionError" },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInstanceMutation,
  CreateInstanceMutationVariables
>;
export const UpdateInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "trustStatus" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InstanceTrustStatus" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "instance" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "trustStatus" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "trustStatus" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "trustStatus" } },
                { kind: "Field", name: { kind: "Name", value: "lastPing" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastCollectionStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastSuccessDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastAttemptDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "consecutiveSuccessCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastCollectionError" },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateInstanceMutation,
  UpdateInstanceMutationVariables
>;
export const DeleteInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteInstanceMutation,
  DeleteInstanceMutationVariables
>;
export const ScanInstancesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "scanInstances" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "scanInstances" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ScanInstancesMutation,
  ScanInstancesMutationVariables
>;
export const ScanInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "scanInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "scanInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ScanInstanceMutation,
  ScanInstanceMutationVariables
>;
export const RunIntegrationTestsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "runIntegrationTests" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "runIntegrationTests" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RunIntegrationTestsMutation,
  RunIntegrationTestsMutationVariables
>;
export const CreatePermissionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createPermission" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "agentUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "agentType" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PermissionEntities" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "resourceUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "resourceType" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PermissionEntities" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createPermission" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "permission" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "agentUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "agentUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "agentType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "agentType" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "resourceUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "resourceUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "resourceType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "resourceType" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "agentUuid" } },
                { kind: "Field", name: { kind: "Name", value: "agentType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resourceUuid" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resourceType" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePermissionMutation,
  CreatePermissionMutationVariables
>;
export const DeletePermissionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deletePermission" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "agentUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "resourceUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePermission" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "agentUuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "agentUuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "resourceUuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "resourceUuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeletePermissionMutation,
  DeletePermissionMutationVariables
>;
export const CreateRepoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createRepo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repositoryRegistryUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "defaultBranch" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "VisibilityLevel" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isCompilableRepo" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRepo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "repo" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repositoryRegistryUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repositoryRegistryUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "defaultBranch" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "defaultBranch" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isCompilableRepo" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isCompilableRepo" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "defaultBranch" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAutoUpdateRepo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "defaultCommit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isOnlyTagUpdate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isCompilableRepo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repositoryRegistryUuid" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRepoMutation, CreateRepoMutationVariables>;
export const UpdateRepoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateRepo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "VisibilityLevel" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAutoUpdateRepo" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "defaultBranch" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "defaultCommit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isOnlyTagUpdate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isCompilableRepo" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRepo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "repo" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isAutoUpdateRepo" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isAutoUpdateRepo" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "defaultBranch" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "defaultBranch" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "defaultCommit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "defaultCommit" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isOnlyTagUpdate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isOnlyTagUpdate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isCompilableRepo" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isCompilableRepo" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "defaultBranch" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAutoUpdateRepo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "defaultCommit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isOnlyTagUpdate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isCompilableRepo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repositoryRegistryUuid" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRepoMutation, UpdateRepoMutationVariables>;
export const UpdateUnitsFirmwareDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUnitsFirmware" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUnitsFirmware" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUnitsFirmwareMutation,
  UpdateUnitsFirmwareMutationVariables
>;
export const BulkUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "bulkUpdate" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bulkUpdate" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BulkUpdateMutation, BulkUpdateMutationVariables>;
export const DeleteRepoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteRepo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRepo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRepoMutation, DeleteRepoMutationVariables>;
export const CreateRepositoryRegistryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createRepositoryRegistry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "platform" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GitPlatform" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repositoryUrl" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isPublicRepository" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "credentials" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "CredentialsInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRepositoryRegistry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "repositoryRegistry" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "platform" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "platform" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repositoryUrl" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repositoryUrl" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isPublicRepository" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isPublicRepository" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "credentials" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "credentials" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "platform" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repositoryUrl" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isPublicRepository" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "releasesData" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "localRepositorySize" },
                },
                { kind: "Field", name: { kind: "Name", value: "syncStatus" } },
                { kind: "Field", name: { kind: "Name", value: "syncError" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "syncLastDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                { kind: "Field", name: { kind: "Name", value: "branches" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateRepositoryRegistryMutation,
  CreateRepositoryRegistryMutationVariables
>;
export const SetCredentialsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setCredentials" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CredentialsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setCredentials" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetCredentialsMutation,
  SetCredentialsMutationVariables
>;
export const UpdateLocalRepositoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateLocalRepository" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateLocalRepository" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateLocalRepositoryMutation,
  UpdateLocalRepositoryMutationVariables
>;
export const UpdateAllRegistriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateAllRegistries" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAllRegistries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAllRegistriesMutation,
  UpdateAllRegistriesMutationVariables
>;
export const DeleteRepositoryRegistryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteRepositoryRegistry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRepositoryRegistry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteRepositoryRegistryMutation,
  DeleteRepositoryRegistryMutationVariables
>;
export const CreateUnitDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createUnit" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "VisibilityLevel" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoBranch" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoCommit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "targetFirmwarePlatform" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUnit" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "unit" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                      value: {
                        kind: "Variable",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "targetFirmwarePlatform" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "targetFirmwarePlatform" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoBranch" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoBranch" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoCommit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoCommit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "targetFirmwarePlatform" },
                },
                { kind: "Field", name: { kind: "Name", value: "repoBranch" } },
                { kind: "Field", name: { kind: "Name", value: "repoCommit" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitState" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ifconfig" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "millis" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memFree" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memAlloc" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "freq" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "statvfs" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puCommitVersion" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "currentCommitVersion" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                { kind: "Field", name: { kind: "Name", value: "repoUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firmwareUpdateStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firmwareUpdateError" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastFirmwareUpdateDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUnitMutation, CreateUnitMutationVariables>;
export const UpdateUnitDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUnit" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "VisibilityLevel" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoBranch" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoCommit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "targetFirmwarePlatform" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUnit" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "unit" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                      value: {
                        kind: "Variable",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "targetFirmwarePlatform" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "targetFirmwarePlatform" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoBranch" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoBranch" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoCommit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoCommit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "targetFirmwarePlatform" },
                },
                { kind: "Field", name: { kind: "Name", value: "repoBranch" } },
                { kind: "Field", name: { kind: "Name", value: "repoCommit" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitState" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ifconfig" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "millis" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memFree" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memAlloc" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "freq" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "statvfs" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puCommitVersion" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "currentCommitVersion" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                { kind: "Field", name: { kind: "Name", value: "repoUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firmwareUpdateStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firmwareUpdateError" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastFirmwareUpdateDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUnitMutation, UpdateUnitMutationVariables>;
export const DeleteUnitDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteUnit" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteUnit" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUnitMutation, DeleteUnitMutationVariables>;
export const UpdateUnitEnvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUnitEnv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "envJsonStr" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUnitEnv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "envJsonStr" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "envJsonStr" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUnitEnvMutation,
  UpdateUnitEnvMutationVariables
>;
export const ResetUnitEnvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "resetUnitEnv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetUnitEnv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetUnitEnvMutation,
  ResetUnitEnvMutationVariables
>;
export const SetStateStorageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setStateStorage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "state" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setStateStorage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "state" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "state" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetStateStorageMutation,
  SetStateStorageMutationVariables
>;
export const SendCommandToInputBaseTopicDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "sendCommandToInputBaseTopic" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "command" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BackendTopicCommand" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendCommandToInputBaseTopic" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "command" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "command" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendCommandToInputBaseTopicMutation,
  SendCommandToInputBaseTopicMutationVariables
>;
export const UpdateUnitNodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUnitNode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "VisibilityLevel" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isRewritableInput" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isDataPipeActive" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "maxConnections" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUnitNode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "unitNode" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isRewritableInput" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isRewritableInput" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isDataPipeActive" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isDataPipeActive" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "maxConnections" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "maxConnections" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isRewritableInput" },
                },
                { kind: "Field", name: { kind: "Name", value: "topicName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "maxConnections" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isDataPipeActive" },
                },
                { kind: "Field", name: { kind: "Name", value: "dataPipeYml" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dataPipeStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dataPipeError" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "unitUuid" } },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUnitNodeMutation,
  UpdateUnitNodeMutationVariables
>;
export const SetStateUnitNodeInputDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setStateUnitNodeInput" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "state" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setStateUnitNodeInput" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "unitNode" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "state" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "state" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isRewritableInput" },
                },
                { kind: "Field", name: { kind: "Name", value: "topicName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "maxConnections" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isDataPipeActive" },
                },
                { kind: "Field", name: { kind: "Name", value: "dataPipeYml" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dataPipeStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dataPipeError" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "unitUuid" } },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetStateUnitNodeInputMutation,
  SetStateUnitNodeInputMutationVariables
>;
export const CreateUnitNodeEdgeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createUnitNodeEdge" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nodeOutputUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nodeInputUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUnitNodeEdge" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "unitNodeEdge" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nodeOutputUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "nodeOutputUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nodeInputUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "nodeInputUuid" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodeOutputUuid" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodeInputUuid" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateUnitNodeEdgeMutation,
  CreateUnitNodeEdgeMutationVariables
>;
export const DeleteUnitNodeEdgeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteUnitNodeEdge" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "inputUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "outputUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteUnitNodeEdge" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "inputUuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "inputUuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "outputUuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "outputUuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteUnitNodeEdgeMutation,
  DeleteUnitNodeEdgeMutationVariables
>;
export const SetDataPipeConfigDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setDataPipeConfig" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "file" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setDataPipeConfig" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "file" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "file" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetDataPipeConfigMutation,
  SetDataPipeConfigMutationVariables
>;
export const SetDataPipeDataCsvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setDataPipeDataCsv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "file" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setDataPipeDataCsv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "file" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "file" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetDataPipeDataCsvMutation,
  SetDataPipeDataCsvMutationVariables
>;
export const DeleteDataPipeDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteDataPipeData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteDataPipeData" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDataPipeDataMutation,
  DeleteDataPipeDataMutationVariables
>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "login" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "login" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "login" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "password" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "login" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grafanaOrgName" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grafanaOrgId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "login" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "login" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "login" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "password" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "login" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grafanaOrgName" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grafanaOrgId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const BlockUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "blockUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "blockUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BlockUserMutation, BlockUserMutationVariables>;
export const SetGrafanaCookiesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setGrafanaCookies" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setGrafanaCookies" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetGrafanaCookiesMutation,
  SetGrafanaCookiesMutationVariables
>;
export const DeleteUserCookiesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteUserCookies" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteUserCookies" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteUserCookiesMutation,
  DeleteUserCookiesMutationVariables
>;
export const UnblockUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "unblockUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "unblockUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isNone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnblockUserMutation, UnblockUserMutationVariables>;
export const GetDashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDashboard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDashboard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "grafanaUuid" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dashboardUrl" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "incLastVersion" },
                },
                { kind: "Field", name: { kind: "Name", value: "syncStatus" } },
                { kind: "Field", name: { kind: "Name", value: "syncError" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "syncLastDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDashboardQuery, GetDashboardQueryVariables>;
export const GetDashboardsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDashboards" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDashboards" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dashboards" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grafanaUuid" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dashboardUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "incLastVersion" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "syncStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "syncError" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "syncLastDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDashboardsQuery, GetDashboardsQueryVariables>;
export const GetDashboardPanelsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDashboardPanels" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDashboardPanels" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "panels" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dashboardUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitNodesForPanel" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitNode" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "uuid" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "visibilityLevel",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "isRewritableInput",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "topicName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "lastUpdateDatetime",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "isDataPipeActive",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "dataPipeYml",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "dataPipeStatus",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "dataPipeError",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "createDatetime",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "state" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "unitUuid" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "creatorUuid",
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isLastData" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isForcedToJson" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "unitWithUnitNodeName",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDashboardPanelsQuery,
  GetDashboardPanelsQueryVariables
>;
export const GetCurrentInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getCurrentInstance" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCurrentInstance" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "schemaVersion" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "version" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "license" } },
                { kind: "Field", name: { kind: "Name", value: "swagger" } },
                { kind: "Field", name: { kind: "Name", value: "graphql" } },
                { kind: "Field", name: { kind: "Name", value: "grafana" } },
                { kind: "Field", name: { kind: "Name", value: "telegramBot" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "featureFlags" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puFfTelegramBotEnable" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puFfGrafanaIntegrationEnable",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puFfDatapipeEnable" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puFfDatapipeDefaultLastValueEnable",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puFfPrometheusEnable" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puFfFederationEnable" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "settings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puAuthTokenExpiration" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puMinIntervalSyncRepository",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puStateSendInterval" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMaxExternalRepoSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMaxCipherLength" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puHttpTimeout" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puHttpConnectTimeout" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puInstanceMaxStateSize" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puInstanceRetentionDays",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puUnitLogExpiration" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMaxPaginationSize" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puAvailableTopicSymbols",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puAvailableNameEntitySymbols",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puTimeWindowSizes" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttHost" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttSecure" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttPort" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttKeepalive" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttMaxClients" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puMqttMaxClientConnectionRate",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttMaxClientIdLen" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puMqttClientMaxMessagesRate",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puMqttClientMaxBytesRate",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttMaxPayloadSize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttMaxQos" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttMaxTopicLevels" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puMqttMaxLenMessageQueue",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puMqttMaxTopicAlias" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "puGrafanaLimitUnitNodePerOnePanel",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "state" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "instanceDatetime" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "integrationTestsDatetime",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "integrationTestsStatus" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "integrationTestsSuccessPercentage",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "metrics" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userCount" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "repositoryRegistryCount",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitNodeCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitNodeEdgeCount" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "contacts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "telegram" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCurrentInstanceQuery,
  GetCurrentInstanceQueryVariables
>;
export const GetInstancesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getInstances" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InstanceFilterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getInstances" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filters" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "instances" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "trustStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastPing" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastCollectionStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastSuccessDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastAttemptDatetime" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "consecutiveSuccessCount",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastCollectionError" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInstancesQuery, GetInstancesQueryVariables>;
export const GetInstancesUrlsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getInstancesUrls" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InstanceFilterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getInstancesUrls" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filters" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "urls" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetInstancesUrlsQuery,
  GetInstancesUrlsQueryVariables
>;
export const GetInstancesRegistriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getInstancesRegistries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "InstanceFilterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getInstancesRegistries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filters" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registries" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "platform" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetInstancesRegistriesQuery,
  GetInstancesRegistriesQueryVariables
>;
export const GetOperationTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getOperationTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getOperationTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "finishDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "result" } },
                { kind: "Field", name: { kind: "Name", value: "taskType" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOperationTaskQuery,
  GetOperationTaskQueryVariables
>;
export const GetOperationTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getOperationTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "OperationTaskFilterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getOperationTasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filters" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "operationTasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "finishDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "result" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "taskType" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOperationTasksQuery,
  GetOperationTasksQueryVariables
>;
export const GetResourceAgentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getResourceAgents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "resourceUuid" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "resourceType" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PermissionEntities" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "agentType" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PermissionEntities" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getResourceAgents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "resourceUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "resourceUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "resourceType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "resourceType" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "agentType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "agentType" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "permissions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "agentUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "agentType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "resourceUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "resourceType" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetResourceAgentsQuery,
  GetResourceAgentsQueryVariables
>;
export const GetRepoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getRepo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getRepo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "defaultBranch" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAutoUpdateRepo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "defaultCommit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isOnlyTagUpdate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isCompilableRepo" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repositoryRegistryUuid" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRepoQuery, GetRepoQueryVariables>;
export const GetReposDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getRepos" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repositoryRegistryUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "uuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "creatorUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "creatorsUuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAutoUpdateRepo" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "VisibilityLevel" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByLastUpdate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getRepos" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repositoryRegistryUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repositoryRegistryUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "creatorUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "creatorsUuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "creatorsUuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isAutoUpdateRepo" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isAutoUpdateRepo" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByLastUpdate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByLastUpdate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "defaultBranch" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isAutoUpdateRepo" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "defaultCommit" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isOnlyTagUpdate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isCompilableRepo" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repositoryRegistryUuid" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetReposQuery, GetReposQueryVariables>;
export const GetAvailablePlatformsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAvailablePlatforms" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "targetTag" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "targetCommit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAvailablePlatforms" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "targetTag" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "targetTag" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "targetCommit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "targetCommit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "link" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAvailablePlatformsQuery,
  GetAvailablePlatformsQueryVariables
>;
export const GetVersionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getVersions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getVersions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "unitCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "versions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "commit" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitCount" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "tag" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetVersionsQuery, GetVersionsQueryVariables>;
export const GetRepositoryRegistryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getRepositoryRegistry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getRepositoryRegistry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "platform" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repositoryUrl" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isPublicRepository" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "releasesData" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "localRepositorySize" },
                },
                { kind: "Field", name: { kind: "Name", value: "syncStatus" } },
                { kind: "Field", name: { kind: "Name", value: "syncError" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "syncLastDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                { kind: "Field", name: { kind: "Name", value: "branches" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRepositoryRegistryQuery,
  GetRepositoryRegistryQueryVariables
>;
export const GetBranchCommitsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getBranchCommits" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoBranch" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "onlyTag" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getBranchCommits" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoBranch" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoBranch" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "onlyTag" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "onlyTag" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "commit" } },
                { kind: "Field", name: { kind: "Name", value: "summary" } },
                { kind: "Field", name: { kind: "Name", value: "tag" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBranchCommitsQuery,
  GetBranchCommitsQueryVariables
>;
export const GetCredentialsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getCredentials" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCredentials" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "credentials" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "patToken" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCredentialsQuery, GetCredentialsQueryVariables>;
export const GetRepositoriesRegistryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getRepositoriesRegistry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "uuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "creatorUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isPublicRepository" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByLastUpdate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getRepositoriesRegistry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "creatorUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isPublicRepository" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "isPublicRepository" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByLastUpdate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByLastUpdate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "repositoriesRegistry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "platform" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repositoryUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isPublicRepository" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "releasesData" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "localRepositorySize" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "syncStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "syncError" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "syncLastDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "branches" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRepositoriesRegistryQuery,
  GetRepositoriesRegistryQueryVariables
>;
export const GetUnitDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnit" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnit" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "targetFirmwarePlatform" },
                },
                { kind: "Field", name: { kind: "Name", value: "repoBranch" } },
                { kind: "Field", name: { kind: "Name", value: "repoCommit" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitState" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ifconfig" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "millis" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memFree" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memAlloc" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "freq" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "statvfs" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "puCommitVersion" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "currentCommitVersion" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
                { kind: "Field", name: { kind: "Name", value: "repoUuid" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firmwareUpdateStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firmwareUpdateError" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastFirmwareUpdateDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnitQuery, GetUnitQueryVariables>;
export const GetUnitsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnits" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "uuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "creatorUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reposUuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "VisibilityLevel" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByUnitName" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByText" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByLastUpdate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnits" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "creatorUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "reposUuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "reposUuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                      value: {
                        kind: "Variable",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByUnitName" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByUnitName" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByLastUpdate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByLastUpdate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "units" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "targetFirmwarePlatform" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoBranch" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoCommit" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitState" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "ifconfig" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "millis" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memFree" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memAlloc" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "freq" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "statvfs" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "puCommitVersion" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currentCommitVersion" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firmwareUpdateStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firmwareUpdateError" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "lastFirmwareUpdateDatetime",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnitsQuery, GetUnitsQueryVariables>;
export const GetUnitsWithUnitNodesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitsWithUnitNodes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "uuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "creatorUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "repoUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reposUuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "VisibilityLevel" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByUnitName" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByText" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByLastUpdate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "unitNodeType" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UnitNodeTypeEnum" },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnits" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "creatorUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "repoUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "repoUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "reposUuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "reposUuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isAutoUpdateFromRepoUnit" },
                      value: {
                        kind: "Variable",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByUnitName" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByUnitName" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByLastUpdate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByLastUpdate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "unitNodeType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "unitNodeType" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "units" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "targetFirmwarePlatform" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoBranch" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoCommit" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitState" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "ifconfig" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "millis" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memFree" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memAlloc" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "freq" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "statvfs" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "puCommitVersion" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currentCommitVersion" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firmwareUpdateStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firmwareUpdateError" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "lastFirmwareUpdateDatetime",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitNodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "uuid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "visibilityLevel" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "isRewritableInput",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "topicName" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "lastUpdateDatetime",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isDataPipeActive" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeYml" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeStatus" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeError" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createDatetime" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitUuid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "creatorUuid" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUnitsWithUnitNodesQuery,
  GetUnitsWithUnitNodesQueryVariables
>;
export const GetUnitsOutputByInputDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitsOutputByInput" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "creatorUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "unitNodeInputUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "VisibilityLevel" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByUnitName" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByText" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnits" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "creatorUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "unitNodeInputUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "unitNodeInputUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByUnitName" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByUnitName" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "units" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "isAutoUpdateFromRepoUnit",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "targetFirmwarePlatform" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoBranch" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoCommit" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitState" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "ifconfig" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "millis" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memFree" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memAlloc" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "freq" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "statvfs" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "puCommitVersion" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currentCommitVersion" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repoUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firmwareUpdateStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firmwareUpdateError" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "lastFirmwareUpdateDatetime",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitNodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "uuid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "visibilityLevel" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "isRewritableInput",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "topicName" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "lastUpdateDatetime",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isDataPipeActive" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeYml" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeStatus" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataPipeError" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createDatetime" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitUuid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "creatorUuid" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUnitsOutputByInputQuery,
  GetUnitsOutputByInputQueryVariables
>;
export const GetUnitLogsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitLogs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "level" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "LogLevel" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnitLogs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "level" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "level" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitLogs" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      { kind: "Field", name: { kind: "Name", value: "level" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitUuid" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expirationDatetime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnitLogsQuery, GetUnitLogsQueryVariables>;
export const GetUnitEnvDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitEnv" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnitEnv" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnitEnvQuery, GetUnitEnvQueryVariables>;
export const GetUnitCurrentSchemaDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitCurrentSchema" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnitCurrentSchema" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUnitCurrentSchemaQuery,
  GetUnitCurrentSchemaQueryVariables
>;
export const GetTargetVersionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getTargetVersion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTargetVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "commit" } },
                { kind: "Field", name: { kind: "Name", value: "tag" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTargetVersionQuery,
  GetTargetVersionQueryVariables
>;
export const GetStateStorageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getStateStorage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getStateStorage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetStateStorageQuery,
  GetStateStorageQueryVariables
>;
export const GetConvertTomlToMdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getConvertTomlToMd" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "file" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getConvertTomlToMd" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "file" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "file" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetConvertTomlToMdQuery,
  GetConvertTomlToMdQueryVariables
>;
export const GetUnitNodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitNode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnitNode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityLevel" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isRewritableInput" },
                },
                { kind: "Field", name: { kind: "Name", value: "topicName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "maxConnections" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastUpdateDatetime" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isDataPipeActive" },
                },
                { kind: "Field", name: { kind: "Name", value: "dataPipeYml" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dataPipeStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dataPipeError" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "unitUuid" } },
                { kind: "Field", name: { kind: "Name", value: "creatorUuid" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnitNodeQuery, GetUnitNodeQueryVariables>;
export const GetUnitNodesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUnitNodes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "uuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "unitUuid" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UnitNodeTypeEnum" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "visibilityLevel" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "VisibilityLevel" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUnitNodes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "unitUuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "unitUuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "type" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "type" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "visibilityLevel" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "unitNodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "visibilityLevel" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isRewritableInput" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "topicName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "maxConnections" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdateDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDataPipeActive" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataPipeYml" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataPipeStatus" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataPipeError" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "unitUuid" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorUuid" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnitNodesQuery, GetUnitNodesQueryVariables>;
export const CheckDataPipeConfigDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "checkDataPipeConfig" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "file" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Upload" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkDataPipeConfig" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "file" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "file" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "stage" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckDataPipeConfigQuery,
  CheckDataPipeConfigQueryVariables
>;
export const GetPipeDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getPipeData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ProcessingPolicyType" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "aggregationType" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "AggregationFunctions" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "timeWindowSize" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startAggWindowDatetime" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endAggWindowDatetime" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startCreateDatetime" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endCreateDatetime" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getPipeData" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuid" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuid" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "type" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "type" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "aggregationType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "aggregationType" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "timeWindowSize" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "timeWindowSize" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "startAggWindowDatetime" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "startAggWindowDatetime" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "endAggWindowDatetime" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "endAggWindowDatetime" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "startCreateDatetime" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "startCreateDatetime" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "endCreateDatetime" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "endCreateDatetime" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pipeData" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "LastValueType" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitNodeUuid" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "state" },
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "lastUpdateDatetime",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "NRecordsType" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitNodeUuid" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "state" },
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "stateType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createDatetime" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "maxCount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "size" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "TimeWindowType" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitNodeUuid" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "state" },
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "stateType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createDatetime" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "expirationDatetime",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "size" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "AggregationType" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unitNodeUuid" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "state_float" },
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "aggregationType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "timeWindowSize" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createDatetime" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "startWindowDatetime",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPipeDataQuery, GetPipeDataQueryVariables>;
export const GetDataPipeConfigDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDataPipeConfig" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDataPipeConfig" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDataPipeConfigQuery,
  GetDataPipeConfigQueryVariables
>;
export const GetTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "credentials" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "credentials" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "credentials" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "password" },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTokenQuery, GetTokenQueryVariables>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "uuid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "uuid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "uuid" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "login" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grafanaOrgName" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grafanaOrgId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDatetime" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUsers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "uuids" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UUID" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UserRole" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "status" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UserStatus" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderByCreateDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderByDate" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUsers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "uuids" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "uuids" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "searchString" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "searchString" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "role" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "role" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "status" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "status" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "orderByCreateDate" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orderByCreateDate" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "offset" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "offset" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "limit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "limit" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "users" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "uuid" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "login" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grafanaOrgName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grafanaOrgId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createDatetime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetVerificationUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getVerificationUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getVerificationUser" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetVerificationUserQuery,
  GetVerificationUserQueryVariables
>;
