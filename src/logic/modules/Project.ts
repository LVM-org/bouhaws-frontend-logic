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

  public Challenges: any = {}

  public SingleProject: any = {}

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
  public JoinProject = async () => {
    try {
      Logic.Common.showLoader({ loading: true, show: false, useModal: true })
      if (this.JoinProjectPayload?.images) {
        // upload all the images
        const apis = await Promise.all(
          this.JoinProjectPayload.images.map((image: any) =>
            $api.upload.UploadImage({ image }),
          ),
        )
        const { title, description, project_id } = this.JoinProjectPayload
        const payload = {
          title,
          description,
          project_id,
          images: apis
            .filter((res: any) => !res.error)
            .map((response, i) => {
              return {
                url: response?.data?.UploadImage,
                milestone: `Milestone ${i}`,
              }
            }),
        } as MutationJoinProjectArgs

        $api.project
          .JoinProject(payload)
          .then((response) => {
            console.log('JoinProject  response:::', response)
            Logic.Common.showLoader({
              loading: false,
              show: true,
              useModal: true,
              message: `Project entry submitted successfully`,
            })
          })
          .catch((error: CombinedError) => {
            Logic.Common.showError(error, 'Oops!', 'error-alert')
          })
      } else {
        $api.project
          .JoinProject(this.JoinProjectPayload)
          .then((response) => {
            console.log('JoinProject  response:::', response)
            Logic.Common.showLoader({
              loading: false,
              show: true,
              useModal: true,
              message: `Project entry submitted successfully`,
            })
          })
          .catch((error: CombinedError) => {
            Logic.Common.showError(error, 'Oops!', 'error-alert')
          })
      }
      if (this.SingleProject.uuid) {
        setTimeout(() => {
          this.GetSingleProject(this.SingleProject.uuid)
        }, 2000)
      }
    } catch (error) {
      Logic.Common.showError(error, 'Oops!', 'error-alert')
    }
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
  public UpdateProjectEntry = async () => {
    try {
      Logic.Common.showLoader({ loading: true, show: false, useModal: true })
      console.log(this.UpdateProjectEntryPayload)

      const imagesToUpload = this.UpdateProjectEntryPayload?.images?.filter(
        (image: any) => !image?.url,
      )
      if (
        this.UpdateProjectEntryPayload.images &&
        (imagesToUpload?.length || 0) > 0
      ) {
        // upload all the images

        // @ts-ignore
        const apis = await Promise.all(
          // @ts-ignore
          imagesToUpload?.map((image: any) =>
            $api.upload.UploadImage({ image }),
          ),
        )
        const {
          title,
          description,
          project_entry_uuid,
        } = this.UpdateProjectEntryPayload
        const payload = {
          title,
          description,
          project_entry_uuid,
          images: [
            ...this.UpdateProjectEntryPayload.images.filter(
              (image: any) => image.url,
            ),
            ...apis
              .filter((res: any) => !res.error)
              .map((response: any, i) => {
                return {
                  url: response?.data?.UploadImage,
                  milestone: `Milestone ${i}`,
                }
              }),
          ],
        } as MutationUpdateProjectEntryArgs

        $api.project
          .UpdateProjectEntry(payload)
          .then((response) => {
            console.log('JoinProject  response:::', response)
            Logic.Common.showLoader({
              loading: false,
              show: true,
              useModal: true,
              message: `Project entry updated successfully`,
            })
          })
          .catch((error: CombinedError) => {
            Logic.Common.showError(error, 'Oops!', 'error-alert')
          })
      } else {
        $api.project
          .UpdateProjectEntry(this.UpdateProjectEntryPayload)
          .then((response) => {
            console.log('UpdateProjectEntry  response:::', response)
            Logic.Common.showLoader({
              loading: false,
              show: true,
              useModal: true,
              message: '',
            })
          })
          .catch((error: CombinedError) => {
            console.error(error, 'er')

            Logic.Common.showError(error, 'Oops!', 'error-alert')
          })
      }
      if (this.SingleProject.uuid) {
        setTimeout(() => {
          this.GetSingleProject(this.SingleProject.uuid)
        }, 2000)
      }
    } catch (error) {
      console.error(error, 'error')
      Logic.Common.showError(error, 'Oops!', 'error-alert')
    }
  }

  public GetChallenges = () => {
    Logic.Common.showLoader({ loading: true, show: false, useModal: true })
    $api.project
      .GetProjects({})
      .then((response) => {
        console.log('UpdateProjectEntry  response:::', response)
        this.Challenges = response?.data?.GetProjects?.data
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public GetSingleProject = (uuid: String) => {
    Logic.Common.showLoader({ loading: true, show: false, useModal: true })
    $api.project
      .GetSingleProject({ uuid })
      .then((response) => {
        console.log('UpdateProjectEntry  response:::', response)
        this.SingleProject = response?.data?.Project
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
