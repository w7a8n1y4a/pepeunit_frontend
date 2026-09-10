import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import type {
  LazyQueryHookOptions,
  MutationHookOptions,
  QueryHookOptions,
} from "@apollo/client/react";
import {
  CreateDashboardDocument,
  type CreateDashboardMutation,
  type CreateDashboardMutationVariables,
  CreateDashboardPanelDocument,
  type CreateDashboardPanelMutation,
  type CreateDashboardPanelMutationVariables,
  LinkUnitNodeToPanelDocument,
  type LinkUnitNodeToPanelMutation,
  type LinkUnitNodeToPanelMutationVariables,
  SyncDashboardDocument,
  type SyncDashboardMutation,
  type SyncDashboardMutationVariables,
  DeleteDashboardDocument,
  type DeleteDashboardMutation,
  type DeleteDashboardMutationVariables,
  DeletePanelDocument,
  type DeletePanelMutation,
  type DeletePanelMutationVariables,
  DeleteLinkDocument,
  type DeleteLinkMutation,
  type DeleteLinkMutationVariables,
  CreateInstanceDocument,
  type CreateInstanceMutation,
  type CreateInstanceMutationVariables,
  UpdateInstanceDocument,
  type UpdateInstanceMutation,
  type UpdateInstanceMutationVariables,
  DeleteInstanceDocument,
  type DeleteInstanceMutation,
  type DeleteInstanceMutationVariables,
  ScanInstancesDocument,
  type ScanInstancesMutation,
  type ScanInstancesMutationVariables,
  ScanInstanceDocument,
  type ScanInstanceMutation,
  type ScanInstanceMutationVariables,
  RunIntegrationTestsDocument,
  type RunIntegrationTestsMutation,
  type RunIntegrationTestsMutationVariables,
  CreatePermissionDocument,
  type CreatePermissionMutation,
  type CreatePermissionMutationVariables,
  DeletePermissionDocument,
  type DeletePermissionMutation,
  type DeletePermissionMutationVariables,
  CreateRepoDocument,
  type CreateRepoMutation,
  type CreateRepoMutationVariables,
  UpdateRepoDocument,
  type UpdateRepoMutation,
  type UpdateRepoMutationVariables,
  UpdateUnitsFirmwareDocument,
  type UpdateUnitsFirmwareMutation,
  type UpdateUnitsFirmwareMutationVariables,
  BulkUpdateDocument,
  type BulkUpdateMutation,
  type BulkUpdateMutationVariables,
  DeleteRepoDocument,
  type DeleteRepoMutation,
  type DeleteRepoMutationVariables,
  CreateRepositoryRegistryDocument,
  type CreateRepositoryRegistryMutation,
  type CreateRepositoryRegistryMutationVariables,
  SetCredentialsDocument,
  type SetCredentialsMutation,
  type SetCredentialsMutationVariables,
  UpdateLocalRepositoryDocument,
  type UpdateLocalRepositoryMutation,
  type UpdateLocalRepositoryMutationVariables,
  UpdateAllRegistriesDocument,
  type UpdateAllRegistriesMutation,
  type UpdateAllRegistriesMutationVariables,
  DeleteRepositoryRegistryDocument,
  type DeleteRepositoryRegistryMutation,
  type DeleteRepositoryRegistryMutationVariables,
  CreateUnitDocument,
  type CreateUnitMutation,
  type CreateUnitMutationVariables,
  UpdateUnitDocument,
  type UpdateUnitMutation,
  type UpdateUnitMutationVariables,
  DeleteUnitDocument,
  type DeleteUnitMutation,
  type DeleteUnitMutationVariables,
  UpdateUnitEnvDocument,
  type UpdateUnitEnvMutation,
  type UpdateUnitEnvMutationVariables,
  ResetUnitEnvDocument,
  type ResetUnitEnvMutation,
  type ResetUnitEnvMutationVariables,
  SetStateStorageDocument,
  type SetStateStorageMutation,
  type SetStateStorageMutationVariables,
  SendCommandToInputBaseTopicDocument,
  type SendCommandToInputBaseTopicMutation,
  type SendCommandToInputBaseTopicMutationVariables,
  UpdateUnitNodeDocument,
  type UpdateUnitNodeMutation,
  type UpdateUnitNodeMutationVariables,
  SetStateUnitNodeInputDocument,
  type SetStateUnitNodeInputMutation,
  type SetStateUnitNodeInputMutationVariables,
  CreateUnitNodeEdgeDocument,
  type CreateUnitNodeEdgeMutation,
  type CreateUnitNodeEdgeMutationVariables,
  DeleteUnitNodeEdgeDocument,
  type DeleteUnitNodeEdgeMutation,
  type DeleteUnitNodeEdgeMutationVariables,
  SetDataPipeConfigDocument,
  type SetDataPipeConfigMutation,
  type SetDataPipeConfigMutationVariables,
  SetDataPipeDataCsvDocument,
  type SetDataPipeDataCsvMutation,
  type SetDataPipeDataCsvMutationVariables,
  DeleteDataPipeDataDocument,
  type DeleteDataPipeDataMutation,
  type DeleteDataPipeDataMutationVariables,
  CreateUserDocument,
  type CreateUserMutation,
  type CreateUserMutationVariables,
  UpdateUserDocument,
  type UpdateUserMutation,
  type UpdateUserMutationVariables,
  BlockUserDocument,
  type BlockUserMutation,
  type BlockUserMutationVariables,
  SetGrafanaCookiesDocument,
  type SetGrafanaCookiesMutation,
  type SetGrafanaCookiesMutationVariables,
  DeleteUserCookiesDocument,
  type DeleteUserCookiesMutation,
  type DeleteUserCookiesMutationVariables,
  UnblockUserDocument,
  type UnblockUserMutation,
  type UnblockUserMutationVariables,
  GetDashboardDocument,
  type GetDashboardQuery,
  type GetDashboardQueryVariables,
  GetDashboardsDocument,
  type GetDashboardsQuery,
  type GetDashboardsQueryVariables,
  GetDashboardPanelsDocument,
  type GetDashboardPanelsQuery,
  type GetDashboardPanelsQueryVariables,
  GetCurrentInstanceDocument,
  type GetCurrentInstanceQuery,
  type GetCurrentInstanceQueryVariables,
  GetInstancesDocument,
  type GetInstancesQuery,
  type GetInstancesQueryVariables,
  GetInstancesUrlsDocument,
  type GetInstancesUrlsQuery,
  type GetInstancesUrlsQueryVariables,
  GetInstancesRegistriesDocument,
  type GetInstancesRegistriesQuery,
  type GetInstancesRegistriesQueryVariables,
  GetOperationTaskDocument,
  type GetOperationTaskQuery,
  type GetOperationTaskQueryVariables,
  GetOperationTasksDocument,
  type GetOperationTasksQuery,
  type GetOperationTasksQueryVariables,
  GetResourceAgentsDocument,
  type GetResourceAgentsQuery,
  type GetResourceAgentsQueryVariables,
  GetRepoDocument,
  type GetRepoQuery,
  type GetRepoQueryVariables,
  GetReposDocument,
  type GetReposQuery,
  type GetReposQueryVariables,
  GetAvailablePlatformsDocument,
  type GetAvailablePlatformsQuery,
  type GetAvailablePlatformsQueryVariables,
  GetVersionsDocument,
  type GetVersionsQuery,
  type GetVersionsQueryVariables,
  GetRepositoryRegistryDocument,
  type GetRepositoryRegistryQuery,
  type GetRepositoryRegistryQueryVariables,
  GetBranchCommitsDocument,
  type GetBranchCommitsQuery,
  type GetBranchCommitsQueryVariables,
  GetCredentialsDocument,
  type GetCredentialsQuery,
  type GetCredentialsQueryVariables,
  GetRepositoriesRegistryDocument,
  type GetRepositoriesRegistryQuery,
  type GetRepositoriesRegistryQueryVariables,
  GetUnitDocument,
  type GetUnitQuery,
  type GetUnitQueryVariables,
  GetUnitsDocument,
  type GetUnitsQuery,
  type GetUnitsQueryVariables,
  GetUnitsWithUnitNodesDocument,
  type GetUnitsWithUnitNodesQuery,
  type GetUnitsWithUnitNodesQueryVariables,
  GetUnitsOutputByInputDocument,
  type GetUnitsOutputByInputQuery,
  type GetUnitsOutputByInputQueryVariables,
  GetUnitLogsDocument,
  type GetUnitLogsQuery,
  type GetUnitLogsQueryVariables,
  GetUnitEnvDocument,
  type GetUnitEnvQuery,
  type GetUnitEnvQueryVariables,
  GetUnitCurrentSchemaDocument,
  type GetUnitCurrentSchemaQuery,
  type GetUnitCurrentSchemaQueryVariables,
  GetTargetVersionDocument,
  type GetTargetVersionQuery,
  type GetTargetVersionQueryVariables,
  GetStateStorageDocument,
  type GetStateStorageQuery,
  type GetStateStorageQueryVariables,
  GetConvertTomlToMdDocument,
  type GetConvertTomlToMdQuery,
  type GetConvertTomlToMdQueryVariables,
  GetUnitNodeDocument,
  type GetUnitNodeQuery,
  type GetUnitNodeQueryVariables,
  GetUnitNodesDocument,
  type GetUnitNodesQuery,
  type GetUnitNodesQueryVariables,
  CheckDataPipeConfigDocument,
  type CheckDataPipeConfigQuery,
  type CheckDataPipeConfigQueryVariables,
  GetPipeDataDocument,
  type GetPipeDataQuery,
  type GetPipeDataQueryVariables,
  GetDataPipeConfigDocument,
  type GetDataPipeConfigQuery,
  type GetDataPipeConfigQueryVariables,
  GetTokenDocument,
  type GetTokenQuery,
  type GetTokenQueryVariables,
  GetUserDocument,
  type GetUserQuery,
  type GetUserQueryVariables,
  GetUsersDocument,
  type GetUsersQuery,
  type GetUsersQueryVariables,
  GetVerificationUserDocument,
  type GetVerificationUserQuery,
  type GetVerificationUserQueryVariables,
} from "./generated";

