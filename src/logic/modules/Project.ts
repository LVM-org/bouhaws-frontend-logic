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
  public ManyProjects: ProjectPaginator
  public EachProject: ProjectModel
  public ManyProjectCategories: ProjectCategoryPaginator
  public EachProjectCategory: ProjectCategory
  public ManyProjectEntries: ProjectEntryPaginator
  public EachProjectEntry: ProjectEntry

  // Mutation payloads
  public CreateProjectPayload: MutationCreateProjectArgs
  public CreateProjectCategoryPayload: MutationCreateProjectCategoryArgs
  public CreateProjectMilestonePayload: MutationCreateProjectMilestoneArgs
  public UpdateProjectPayload: MutationUpdateProjectArgs
  public UpdateProjectMilestonePayload: MutationUpdateProjectMilestoneArgs
  public UpdateProjectCategoryPayload: MutationUpdateProjectCategoryArgs
  public DeleteProjectMilestonePayload: MutationDeleteProjectMilestoneArgs
  public JoinProjectPayload: MutationJoinProjectArgs
  public SaveProjectEntryBookmarkPayload: MutationSaveProjectEntryBookmarkArgs
  public SaveProjectEntryCommentPayload: MutationSaveProjectEntryCommentArgs
  public SaveProjectEntryLikePayload: MutationSaveProjectEntryLikeArgs
  public UpdateProjectEntryPayload: MutationUpdateProjectEntryArgs

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
        .GetProject(uuid, Logic.Auth.AuthUser.uuid)
        .then((response) => {
          this.EachProject = response.data?.Project
          if (response.data.GetProjectEntries.data.length) {
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
        return response.data.UploadImage
      })
  }

  public CreateProject = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .CreateProject(this.CreateProjectPayload)
      .then((response) => {
        this.EachProject = response.data.CreateProject

        Logic.Common.showLoader({
          loading: false,
          show: true,
          message: `Project created successfully`,
          type: 'success',
        })
        return response.data.CreateProject
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public CreateProjectCategory = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .CreateProjectCategory(this.CreateProjectCategoryPayload)
      .then((response) => {
        this.EachProjectCategory = response.data.CreateProjectCategory
        Logic.Common.hideLoader()
        return response.data.CreateProjectCategory
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public CreateProjectMilestone = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .CreateProjectMilestone(this.CreateProjectMilestonePayload)
      .then((response) => {
        this.EachProject.milestones.push(response.data.CreateProjectMilestone)
        Logic.Common.hideLoader()
        return response.data.CreateProjectMilestone
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public UpdateProject = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .UpdateProject(this.UpdateProjectPayload)
      .then((response) => {
        this.EachProject = response.data.UpdateProject
        Logic.Common.hideLoader()
        return response.data.UpdateProject
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public UpdateProjectMilestone = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .UpdateProjectMilestone(this.UpdateProjectMilestonePayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.UpdateProjectMilestone
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public UpdateProjectCategory = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .UpdateProjectCategory(this.UpdateProjectCategoryPayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.UpdateProjectCategory
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public DeleteProjectMilestone = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .DeleteProjectMilestone(this.DeleteProjectMilestonePayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.DeleteProjectMilestone
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public JoinProject = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .JoinProject(this.JoinProjectPayload)
      .then((response) => {
        this.EachProjectEntry = response.data.JoinProject
        Logic.Common.hideLoader()
        return response.data.JoinProject
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public SaveProjectEntryBookmark = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .SaveProjectEntryBookmark(this.SaveProjectEntryBookmarkPayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.SaveProjectEntryBookmark
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public SaveProjectEntryComment = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .SaveProjectEntryComment(this.SaveProjectEntryCommentPayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.SaveProjectEntryComment
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public SaveProjectEntryLike = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .SaveProjectEntryLike(this.SaveProjectEntryLikePayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.SaveProjectEntryLike
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public UpdateProjectEntry = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.project
      .UpdateProjectEntry(this.UpdateProjectEntryPayload)
      .then((response) => {
        Logic.Common.hideLoader()
        return response.data.UpdateProjectEntry
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
