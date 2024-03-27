import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  Conversation,
  ConversationMessage,
  ConversationMessagePaginator,
  MutationJoinConversationArgs,
  MutationSaveConversationMessageArgs,
  MutationStartConversationArgs,
  User,
} from '../gql/graphql'

export default class ConversationApi extends BaseApiService {
  public GetUserConversations = () => {
    const requestData = `
		query GetUserConversation {
			AuthUser {
			  conversations {
				uuid
				user {
				  uuid
				  username
				  profile {
					photo_url
				  }
				}
				associated_users {
				  uuid
				  name
				  username
				  profile {
					photo_url
				  }
				}
				created_at
				updated_at
			  }
			}
		  }
				`

    const response: Promise<OperationResult<{
      AuthUser: User
    }>> = this.query(requestData, {})

    return response
  }

  public GetConversation = (uuid: string) => {
    const requestData = `
		query GetConversation($uuid: String!) {
			Conversation(uuid: $uuid) {
			  uuid
			  user {
				uuid
				username
				profile {
				  photo_url
				}
			  }
			  associated_users {
				uuid
				name
				username
				profile {
				  photo_url
				}
			  }
			  created_at
			  updated_at
			}
		  }
			`

    const response: Promise<OperationResult<{
      Conversation: Conversation
    }>> = this.query(requestData, {
      uuid,
    })

    return response
  }

  public GetConversationMessages = (
    page: number,
    first: number,
    conversation_id: string,
  ) => {
    const requestData = `
	query GetConversationMessages($page: Int!, $first: Int!, $conversation_id: String!) {
		ConversationMessages(
		  page: $page
		  first: $first
		  conversation_id: $conversation_id
		) {
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
			type
			user {
			  uuid
			  username
			  name
			  profile {
				photo_url
			  }
			}
			content
			media
			created_at
		  }
		}
	  }
			`

    const response: Promise<OperationResult<{
      ConversationMessages: ConversationMessagePaginator
    }>> = this.query(requestData, {
      page,
      first,
      conversation_id,
    })

    return response
  }

  public JoinConversation = (data: MutationJoinConversationArgs) => {
    const requestData = `
	mutation JoinConversation($conversation_uuid: String!) {
		JoinConversation(conversation_uuid: $conversation_uuid) {
		  uuid
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  associated_users {
			uuid
			name
			username
			profile {
			  photo_url
			}
		  }
		  created_at
		  updated_at
		}
	  }
	`

    const response: Promise<OperationResult<{
      JoinConversation: Conversation
    }>> = this.mutation(requestData, data)

    return response
  }

  public SaveConversationMessage = (
    data: MutationSaveConversationMessageArgs,
  ) => {
    const requestData = `
	mutation SaveConversationMessage($content: String!, $conversation_id: Int!, $media: String!, $type: String!) {
		SaveConversationMessage(
		  content: $content
		  conversation_id: $conversation_id
		  media: $media
		  type: $type
		) {
		  uuid
		  type
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  content
		  media
		  created_at
		}
	  }
	`

    const response: Promise<OperationResult<{
      SaveConversationMessage: ConversationMessage
    }>> = this.mutation(requestData, data)

    return response
  }

  public StartConversation = (data: MutationStartConversationArgs) => {
    const requestData = `
	mutation StartConversation($associated_users_uuid: [String!]!) {
		StartConversation(associated_users_uuid: $associated_users_uuid) {
		  uuid
		  user {
			name
			username
			profile {
			  photo_url
			}
		  }
		  associated_users {
			uuid
			name
			username
			profile {
			  photo_url
			}
		  }
		  created_at
		  updated_at
		}
	  }
	`

    const response: Promise<OperationResult<{
      StartConversation: Conversation
    }>> = this.mutation(requestData, data)

    return response
  }

  public SubscribeToConversationMessageCreated = (
    conversationList: string[],
    handleSubscription: any,
  ) => {
    const requestData = `
	subscription SubscribeToConversationMessageCreated($conversationList: [String!]!) {
		conversationMessageCreated(conversationList: $conversationList) {
		  uuid
		  type
		  user {
			name
			uuid
			username
			profile {
			  photo_url
			}
		  }
		  content
		  media
		  created_at
		}
	  }`

    const response = this.subscription(
      requestData,
      {
        conversationList,
      },
      handleSubscription,
    )

    return response
  }

  public SubscribeToConversationMembership = (
    userUuid: string,
    handleSubscription: any,
  ) => {
    const requestData = `
	subscription SubscribeToConversationMembership($userUuid: String!) {
		conversationMembership(userUuid: $userUuid) {
		  uuid
		  id
		  user {
			name
			uuid
			username
			profile {
			  photo_url
			}
		  }
		  associated_users {
			uuid
			name
			username
			profile {
			  photo_url
			}
		  }
		  created_at
		  updated_at
		}
	  }`

    const response = this.subscription(
      requestData,
      {
        userUuid,
      },
      handleSubscription,
    )

    return response
  }
}