export {
  CreateDashboardDocument,
  CreateDashboardPanelDocument,
  LinkUnitNodeToPanelDocument,
  SyncDashboardDocument,
  DeleteDashboardDocument,
  DeletePanelDocument,
  DeleteLinkDocument,
  CreateInstanceDocument,
  UpdateInstanceDocument,
  DeleteInstanceDocument,
  ScanInstancesDocument,
  ScanInstanceDocument,
  RunIntegrationTestsDocument,
  CreatePermissionDocument,
  DeletePermissionDocument,
  CreateRepoDocument,
  UpdateRepoDocument,
  UpdateUnitsFirmwareDocument,
  BulkUpdateDocument,
  DeleteRepoDocument,
  CreateRepositoryRegistryDocument,
  SetCredentialsDocument,
  UpdateLocalRepositoryDocument,
  UpdateAllRegistriesDocument,
  DeleteRepositoryRegistryDocument,
  CreateUnitDocument,
  UpdateUnitDocument,
  DeleteUnitDocument,
  UpdateUnitEnvDocument,
  ResetUnitEnvDocument,
  SetStateStorageDocument,
  SendCommandToInputBaseTopicDocument,
  UpdateUnitNodeDocument,
  SetStateUnitNodeInputDocument,
  CreateUnitNodeEdgeDocument,
  DeleteUnitNodeEdgeDocument,
  SetDataPipeConfigDocument,
  SetDataPipeDataCsvDocument,
  DeleteDataPipeDataDocument,
  CreateUserDocument,
  UpdateUserDocument,
  BlockUserDocument,
  SetGrafanaCookiesDocument,
  DeleteUserCookiesDocument,
  UnblockUserDocument,
  GetDashboardDocument,
  GetDashboardsDocument,
  GetDashboardPanelsDocument,
  GetCurrentInstanceDocument,
  GetInstancesDocument,
  GetInstancesUrlsDocument,
  GetInstancesRegistriesDocument,
  GetOperationTaskDocument,
  GetOperationTasksDocument,
  GetResourceAgentsDocument,
  GetRepoDocument,
  GetReposDocument,
  GetAvailablePlatformsDocument,
  GetVersionsDocument,
  GetRepositoryRegistryDocument,
  GetBranchCommitsDocument,
  GetCredentialsDocument,
  GetRepositoriesRegistryDocument,
  GetUnitDocument,
  GetUnitsDocument,
  GetUnitsWithUnitNodesDocument,
  GetUnitsOutputByInputDocument,
  GetUnitLogsDocument,
  GetUnitEnvDocument,
  GetUnitCurrentSchemaDocument,
  GetTargetVersionDocument,
  GetStateStorageDocument,
  GetConvertTomlToMdDocument,
  GetUnitNodeDocument,
  GetUnitNodesDocument,
  CheckDataPipeConfigDocument,
  GetPipeDataDocument,
  GetDataPipeConfigDocument,
  GetTokenDocument,
  GetUserDocument,
  GetUsersDocument,
  GetVerificationUserDocument,
} from "./generated";
export type {
  CreateDashboardMutation,
  CreateDashboardMutationVariables,
  CreateDashboardPanelMutation,
  CreateDashboardPanelMutationVariables,
  LinkUnitNodeToPanelMutation,
  LinkUnitNodeToPanelMutationVariables,
  SyncDashboardMutation,
  SyncDashboardMutationVariables,
  DeleteDashboardMutation,
  DeleteDashboardMutationVariables,
  DeletePanelMutation,
  DeletePanelMutationVariables,
  DeleteLinkMutation,
  DeleteLinkMutationVariables,
  CreateInstanceMutation,
  CreateInstanceMutationVariables,
  UpdateInstanceMutation,
  UpdateInstanceMutationVariables,
  DeleteInstanceMutation,
  DeleteInstanceMutationVariables,
  ScanInstancesMutation,
  ScanInstancesMutationVariables,
  ScanInstanceMutation,
  ScanInstanceMutationVariables,
  RunIntegrationTestsMutation,
  RunIntegrationTestsMutationVariables,
  CreatePermissionMutation,
  CreatePermissionMutationVariables,
  DeletePermissionMutation,
  DeletePermissionMutationVariables,
  CreateRepoMutation,
  CreateRepoMutationVariables,
  UpdateRepoMutation,
  UpdateRepoMutationVariables,
  UpdateUnitsFirmwareMutation,
  UpdateUnitsFirmwareMutationVariables,
  BulkUpdateMutation,
  BulkUpdateMutationVariables,
  DeleteRepoMutation,
  DeleteRepoMutationVariables,
  CreateRepositoryRegistryMutation,
  CreateRepositoryRegistryMutationVariables,
  SetCredentialsMutation,
  SetCredentialsMutationVariables,
  UpdateLocalRepositoryMutation,
  UpdateLocalRepositoryMutationVariables,
  UpdateAllRegistriesMutation,
  UpdateAllRegistriesMutationVariables,
  DeleteRepositoryRegistryMutation,
  DeleteRepositoryRegistryMutationVariables,
  CreateUnitMutation,
  CreateUnitMutationVariables,
  UpdateUnitMutation,
  UpdateUnitMutationVariables,
  DeleteUnitMutation,
  DeleteUnitMutationVariables,
  UpdateUnitEnvMutation,
  UpdateUnitEnvMutationVariables,
  ResetUnitEnvMutation,
  ResetUnitEnvMutationVariables,
  SetStateStorageMutation,
  SetStateStorageMutationVariables,
  SendCommandToInputBaseTopicMutation,
  SendCommandToInputBaseTopicMutationVariables,
  UpdateUnitNodeMutation,
  UpdateUnitNodeMutationVariables,
  SetStateUnitNodeInputMutation,
  SetStateUnitNodeInputMutationVariables,
  CreateUnitNodeEdgeMutation,
  CreateUnitNodeEdgeMutationVariables,
  DeleteUnitNodeEdgeMutation,
  DeleteUnitNodeEdgeMutationVariables,
  SetDataPipeConfigMutation,
  SetDataPipeConfigMutationVariables,
  SetDataPipeDataCsvMutation,
  SetDataPipeDataCsvMutationVariables,
  DeleteDataPipeDataMutation,
  DeleteDataPipeDataMutationVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  BlockUserMutation,
  BlockUserMutationVariables,
  SetGrafanaCookiesMutation,
  SetGrafanaCookiesMutationVariables,
  DeleteUserCookiesMutation,
  DeleteUserCookiesMutationVariables,
  UnblockUserMutation,
  UnblockUserMutationVariables,
  GetDashboardQuery,
  GetDashboardQueryVariables,
  GetDashboardsQuery,
  GetDashboardsQueryVariables,
  GetDashboardPanelsQuery,
  GetDashboardPanelsQueryVariables,
  GetCurrentInstanceQuery,
  GetCurrentInstanceQueryVariables,
  GetInstancesQuery,
  GetInstancesQueryVariables,
  GetInstancesUrlsQuery,
  GetInstancesUrlsQueryVariables,
  GetInstancesRegistriesQuery,
  GetInstancesRegistriesQueryVariables,
  GetOperationTaskQuery,
  GetOperationTaskQueryVariables,
  GetOperationTasksQuery,
  GetOperationTasksQueryVariables,
  GetResourceAgentsQuery,
  GetResourceAgentsQueryVariables,
  GetRepoQuery,
  GetRepoQueryVariables,
  GetReposQuery,
  GetReposQueryVariables,
  GetAvailablePlatformsQuery,
  GetAvailablePlatformsQueryVariables,
  GetVersionsQuery,
  GetVersionsQueryVariables,
  GetRepositoryRegistryQuery,
  GetRepositoryRegistryQueryVariables,
  GetBranchCommitsQuery,
  GetBranchCommitsQueryVariables,
  GetCredentialsQuery,
  GetCredentialsQueryVariables,
  GetRepositoriesRegistryQuery,
  GetRepositoriesRegistryQueryVariables,
  GetUnitQuery,
  GetUnitQueryVariables,
  GetUnitsQuery,
  GetUnitsQueryVariables,
  GetUnitsWithUnitNodesQuery,
  GetUnitsWithUnitNodesQueryVariables,
  GetUnitsOutputByInputQuery,
  GetUnitsOutputByInputQueryVariables,
  GetUnitLogsQuery,
  GetUnitLogsQueryVariables,
  GetUnitEnvQuery,
  GetUnitEnvQueryVariables,
  GetUnitCurrentSchemaQuery,
  GetUnitCurrentSchemaQueryVariables,
  GetTargetVersionQuery,
  GetTargetVersionQueryVariables,
  GetStateStorageQuery,
  GetStateStorageQueryVariables,
  GetConvertTomlToMdQuery,
  GetConvertTomlToMdQueryVariables,
  GetUnitNodeQuery,
  GetUnitNodeQueryVariables,
  GetUnitNodesQuery,
  GetUnitNodesQueryVariables,
  CheckDataPipeConfigQuery,
  CheckDataPipeConfigQueryVariables,
  GetPipeDataQuery,
  GetPipeDataQueryVariables,
  GetDataPipeConfigQuery,
  GetDataPipeConfigQueryVariables,
  GetTokenQuery,
  GetTokenQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
  GetUsersQuery,
  GetUsersQueryVariables,
  GetVerificationUserQuery,
  GetVerificationUserQueryVariables,
} from "./generated";

