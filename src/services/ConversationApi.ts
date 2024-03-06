import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  Conversation,
  ConversationMessage,
  MutationJoinConversationArgs,
  MutationSaveConversationMessageArgs,
  MutationStartConversationArgs,
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public JoinConversation = (data: MutationJoinConversationArgs) => {
    const requestData = `
		mutation JoinConversation(
				$associated_users_uuid: String!, 
				$conversation_uuid: String!,  
			) {
			JoinConversation(
				associated_users_uuid: $associated_users_uuid, 
				conversation_uuid: $conversation_uuid,  
			) {
				conversation_uuid
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
		mutation SaveConversationMessage( 
				$content: String!, 
				$conversation_id: Int!, 
				$media: String! 
				$type: String!,  
			) {
			SaveConversationMessage( 
				content: $content, 
				conversation_id: $conversation_id, 
				media: $media,  
				type: $type,  
			) {
				description
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
		mutation StartConversation(
				$associated_users_uuid: String!,  
			) {
			StartConversation(
				associated_users_uuid: $associated_users_uuid,  
			) {
				associated_users_uuid
			}
		}
	`

    const response: Promise<OperationResult<{
      StartConversation: Conversation
    }>> = this.mutation(requestData, data)

    return response
  }
}
