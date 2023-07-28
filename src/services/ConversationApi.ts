import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql' 
import {
  MutationJoinConversationArgs, 
  MutationSaveConversationMessageArgs,
  MutationStartConversationArgs,
  QueryConversationArgs
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public Conversation = (data: QueryConversationArgs) => {
	const requestData = `
		query Conversation ($uuid: String!)  {
			Conversation (uuid: $uuid){ 
				created_at
				id
				updated_at
			}
		}
	`

    const response: Promise<OperationResult<{
      Conversation: any
    }>> = this.query(requestData, data) 
 
    return response
  }

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
      JoinConversation: any
    }>> = this.mutation(requestData, data)

    return response
  }
  
  public SaveConversationMessage = (data: MutationSaveConversationMessageArgs) => {
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
      SaveConversationMessage: any
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
      StartConversation: any
    }>> = this.mutation(requestData, data)

    return response
  }
  
}