export function useCreateDashboardMutation(
  options?: MutationHookOptions<
    CreateDashboardMutation,
    CreateDashboardMutationVariables
  >,
) {
  return useMutation(CreateDashboardDocument, options as any);
}

export function useCreateDashboardPanelMutation(
  options?: MutationHookOptions<
    CreateDashboardPanelMutation,
    CreateDashboardPanelMutationVariables
  >,
) {
  return useMutation(CreateDashboardPanelDocument, options as any);
}

export function useLinkUnitNodeToPanelMutation(
  options?: MutationHookOptions<
    LinkUnitNodeToPanelMutation,
    LinkUnitNodeToPanelMutationVariables
  >,
) {
  return useMutation(LinkUnitNodeToPanelDocument, options as any);
}

export function useSyncDashboardMutation(
  options?: MutationHookOptions<
    SyncDashboardMutation,
    SyncDashboardMutationVariables
  >,
) {
  return useMutation(SyncDashboardDocument, options as any);
}

export function useDeleteDashboardMutation(
  options?: MutationHookOptions<
    DeleteDashboardMutation,
    DeleteDashboardMutationVariables
  >,
) {
  return useMutation(DeleteDashboardDocument, options as any);
}

export function useDeletePanelMutation(
  options?: MutationHookOptions<
    DeletePanelMutation,
    DeletePanelMutationVariables
  >,
) {
  return useMutation(DeletePanelDocument, options as any);
}

