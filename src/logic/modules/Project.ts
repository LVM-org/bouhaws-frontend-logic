import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationCreateProjectArgs,
  MutationCreateProjectCategoryArgs,
  MutationCreateProjectMilestoneArgs,
  MutationUpdateProjectArgs,
  MutationUpdateProjectMilestoneArgs,
  MutationUpdateProjectCategoryArgs,
  MutationDeleteProjectMilestoneArgs,
  MutationJoinProjectArgs,
  MutationSaveProjectEntryBookmarkArgs,
  MutationSaveProjectEntryCommentArgs,
  MutationSaveProjectEntryLikeArgs,
  MutationUpdateProjectEntryArgs,
  ProjectPaginator,
  Project as ProjectModel,
  ProjectCategoryPaginator,
  ProjectCategory,
  ProjectEntryPaginator,
  ProjectEntry,
  ProjectMilestone,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Project extends Common {
  constructor() {
    super()
  }

  // Base variables
  public ManyProjects: ProjectPaginator | undefined
  public EachProject: ProjectModel | undefined
  public ManyProjectCategories: ProjectCategoryPaginator | undefined
  public EachProjectCategory: ProjectCategory | undefined
  public ManyProjectEntries: ProjectEntryPaginator | undefined
  public EachProjectEntry: ProjectEntry | undefined

  // Mutation payloads
  public CreateProjectPayload: MutationCreateProjectArgs | undefined
  public CreateProjectCategoryPayload:
    | MutationCreateProjectCategoryArgs
    | undefined
  public CreateProjectMilestonePayload:
    | MutationCreateProjectMilestoneArgs
    | undefined
  public UpdateProjectPayload: MutationUpdateProjectArgs | undefined
  public UpdateProjectMilestonePayload:
    | MutationUpdateProjectMilestoneArgs
    | undefined
  public UpdateProjectCategoryPayload:
    | MutationUpdateProjectCategoryArgs
    | undefined
  public DeleteProjectMilestonePayload:
    | MutationDeleteProjectMilestoneArgs
    | undefined
  public JoinProjectPayload: MutationJoinProjectArgs | undefined
  public SaveProjectEntryBookmarkPayload:
    | MutationSaveProjectEntryBookmarkArgs
    | undefined
  public SaveProjectEntryCommentPayload:
    | MutationSaveProjectEntryCommentArgs
    | undefined
  public SaveProjectEntryLikePayload:
    | MutationSaveProjectEntryLikeArgs
    | undefined
  public UpdateProjectEntryPayload: MutationUpdateProjectEntryArgs | undefined

  // Queries
  public GetProjects = (
    page: number,
    first: number,
    whereQuery = '',
    hasUser = '',
    hasCategory = '',
  ) => {
    return $api.project
      .GetProjects(
        page,
        first,
        `{
      column: CREATED_AT,
      order: DESC
    }`,
        whereQuery,
        hasUser,
        hasCategory,
      )
      .then((response) => {
        this.ManyProjects = response.data?.GetProjects
        return response.data?.GetProjects
      })
  }

  public GetProject = (uuid: string) => {
    if (uuid) {
      return $api.project
        .GetProject(uuid, Logic.Auth.AuthUser?.uuid || '')
        .then((response) => {
          this.EachProject = response.data?.Project
          if (response.data?.GetProjectEntries.data.length) {
            this.EachProjectEntry = response.data.GetProjectEntries.data[0]
          } else {
            this.EachProjectEntry = undefined
          }
        })
    } else {
      return new Promise((resolve) => {
        resolve('')
      })
    }
  }

  public GetProjectCategories = (page: number, first: number) => {
    return $api.project
      .GetProjectCategories(
        page,
        first,
        `{
      column: CREATED_AT,
      order: DESC
    }`,
      )
      .then((response) => {
        this.ManyProjectCategories = response.data?.GetProjectCategories
        return response.data?.GetProjectCategories
      })
  }

  public GetProjectCategory = (uuid: string) => {
    return $api.project.GetProjectCategory(uuid).then((response) => {
      this.EachProjectCategory = response.data?.ProjectCategory
    })
  }

  public GetProjectEntries = (
    page: number,
    first: number,
    whereQuery: string = '',
  ) => {
    return $api.project
      .GetProjectEntries(
        page,
        first,
        `{
      column: CREATED_AT,
      order: DESC
    }`,
        whereQuery,
      )
      .then((response) => {
        this.ManyProjectEntries = response.data?.GetProjectEntries
        return response.data?.GetProjectEntries
      })
  }

  public GetProjectEntry = (uuid: string) => {
    return $api.project.GetProjectEntry(uuid).then((response) => {
      this.EachProjectEntry = response.data?.ProjectEntry
    })
  }

  // Mutation
  public UploadImage = (file: Blob) => {
    return $api.upload
      .UploadImage({
        image: file,
      })
      .then((response) => {
        return response.data?.UploadImage
      })
  }

  public CreateProject = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.CreateProjectPayload) {
      return $api.project
        .CreateProject(this.CreateProjectPayload)
        .then((response) => {
          this.EachProject = response.data?.CreateProject

          Logic.Common.showLoader({
            loading: false,
            show: true,
            message: `Project created successfully`,
            type: 'success',
          })
          return response.data?.CreateProject
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public CreateProjectCategory = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.CreateProjectCategoryPayload) {
      return $api.project
        .CreateProjectCategory(this.CreateProjectCategoryPayload)
        .then((response) => {
          this.EachProjectCategory = response.data?.CreateProjectCategory
          Logic.Common.hideLoader()
          return response.data?.CreateProjectCategory
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public CreateProjectMilestone = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.CreateProjectMilestonePayload) {
      return $api.project
        .CreateProjectMilestone(this.CreateProjectMilestonePayload)
        .then((response) => {
          if (response.data) {
            this.EachProject?.milestones?.push(
              response.data.CreateProjectMilestone,
            )
          }

          Logic.Common.hideLoader()
          return response.data?.CreateProjectMilestone
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdateProject = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.UpdateProjectPayload) {
      return $api.project
        .UpdateProject(this.UpdateProjectPayload)
        .then((response) => {
          this.EachProject = response.data?.UpdateProject
          Logic.Common.hideLoader()
          return response.data?.UpdateProject
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdateProjectMilestone = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.UpdateProjectMilestonePayload) {
      return $api.project
        .UpdateProjectMilestone(this.UpdateProjectMilestonePayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data?.UpdateProjectMilestone
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdateProjectCategory = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.UpdateProjectCategoryPayload) {
      return $api.project
        .UpdateProjectCategory(this.UpdateProjectCategoryPayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data?.UpdateProjectCategory
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public DeleteProjectMilestone = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.DeleteProjectMilestonePayload) {
      return $api.project
        .DeleteProjectMilestone(this.DeleteProjectMilestonePayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data?.DeleteProjectMilestone
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public JoinProject = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.JoinProjectPayload) {
      return $api.project
        .JoinProject(this.JoinProjectPayload)
        .then((response) => {
          this.EachProjectEntry = response.data?.JoinProject
          Logic.Common.hideLoader()
          return response.data?.JoinProject
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SaveProjectEntryBookmark = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.SaveProjectEntryBookmarkPayload) {
      return $api.project
        .SaveProjectEntryBookmark(this.SaveProjectEntryBookmarkPayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data?.SaveProjectEntryBookmark
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SaveProjectEntryComment = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.SaveProjectEntryCommentPayload) {
      return $api.project
        .SaveProjectEntryComment(this.SaveProjectEntryCommentPayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data?.SaveProjectEntryComment
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SaveProjectEntryLike = () => {
    if (this.SaveProjectEntryLikePayload) {
      return $api.project
        .SaveProjectEntryLike(this.SaveProjectEntryLikePayload)
        .then((response) => {
          return response.data?.SaveProjectEntryLike
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdateProjectEntry = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.UpdateProjectEntryPayload) {
      return $api.project
        .UpdateProjectEntry(this.UpdateProjectEntryPayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data?.UpdateProjectEntry
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
}
