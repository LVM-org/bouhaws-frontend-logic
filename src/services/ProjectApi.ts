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
  QueryGetProjectsOrderByOrderByClause,
  ProjectPaginator,
  Project,
  QueryGetProjectCategoriesOrderByOrderByClause,
  ProjectCategoryPaginator,
  ProjectCategory,
  QueryGetProjectEntriesOrderByOrderByClause,
  QueryGetProjectsHasUserWhereHasConditions,
  QueryGetProjectsHasCategoryWhereHasConditions,
  QueryGetProjectEntriesHasUserWhereHasConditions,
  QueryGetProjectEntriesHasProjectWhereHasConditions,
  ProjectEntry,
  ProjectMilestone,
  ProjectEntryBookmark,
  ProjectEntryComment,
  ProjectEntryPaginator,
} from '../gql/graphql'

export default class ProjectApi extends BaseApiService {
  public GetProjects = (
    page: number,
    first: number,
    orderBy: QueryGetProjectsOrderByOrderByClause | string,
    hasUser: QueryGetProjectsHasUserWhereHasConditions | string = '',
    hasCategory: QueryGetProjectsHasCategoryWhereHasConditions | string = '',
  ) => {
    const requestData = `
		query Projects($page: Int!, $first: Int!) {
			GetProjects(first: $first, page: $page, orderBy: ${orderBy}, ${hasUser} ${hasCategory}) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				type
				total_points
				category{
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
			  }
			}
		  }
		`

    const response: Promise<OperationResult<{
      Projects: ProjectPaginator
    }>> = this.query(requestData, {
      page,
      first,
    })

    return response
  }

  public GetProject = (uuid: string) => {
    const requestData = `
		query GetProject($uuid: String!) {
			Project(uuid: $uuid) {
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				type
				total_points
				category{
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
			}
		  }
		`

    const response: Promise<OperationResult<{
      Project: Project
    }>> = this.query(requestData, {
      uuid,
    })

    return response
  }

  public GetProjectCategories = (
    page: number,
    first: number,
    orderBy: QueryGetProjectCategoriesOrderByOrderByClause | string,
  ) => {
    const requestData = `
		query ProjectCategories($page: Int!, $first: Int!) {
			GetProjectCategories(first: $first, page: $page, orderBy: ${orderBy},) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				id
				uuid
				title
				created_at
			  }
			}
		  }
		`
    const response: Promise<OperationResult<{
      ProjectCategories: ProjectCategoryPaginator
    }>> = this.query(requestData, {
      page,
      first,
    })

    return response
  }

  public GetProjectCategory = (uuid: string) => {
    const requestData = `
		query GetProjectCategory($uuid: String!) {
			ProjectCategory(uuid: $uuid) {
				id
				uuid
				title
				created_at
			}
		  }
		`

    const response: Promise<OperationResult<{
      ProjectCategory: ProjectCategory
    }>> = this.query(requestData, {
      uuid,
    })

    return response
  }

  public GetProjectEntries = (
    page: number,
    first: number,
    orderBy: QueryGetProjectEntriesOrderByOrderByClause | string,
    hasUser: QueryGetProjectEntriesHasUserWhereHasConditions | string = '',
    hasProject:
      | QueryGetProjectEntriesHasProjectWhereHasConditions
      | string = '',
  ) => {
    const requestData = `
		query ProjectEntries($page: Int!, $first: Int!) {
			GetProjectEntries(first: $first, page: $page, orderBy: ${orderBy}, ${hasUser}  ${hasProject}) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				uuid
				user {
				  name
				  uuid
				  profile {
					photo_url
				  }
				}
				project {
				  title
				  uuid
				}
				current_milestone_index
				title
				images
				likes {
				  id
				}
				bookmarks {
				  id
				}
				comments {
				  id
				}
			  }
			}
		  }
		`
    const response: Promise<OperationResult<{
      GetProjectEntries: ProjectEntryPaginator
    }>> = this.query(requestData, {
      page,
      first,
    })

    return response
  }