export function useDeleteLinkMutation(
  options?: MutationHookOptions<
    DeleteLinkMutation,
    DeleteLinkMutationVariables
  >,
) {
  return useMutation(DeleteLinkDocument, options as any);
}

export function useCreateInstanceMutation(
  options?: MutationHookOptions<
    CreateInstanceMutation,
    CreateInstanceMutationVariables
  >,
) {
  return useMutation(CreateInstanceDocument, options as any);
}

export function useUpdateInstanceMutation(
  options?: MutationHookOptions<
    UpdateInstanceMutation,
    UpdateInstanceMutationVariables
  >,
) {
  return useMutation(UpdateInstanceDocument, options as any);
}

export function useDeleteInstanceMutation(
  options?: MutationHookOptions<
    DeleteInstanceMutation,
    DeleteInstanceMutationVariables
  >,
) {
  return useMutation(DeleteInstanceDocument, options as any);
}

export function useScanInstancesMutation(
  options?: MutationHookOptions<
    ScanInstancesMutation,
    ScanInstancesMutationVariables
  >,
) {
  return useMutation(ScanInstancesDocument, options as any);
}

export function useScanInstanceMutation(
  options?: MutationHookOptions<
    ScanInstanceMutation,
    ScanInstanceMutationVariables
  >,
) {
  return useMutation(ScanInstanceDocument, options as any);
}

export function useRunIntegrationTestsMutation(
  options?: MutationHookOptions<
    RunIntegrationTestsMutation,
    RunIntegrationTestsMutationVariables
  >,
) {
  return useMutation(RunIntegrationTestsDocument, options as any);
}

export function useCreatePermissionMutation(
  options?: MutationHookOptions<
    CreatePermissionMutation,
    CreatePermissionMutationVariables
  >,
) {
  return useMutation(CreatePermissionDocument, options as any);
}

export function useDeletePermissionMutation(
  options?: MutationHookOptions<
    DeletePermissionMutation,
    DeletePermissionMutationVariables
  >,
) {
  return useMutation(DeletePermissionDocument, options as any);
}

