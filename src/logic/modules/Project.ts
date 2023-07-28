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
} from '../../gql/graphql'
import { Logic } from '..'

export default class Project extends Common {
  constructor() {
    super()
  }

  //
  public CreateProjectPayload: MutationCreateProjectArgs = {
    end_date: '',
    description: '',
    photo_url: '',
    title: '',
    prize: '',
    project_category_id: 0,
    requirements: '',
    total_points: '',
    type: '',
  }
  public CreateProjectCategoryPayload: MutationCreateProjectCategoryArgs = {
    title: '',
  }
  public CreateProjectMilestonePayload: MutationCreateProjectMilestoneArgs = {
    index: 0,
    project_id: '',
    title: '',
    points: '',
  }
  public UpdateProjectPayload: MutationUpdateProjectArgs = {
    end_date: '',
    description: '',
    photo_url: '',
    title: '',
    prize: '',
    project_category_id: 0,
    requirements: '',
    total_points: '',
    type: '',
    status: '',
  }
  public UpdateProjectMilestonePayload: MutationUpdateProjectMilestoneArgs = {
    index: 0,
    project_milestone_uuid: '',
    title: '',
    points: '',
  }
  public UpdateProjectCategoryPayload: MutationUpdateProjectCategoryArgs = {
    project_category_uuid: '',
    title: '',
  }
  public DeleteProjectMilestonePayload: MutationDeleteProjectMilestoneArgs = {
    uuid: '',
  }
  public JoinProjectPayload: MutationJoinProjectArgs = {
    description: '',
    title: '',
    project_id: 0,
  }
  public SaveProjectEntryBookmarkPayload: MutationSaveProjectEntryBookmarkArgs = {
    project_entry_id: 0,
  }
  public SaveProjectEntryCommentPayload: MutationSaveProjectEntryCommentArgs = {
    content: '',
    is_reply: false,
    project_entry_id: 0,
    replied_comment_id: 0,
  }
  public SaveProjectEntryLikePayload: MutationSaveProjectEntryLikeArgs = {
    project_entry_id: 0,
  }
  public UpdateProjectEntryPayload: MutationUpdateProjectEntryArgs = {
    description: '',
    title: '',
    images: [''],
    project_entry_uuid: '',
    status: '',
  }

  //
  public CreateProject = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .CreateProject(this.CreateProjectPayload)
      .then((response) => {
        console.log('CreateProject  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public CreateProjectCategory = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .CreateProjectCategory(this.CreateProjectCategoryPayload)
      .then((response) => {
        console.log('CreateProjectCategory  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public CreateProjectMilestone = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .CreateProjectMilestone(this.CreateProjectMilestonePayload)
      .then((response) => {
        console.log('CreateProjectMilestone  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public UpdateProject = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .UpdateProject(this.UpdateProjectPayload)
      .then((response) => {
        console.log('UpdateProject  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public UpdateProjectMilestone = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .UpdateProjectMilestone(this.UpdateProjectMilestonePayload)
      .then((response) => {
        console.log('UpdateProjectMilestone  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public UpdateProjectCategory = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .UpdateProjectCategory(this.UpdateProjectCategoryPayload)
      .then((response) => {
        console.log('UpdateProjectCategory  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public DeleteProjectMilestone = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .DeleteProjectMilestone(this.DeleteProjectMilestonePayload)
      .then((response) => {
        console.log('DeleteProjectMilestone  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public JoinProject = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .JoinProject(this.JoinProjectPayload)
      .then((response) => {
        console.log('JoinProject  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public SaveProjectEntryBookmark = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .SaveProjectEntryBookmark(this.SaveProjectEntryBookmarkPayload)
      .then((response) => {
        console.log('SaveProjectEntryBookmark  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public SaveProjectEntryComment = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .SaveProjectEntryComment(this.SaveProjectEntryCommentPayload)
      .then((response) => {
        console.log('SaveProjectEntryComment  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public SaveProjectEntryLike = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .SaveProjectEntryLike(this.SaveProjectEntryLikePayload)
      .then((response) => {
        console.log('SaveProjectEntryLike  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public UpdateProjectEntry = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.project
      .UpdateProjectEntry(this.UpdateProjectEntryPayload)
      .then((response) => {
        console.log('UpdateProjectEntry  response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