  public GetProjectEntry = (uuid: string) => {
    const requestData = `
	query GetProjectEntry($uuid: String!) {
		ProjectEntry(uuid: $uuid) {
		  uuid
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  project {
			title
		  }
		  current_milestone_index
		  title
		  description
		  images
		  likes {
			id
		  }
		  bookmarks {
			id
		  }
		  comments {
			uuid
			user {
			  username
			  name
			  profile {
				photo_url
			  }
			}
			content
			is_reply
			replied_comment_id
		  }
		  created_at
		}
	  }
		`

    const response: Promise<OperationResult<{
      ProjectEntry: ProjectEntry
    }>> = this.query(requestData, {
      uuid,
    })

    return response
  }

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
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				type
				total_points
				category{
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
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
				id
				uuid
				title
				created_at
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
	mutation CreateProjectMilestone($index: Int!, $project_id: String!, $title: String!, $points: String!) {
		CreateProjectMilestone(
		  index: $index
		  project_id: $project_id
		  title: $title
		  points: $points
		) {
		  uuid
		  title
		  points
		  index
		  project {
			uuid
		  }
		  updated_at
		  created_at
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
				$end_date: String, 
				$description: String, 
				$photo_url: Upload, 
				$title: String,  
				$prize: String, 
				$project_category_id: Int, 
				$requirements: String, 
				$total_points: String, 
				$type: String
				$status: String
				$project_uuid: String!
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
				project_uuid: $project_uuid
			) {
				id
				uuid
				title
				user{
				  uuid
				  name
				  username
				  profile{
					photo_url
				  }
				}
				end_date
				prize
				currency
				description
				requirements
				photo_url
				type
				total_points
				category{
				  uuid
				  title
				}
				entries{
				  uuid
				  current_milestone_index
				  title
				  description
				  images
				  likes{
					id
				  }
				  bookmarks{
					id
				  }
				  comments{
					id
				  }
				  created_at
				}
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
				$index: Int, 
				$project_milestone_uuid: String!, 
				$title: String 
				$points: String,  
			) {
			UpdateProjectMilestone( 
				index: $index, 
				project_milestone_uuid: $project_milestone_uuid, 
				title: $title,  
				points: $points,  
			) {
				uuid
				title
				points
				index
				project {
				  uuid
				}
				updated_at
				created_at
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
				id
				uuid
				title
				created_at
				updated_at
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
				$description: String, 
				$images: String, 
				$project_entry_uuid: String! 
				$status: String,  
				$title: String,  
			) {
			UpdateProjectEntry( 
				description: $description, 
				images: $images, 
				project_entry_uuid: $project_entry_uuid,  
				status: $status,  
				title: $title,  
			) {
				uuid
				user {
				  name
				  username
				  profile {
					photo_url
				  }
				}
				project {
				  title
				}
				current_milestone_index
				title
				description
				images
				likes {
				  id
				}
				bookmarks {
				  id
				}
				comments {
				  uuid
				  user {
					username
					name
					profile {
					  photo_url
					}
				  }
				  content
				  is_reply
				  replied_comment_id
				}
				created_at
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
			)  
		}
	`

    const response: Promise<OperationResult<{
      DeleteProjectMilestone: Boolean
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
				uuid
				user {
				  name
				  username
				  profile {
					photo_url
				  }
				}
				project {
				  title
				}
				current_milestone_index
				title
				description
				images
				likes {
				  id
				}
				bookmarks {
				  id
				}
				comments {
				  uuid
				  user {
					username
					name
					profile {
					  photo_url
					}
				  }
				  content
				  is_reply
				  replied_comment_id
				}
				created_at
			}
		}
		`

    const response: Promise<OperationResult<{
      JoinProject: ProjectEntry
    }>> = this.mutation(requestData, data)

    return response
  }

  public SaveProjectEntryBookmark = (
    data: MutationSaveProjectEntryBookmarkArgs,
  ) => {
    const requestData = `
	mutation SaveProjectEntryBookmark($project_entry_id: Int!) {
		SaveProjectEntryBookmark(project_entry_id: $project_entry_id) {
		  uuid
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
	mutation SaveProjectEntryComment($content: String!, $is_reply: Boolean!, $project_entry_id: Int!, $replied_comment_id: Int!) {
		SaveProjectEntryComment(
		  content: $content
		  is_reply: $is_reply
		  project_entry_id: $project_entry_id
		  replied_comment_id: $replied_comment_id
		) {
		  uuid
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  is_reply
		  content
		  replied_comment_id
		  created_at
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
				uuid
			}
		}
	`

    const response: Promise<OperationResult<{
      SaveProjectEntryLike: any
    }>> = this.mutation(requestData, data)

    return response
  }
}