export function useCreateRepoMutation(
  options?: MutationHookOptions<
    CreateRepoMutation,
    CreateRepoMutationVariables
  >,
) {
  return useMutation(CreateRepoDocument, options as any);
}

export function useUpdateRepoMutation(
  options?: MutationHookOptions<
    UpdateRepoMutation,
    UpdateRepoMutationVariables
  >,
) {
  return useMutation(UpdateRepoDocument, options as any);
}

export function useUpdateUnitsFirmwareMutation(
  options?: MutationHookOptions<
    UpdateUnitsFirmwareMutation,
    UpdateUnitsFirmwareMutationVariables
  >,
) {
  return useMutation(UpdateUnitsFirmwareDocument, options as any);
}

export function useBulkUpdateMutation(
  options?: MutationHookOptions<
    BulkUpdateMutation,
    BulkUpdateMutationVariables
  >,
) {
  return useMutation(BulkUpdateDocument, options as any);
}

export function useDeleteRepoMutation(
  options?: MutationHookOptions<
    DeleteRepoMutation,
    DeleteRepoMutationVariables
  >,
) {
  return useMutation(DeleteRepoDocument, options as any);
}

export function useCreateRepositoryRegistryMutation(
  options?: MutationHookOptions<
    CreateRepositoryRegistryMutation,
    CreateRepositoryRegistryMutationVariables
  >,
) {
  return useMutation(CreateRepositoryRegistryDocument, options as any);
}

export function useSetCredentialsMutation(
  options?: MutationHookOptions<
    SetCredentialsMutation,
    SetCredentialsMutationVariables
  >,
) {
  return useMutation(SetCredentialsDocument, options as any);
}

export function useUpdateLocalRepositoryMutation(
  options?: MutationHookOptions<
    UpdateLocalRepositoryMutation,
    UpdateLocalRepositoryMutationVariables
  >,
) {
  return useMutation(UpdateLocalRepositoryDocument, options as any);
}

export function useUpdateAllRegistriesMutation(
  options?: MutationHookOptions<
    UpdateAllRegistriesMutation,
    UpdateAllRegistriesMutationVariables
  >,
) {
  return useMutation(UpdateAllRegistriesDocument, options as any);
}

export function useDeleteRepositoryRegistryMutation(
  options?: MutationHookOptions<
    DeleteRepositoryRegistryMutation,
    DeleteRepositoryRegistryMutationVariables
  >,
) {
  return useMutation(DeleteRepositoryRegistryDocument, options as any);
}

export function useCreateUnitMutation(
  options?: MutationHookOptions<
    CreateUnitMutation,
    CreateUnitMutationVariables
  >,
) {
  return useMutation(CreateUnitDocument, options as any);
}

export function useUpdateUnitMutation(
  options?: MutationHookOptions<
    UpdateUnitMutation,
    UpdateUnitMutationVariables
  >,
) {
  return useMutation(UpdateUnitDocument, options as any);
}

export function useDeleteUnitMutation(
  options?: MutationHookOptions<
    DeleteUnitMutation,
    DeleteUnitMutationVariables
  >,
) {
  return useMutation(DeleteUnitDocument, options as any);
}

export function useUpdateUnitEnvMutation(
  options?: MutationHookOptions<
    UpdateUnitEnvMutation,
    UpdateUnitEnvMutationVariables
  >,
) {
  return useMutation(UpdateUnitEnvDocument, options as any);
}

export function useResetUnitEnvMutation(
  options?: MutationHookOptions<
    ResetUnitEnvMutation,
    ResetUnitEnvMutationVariables
  >,
) {
  return useMutation(ResetUnitEnvDocument, options as any);
}

export function useSetStateStorageMutation(
  options?: MutationHookOptions<
    SetStateStorageMutation,
    SetStateStorageMutationVariables
  >,
) {
  return useMutation(SetStateStorageDocument, options as any);
}

export function useSendCommandToInputBaseTopicMutation(
  options?: MutationHookOptions<
    SendCommandToInputBaseTopicMutation,
    SendCommandToInputBaseTopicMutationVariables
  >,
) {
  return useMutation(SendCommandToInputBaseTopicDocument, options as any);
}

export function useUpdateUnitNodeMutation(
  options?: MutationHookOptions<
    UpdateUnitNodeMutation,
    UpdateUnitNodeMutationVariables
  >,
) {
  return useMutation(UpdateUnitNodeDocument, options as any);
}

export function useSetStateUnitNodeInputMutation(
  options?: MutationHookOptions<
    SetStateUnitNodeInputMutation,
    SetStateUnitNodeInputMutationVariables
  >,
) {
  return useMutation(SetStateUnitNodeInputDocument, options as any);
}

export function useCreateUnitNodeEdgeMutation(
  options?: MutationHookOptions<
    CreateUnitNodeEdgeMutation,
    CreateUnitNodeEdgeMutationVariables
  >,
) {
  return useMutation(CreateUnitNodeEdgeDocument, options as any);
}

export function useDeleteUnitNodeEdgeMutation(
  options?: MutationHookOptions<
    DeleteUnitNodeEdgeMutation,
    DeleteUnitNodeEdgeMutationVariables
  >,
) {
  return useMutation(DeleteUnitNodeEdgeDocument, options as any);
}

export function useSetDataPipeConfigMutation(
  options?: MutationHookOptions<
    SetDataPipeConfigMutation,
    SetDataPipeConfigMutationVariables
  >,
) {
  return useMutation(SetDataPipeConfigDocument, options as any);
}

export function useSetDataPipeDataCsvMutation(
  options?: MutationHookOptions<
    SetDataPipeDataCsvMutation,
    SetDataPipeDataCsvMutationVariables
  >,
) {
  return useMutation(SetDataPipeDataCsvDocument, options as any);
}

