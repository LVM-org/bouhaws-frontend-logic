import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
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
  Project,
  ProjectCategory,
  ProjectMilestone,
  ProjectEntry,
  ProjectEntryBookmark,
  ProjectEntryComment,
  ProjectEntryLike,
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public CreateProject = (data: MutationCreateProjectArgs) => {
    const requestData = `
		mutation CreateProject(
				$end_date: String!, 
				$description: String!, 
				$photo_url: Upload!, 
				$title: String!,  
				$prize: String!, 
				$project_category_id: Int!, 
				$requirements: String!, 
				$total_points: String!, 
				$type: String!
			) {
			CreateProject(
				end_date: $end_date, 
				description: $description, 
				photo_url: $photo_url, 
				title: $title, 
				prize: $prize, 
				project_category_id: $project_category_id, 
				requirements: $requirements, 
				total_points: $total_points, 
				type: $type,
			) {
				description
			}
		}
		`

    const response: Promise<OperationResult<{
      CreateProject: Project
    }>> = this.mutation(requestData, data)

    return response
  }

  public CreateProjectCategory = (data: MutationCreateProjectCategoryArgs) => {
    const requestData = `
		mutation CreateProjectCategory($title: String!) {
			CreateProjectCategory (title: $title) {
				title
			}
		} 
	`

    const response: Promise<OperationResult<{
      CreateProjectCategory: ProjectCategory
    }>> = this.mutation(requestData, data)

    return response
  }

  public CreateProjectMilestone = (
    data: MutationCreateProjectMilestoneArgs,
  ) => {
    const requestData = `
		mutation CreateProjectMilestone( 
				$index: Int!, 
				$project_id: String!, 
				$title: String! 
				$points: String!,  
			) {
			CreateProjectMilestone( 
				index: $index, 
				project_id: $project_id, 
				title: $title,  
				points: $points,  
			) {
				description
			}
		}
	`

    const response: Promise<OperationResult<{
      CreateProjectMilestone: ProjectMilestone
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateProject = (data: MutationUpdateProjectArgs) => {
    const requestData = `
		mutation UpdateProject(
				$end_date: String!, 
				$description: String!, 
				$photo_url: Upload!, 
				$title: String!,  
				$prize: String!, 
				$project_category_id: Int!, 
				$requirements: String!, 
				$total_points: String!, 
				$type: String!
				$status: String!
			) {
			UpdateProject(
				end_date: $end_date, 
				description: $description, 
				photo_url: $photo_url, 
				title: $title, 
				prize: $prize, 
				project_category_id: $project_category_id, 
				requirements: $requirements, 
				total_points: $total_points, 
				type: $type,
				status: $status,
			) {
				description
			}
		}
		`

    const response: Promise<OperationResult<{
      UpdateProject: Project
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateProjectMilestone = (
    data: MutationUpdateProjectMilestoneArgs,
  ) => {
    const requestData = `
		mutation UpdateProjectMilestone( 
				$index: Int!, 
				$project_milestone_uuid: String!, 
				$title: String! 
				$points: String!,  
			) {
			UpdateProjectMilestone( 
				index: $index, 
				project_milestone_uuid: $project_milestone_uuid, 
				title: $title,  
				points: $points,  
			) {
				description
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdateProjectMilestone: ProjectMilestone
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateProjectCategory = (data: MutationUpdateProjectCategoryArgs) => {
    const requestData = `
		mutation UpdateProjectCategory(  
				$project_milestone_uuid: String!, 
				$title: String!
			) {
			UpdateProjectCategory(  
				project_milestone_uuid: $project_milestone_uuid, 
				title: $title,   
			) {
				description
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdateProjectCategory: ProjectCategory
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateProjectEntry = (data: MutationUpdateProjectEntryArgs) => {
    const requestData = `
		mutation UpdateProjectEntry( 
				$description: String!, 
				$images: String!, 
				$project_entry_uuid: String! 
				$status: String!,  
				$title: String!,  
			) {
			UpdateProjectEntry( 
				description: $description, 
				images: $images, 
				project_entry_uuid: $project_entry_uuid,  
				status: $status,  
				title: $title,  
			) {
				description
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdateProjectEntry: ProjectEntry
    }>> = this.mutation(requestData, data)

    return response
  }

  public DeleteProjectMilestone = (
    data: MutationDeleteProjectMilestoneArgs,
  ) => {
    const requestData = `
		mutation DeleteProjectMilestone( 
				$uuid: String!,  
			) {
			DeleteProjectMilestone(  
				uuid: $uuid,  
			) {
				uuid
			}
		}
	`

    const response: Promise<OperationResult<{
      DeleteProjectMilestone: ProjectMilestone
    }>> = this.mutation(requestData, data)

    return response
  }

  public JoinProject = (data: MutationJoinProjectArgs) => {
    const requestData = `
		mutation JoinProject(
				$project_id: Int!, 
				$description: String!, 
				$title: String!,  
			) {
			JoinProject(
				project_id: $project_id, 
				description: $description, 
				title: $title,  
			) {
				description
			}
		}
		`

    const response: Promise<OperationResult<{
      JoinProject: Project
    }>> = this.mutation(requestData, data)

    return response
  }

  public SaveProjectEntryBookmark = (
    data: MutationSaveProjectEntryBookmarkArgs,
  ) => {
    const requestData = `
		mutation SaveProjectEntryBookmark( 
				$project_entry_id: Int!,  
			) {
			SaveProjectEntryBookmark(  
				project_entry_id: $project_entry_id,  
			) {
				project_entry_id
			}
		}
	`

    const response: Promise<OperationResult<{
      SaveProjectEntryBookmark: ProjectEntryBookmark
    }>> = this.mutation(requestData, data)

    return response
  }

  public SaveProjectEntryComment = (
    data: MutationSaveProjectEntryCommentArgs,
  ) => {
    const requestData = `
		mutation SaveProjectEntryComment( 
				$content: String!, 
				$is_reply: Boolean!, 
				$project_entry_id: Int! 
				$replied_comment_id: Int!,  
			) {
			SaveProjectEntryComment( 
				content: $content, 
				is_reply: $is_reply, 
				project_entry_id: $project_entry_id,  
				replied_comment_id: $replied_comment_id,  
			) {
				description
			}
		}
	`

    const response: Promise<OperationResult<{
      SaveProjectEntryComment: ProjectEntryComment
    }>> = this.mutation(requestData, data)

    return response
  }

  public SaveProjectEntryLike = (data: MutationSaveProjectEntryLikeArgs) => {
    const requestData = `
		mutation SaveProjectEntryLike( 
				$project_entry_id: Int!,  
			) {
			SaveProjectEntryLike(  
				project_entry_id: $project_entry_id,  
			) {
				project_entry_id
			}
		}
	`

    const response: Promise<OperationResult<{
      SaveProjectEntryLike: ProjectEntryLike
    }>> = this.mutation(requestData, data)

    return response
  }
}