export function useDeleteDataPipeDataMutation(
  options?: MutationHookOptions<
    DeleteDataPipeDataMutation,
    DeleteDataPipeDataMutationVariables
  >,
) {
  return useMutation(DeleteDataPipeDataDocument, options as any);
}

export function useCreateUserMutation(
  options?: MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  return useMutation(CreateUserDocument, options as any);
}

export function useUpdateUserMutation(
  options?: MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return useMutation(UpdateUserDocument, options as any);
}

export function useBlockUserMutation(
  options?: MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>,
) {
  return useMutation(BlockUserDocument, options as any);
}

export function useSetGrafanaCookiesMutation(
  options?: MutationHookOptions<
    SetGrafanaCookiesMutation,
    SetGrafanaCookiesMutationVariables
  >,
) {
  return useMutation(SetGrafanaCookiesDocument, options as any);
}

export function useDeleteUserCookiesMutation(
  options?: MutationHookOptions<
    DeleteUserCookiesMutation,
    DeleteUserCookiesMutationVariables
  >,
) {
  return useMutation(DeleteUserCookiesDocument, options as any);
}

export function useUnblockUserMutation(
  options?: MutationHookOptions<
    UnblockUserMutation,
    UnblockUserMutationVariables
  >,
) {
  return useMutation(UnblockUserDocument, options as any);
}

export function useGetDashboardQuery(
  options?: QueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>,
) {
  return useQuery(GetDashboardDocument, options as any);
}

export function useGetDashboardLazyQuery(
  options?: LazyQueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>,
) {
  return useLazyQuery(GetDashboardDocument, options as any);
}

export function useGetDashboardsQuery(
  options?: QueryHookOptions<GetDashboardsQuery, GetDashboardsQueryVariables>,
) {
  return useQuery(GetDashboardsDocument, options as any);
}

export function useGetDashboardsLazyQuery(
  options?: LazyQueryHookOptions<
    GetDashboardsQuery,
    GetDashboardsQueryVariables
  >,
) {
  return useLazyQuery(GetDashboardsDocument, options as any);
}

export function useGetDashboardPanelsQuery(
  options?: QueryHookOptions<
    GetDashboardPanelsQuery,
    GetDashboardPanelsQueryVariables
  >,
) {
  return useQuery(GetDashboardPanelsDocument, options as any);
}

export function useGetDashboardPanelsLazyQuery(
  options?: LazyQueryHookOptions<
    GetDashboardPanelsQuery,
    GetDashboardPanelsQueryVariables
  >,
) {
  return useLazyQuery(GetDashboardPanelsDocument, options as any);
}

export function useGetCurrentInstanceQuery(
  options?: QueryHookOptions<
    GetCurrentInstanceQuery,
    GetCurrentInstanceQueryVariables
  >,
) {
  return useQuery(GetCurrentInstanceDocument, options as any);
}

export function useGetCurrentInstanceLazyQuery(
  options?: LazyQueryHookOptions<
    GetCurrentInstanceQuery,
    GetCurrentInstanceQueryVariables
  >,
) {
  return useLazyQuery(GetCurrentInstanceDocument, options as any);
}

export function useGetInstancesQuery(
  options?: QueryHookOptions<GetInstancesQuery, GetInstancesQueryVariables>,
) {
  return useQuery(GetInstancesDocument, options as any);
}

export function useGetInstancesLazyQuery(
  options?: LazyQueryHookOptions<GetInstancesQuery, GetInstancesQueryVariables>,
) {
  return useLazyQuery(GetInstancesDocument, options as any);
}

export function useGetInstancesUrlsQuery(
  options?: QueryHookOptions<
    GetInstancesUrlsQuery,
    GetInstancesUrlsQueryVariables
  >,
) {
  return useQuery(GetInstancesUrlsDocument, options as any);
}

export function useGetInstancesUrlsLazyQuery(
  options?: LazyQueryHookOptions<
    GetInstancesUrlsQuery,
    GetInstancesUrlsQueryVariables
  >,
) {
  return useLazyQuery(GetInstancesUrlsDocument, options as any);
}

export function useGetInstancesRegistriesQuery(
  options?: QueryHookOptions<
    GetInstancesRegistriesQuery,
    GetInstancesRegistriesQueryVariables
  >,
) {
  return useQuery(GetInstancesRegistriesDocument, options as any);
}

export function useGetInstancesRegistriesLazyQuery(
  options?: LazyQueryHookOptions<
    GetInstancesRegistriesQuery,
    GetInstancesRegistriesQueryVariables
  >,
) {
  return useLazyQuery(GetInstancesRegistriesDocument, options as any);
}

export function useGetOperationTaskQuery(
  options?: QueryHookOptions<
    GetOperationTaskQuery,
    GetOperationTaskQueryVariables
  >,
) {
  return useQuery(GetOperationTaskDocument, options as any);
}

export function useGetOperationTaskLazyQuery(
  options?: LazyQueryHookOptions<
    GetOperationTaskQuery,
    GetOperationTaskQueryVariables
  >,
) {
  return useLazyQuery(GetOperationTaskDocument, options as any);
}

export function useGetOperationTasksQuery(
  options?: QueryHookOptions<
    GetOperationTasksQuery,
    GetOperationTasksQueryVariables
  >,
) {
  return useQuery(GetOperationTasksDocument, options as any);
}

export function useGetOperationTasksLazyQuery(
  options?: LazyQueryHookOptions<
    GetOperationTasksQuery,
    GetOperationTasksQueryVariables
  >,
) {
  return useLazyQuery(GetOperationTasksDocument, options as any);
}

export function useGetResourceAgentsQuery(
  options?: QueryHookOptions<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >,
) {
  return useQuery(GetResourceAgentsDocument, options as any);
}

export function useGetResourceAgentsLazyQuery(
  options?: LazyQueryHookOptions<
    GetResourceAgentsQuery,
    GetResourceAgentsQueryVariables
  >,
) {
  return useLazyQuery(GetResourceAgentsDocument, options as any);
}

export function useGetRepoQuery(
  options?: QueryHookOptions<GetRepoQuery, GetRepoQueryVariables>,
) {
  return useQuery(GetRepoDocument, options as any);
}

export function useGetRepoLazyQuery(
  options?: LazyQueryHookOptions<GetRepoQuery, GetRepoQueryVariables>,
) {
  return useLazyQuery(GetRepoDocument, options as any);
}

export function useGetReposQuery(
  options?: QueryHookOptions<GetReposQuery, GetReposQueryVariables>,
) {
  return useQuery(GetReposDocument, options as any);
}

export function useGetReposLazyQuery(
  options?: LazyQueryHookOptions<GetReposQuery, GetReposQueryVariables>,
) {
  return useLazyQuery(GetReposDocument, options as any);
}

export function useGetAvailablePlatformsQuery(
  options?: QueryHookOptions<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >,
) {
  return useQuery(GetAvailablePlatformsDocument, options as any);
}

export function useGetAvailablePlatformsLazyQuery(
  options?: LazyQueryHookOptions<
    GetAvailablePlatformsQuery,
    GetAvailablePlatformsQueryVariables
  >,
) {
  return useLazyQuery(GetAvailablePlatformsDocument, options as any);
}

export function useGetVersionsQuery(
  options?: QueryHookOptions<GetVersionsQuery, GetVersionsQueryVariables>,
) {
  return useQuery(GetVersionsDocument, options as any);
}

export function useGetVersionsLazyQuery(
  options?: LazyQueryHookOptions<GetVersionsQuery, GetVersionsQueryVariables>,
) {
  return useLazyQuery(GetVersionsDocument, options as any);
}

export function useGetRepositoryRegistryQuery(
  options?: QueryHookOptions<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >,
) {
  return useQuery(GetRepositoryRegistryDocument, options as any);
}

export function useGetRepositoryRegistryLazyQuery(
  options?: LazyQueryHookOptions<
    GetRepositoryRegistryQuery,
    GetRepositoryRegistryQueryVariables
  >,
) {
  return useLazyQuery(GetRepositoryRegistryDocument, options as any);
}

export function useGetBranchCommitsQuery(
  options?: QueryHookOptions<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  >,
) {
  return useQuery(GetBranchCommitsDocument, options as any);
}

export function useGetBranchCommitsLazyQuery(
  options?: LazyQueryHookOptions<
    GetBranchCommitsQuery,
    GetBranchCommitsQueryVariables
  >,
) {
  return useLazyQuery(GetBranchCommitsDocument, options as any);
}

export function useGetCredentialsQuery(
  options?: QueryHookOptions<GetCredentialsQuery, GetCredentialsQueryVariables>,
) {
  return useQuery(GetCredentialsDocument, options as any);
}

export function useGetCredentialsLazyQuery(
  options?: LazyQueryHookOptions<
    GetCredentialsQuery,
    GetCredentialsQueryVariables
  >,
) {
  return useLazyQuery(GetCredentialsDocument, options as any);
}

export function useGetRepositoriesRegistryQuery(
  options?: QueryHookOptions<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >,
) {
  return useQuery(GetRepositoriesRegistryDocument, options as any);
}

export function useGetRepositoriesRegistryLazyQuery(
  options?: LazyQueryHookOptions<
    GetRepositoriesRegistryQuery,
    GetRepositoriesRegistryQueryVariables
  >,
) {
  return useLazyQuery(GetRepositoriesRegistryDocument, options as any);
}

export function useGetUnitQuery(
  options?: QueryHookOptions<GetUnitQuery, GetUnitQueryVariables>,
) {
  return useQuery(GetUnitDocument, options as any);
}

export function useGetUnitLazyQuery(
  options?: LazyQueryHookOptions<GetUnitQuery, GetUnitQueryVariables>,
) {
  return useLazyQuery(GetUnitDocument, options as any);
}

export function useGetUnitsQuery(
  options?: QueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>,
) {
  return useQuery(GetUnitsDocument, options as any);
}

export function useGetUnitsLazyQuery(
  options?: LazyQueryHookOptions<GetUnitsQuery, GetUnitsQueryVariables>,
) {
  return useLazyQuery(GetUnitsDocument, options as any);
}

export function useGetUnitsWithUnitNodesQuery(
  options?: QueryHookOptions<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >,
) {
  return useQuery(GetUnitsWithUnitNodesDocument, options as any);
}

export function useGetUnitsWithUnitNodesLazyQuery(
  options?: LazyQueryHookOptions<
    GetUnitsWithUnitNodesQuery,
    GetUnitsWithUnitNodesQueryVariables
  >,
) {
  return useLazyQuery(GetUnitsWithUnitNodesDocument, options as any);
}

export function useGetUnitsOutputByInputQuery(
  options?: QueryHookOptions<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >,
) {
  return useQuery(GetUnitsOutputByInputDocument, options as any);
}

export function useGetUnitsOutputByInputLazyQuery(
  options?: LazyQueryHookOptions<
    GetUnitsOutputByInputQuery,
    GetUnitsOutputByInputQueryVariables
  >,
) {
  return useLazyQuery(GetUnitsOutputByInputDocument, options as any);
}

export function useGetUnitLogsQuery(
  options?: QueryHookOptions<GetUnitLogsQuery, GetUnitLogsQueryVariables>,
) {
  return useQuery(GetUnitLogsDocument, options as any);
}

export function useGetUnitLogsLazyQuery(
  options?: LazyQueryHookOptions<GetUnitLogsQuery, GetUnitLogsQueryVariables>,
) {
  return useLazyQuery(GetUnitLogsDocument, options as any);
}

export function useGetUnitEnvQuery(
  options?: QueryHookOptions<GetUnitEnvQuery, GetUnitEnvQueryVariables>,
) {
  return useQuery(GetUnitEnvDocument, options as any);
}

export function useGetUnitEnvLazyQuery(
  options?: LazyQueryHookOptions<GetUnitEnvQuery, GetUnitEnvQueryVariables>,
) {
  return useLazyQuery(GetUnitEnvDocument, options as any);
}

export function useGetUnitCurrentSchemaQuery(
  options?: QueryHookOptions<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >,
) {
  return useQuery(GetUnitCurrentSchemaDocument, options as any);
}

export function useGetUnitCurrentSchemaLazyQuery(
  options?: LazyQueryHookOptions<
    GetUnitCurrentSchemaQuery,
    GetUnitCurrentSchemaQueryVariables
  >,
) {
  return useLazyQuery(GetUnitCurrentSchemaDocument, options as any);
}

export function useGetTargetVersionQuery(
  options?: QueryHookOptions<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  >,
) {
  return useQuery(GetTargetVersionDocument, options as any);
}

export function useGetTargetVersionLazyQuery(
  options?: LazyQueryHookOptions<
    GetTargetVersionQuery,
    GetTargetVersionQueryVariables
  >,
) {
  return useLazyQuery(GetTargetVersionDocument, options as any);
}

export function useGetStateStorageQuery(
  options?: QueryHookOptions<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  >,
) {
  return useQuery(GetStateStorageDocument, options as any);
}

export function useGetStateStorageLazyQuery(
  options?: LazyQueryHookOptions<
    GetStateStorageQuery,
    GetStateStorageQueryVariables
  >,
) {
  return useLazyQuery(GetStateStorageDocument, options as any);
}

export function useGetConvertTomlToMdQuery(
  options?: QueryHookOptions<
    GetConvertTomlToMdQuery,
    GetConvertTomlToMdQueryVariables
  >,
) {
  return useQuery(GetConvertTomlToMdDocument, options as any);
}

export function useGetConvertTomlToMdLazyQuery(
  options?: LazyQueryHookOptions<
    GetConvertTomlToMdQuery,
    GetConvertTomlToMdQueryVariables
  >,
) {
  return useLazyQuery(GetConvertTomlToMdDocument, options as any);
}

export function useGetUnitNodeQuery(
  options?: QueryHookOptions<GetUnitNodeQuery, GetUnitNodeQueryVariables>,
) {
  return useQuery(GetUnitNodeDocument, options as any);
}

export function useGetUnitNodeLazyQuery(
  options?: LazyQueryHookOptions<GetUnitNodeQuery, GetUnitNodeQueryVariables>,
) {
  return useLazyQuery(GetUnitNodeDocument, options as any);
}

export function useGetUnitNodesQuery(
  options?: QueryHookOptions<GetUnitNodesQuery, GetUnitNodesQueryVariables>,
) {
  return useQuery(GetUnitNodesDocument, options as any);
}

export function useGetUnitNodesLazyQuery(
  options?: LazyQueryHookOptions<GetUnitNodesQuery, GetUnitNodesQueryVariables>,
) {
  return useLazyQuery(GetUnitNodesDocument, options as any);
}

export function useCheckDataPipeConfigQuery(
  options?: QueryHookOptions<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >,
) {
  return useQuery(CheckDataPipeConfigDocument, options as any);
}

export function useCheckDataPipeConfigLazyQuery(
  options?: LazyQueryHookOptions<
    CheckDataPipeConfigQuery,
    CheckDataPipeConfigQueryVariables
  >,
) {
  return useLazyQuery(CheckDataPipeConfigDocument, options as any);
}

export function useGetPipeDataQuery(
  options?: QueryHookOptions<GetPipeDataQuery, GetPipeDataQueryVariables>,
) {
  return useQuery(GetPipeDataDocument, options as any);
}

export function useGetPipeDataLazyQuery(
  options?: LazyQueryHookOptions<GetPipeDataQuery, GetPipeDataQueryVariables>,
) {
  return useLazyQuery(GetPipeDataDocument, options as any);
}

export function useGetDataPipeConfigQuery(
  options?: QueryHookOptions<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >,
) {
  return useQuery(GetDataPipeConfigDocument, options as any);
}

export function useGetDataPipeConfigLazyQuery(
  options?: LazyQueryHookOptions<
    GetDataPipeConfigQuery,
    GetDataPipeConfigQueryVariables
  >,
) {
  return useLazyQuery(GetDataPipeConfigDocument, options as any);
}

export function useGetTokenQuery(
  options?: QueryHookOptions<GetTokenQuery, GetTokenQueryVariables>,
) {
  return useQuery(GetTokenDocument, options as any);
}

export function useGetTokenLazyQuery(
  options?: LazyQueryHookOptions<GetTokenQuery, GetTokenQueryVariables>,
) {
  return useLazyQuery(GetTokenDocument, options as any);
}

export function useGetUserQuery(
  options?: QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  return useQuery(GetUserDocument, options as any);
}

export function useGetUserLazyQuery(
  options?: LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  return useLazyQuery(GetUserDocument, options as any);
}

export function useGetUsersQuery(
  options?: QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  return useQuery(GetUsersDocument, options as any);
}

export function useGetUsersLazyQuery(
  options?: LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  return useLazyQuery(GetUsersDocument, options as any);
}

export function useGetVerificationUserQuery(
  options?: QueryHookOptions<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >,
) {
  return useQuery(GetVerificationUserDocument, options as any);
}

export function useGetVerificationUserLazyQuery(
  options?: LazyQueryHookOptions<
    GetVerificationUserQuery,
    GetVerificationUserQueryVariables
  >,
) {
  return useLazyQuery(GetVerificationUserDocument, options as any);
}
