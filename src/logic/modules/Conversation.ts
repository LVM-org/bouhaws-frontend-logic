import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationJoinConversationArgs,
  MutationSaveConversationMessageArgs,
  MutationStartConversationArgs,
  Conversation as ConversationModel,
  ConversationMessagePaginator,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Conversation extends Common {
  constructor() {
    super()
  }

  // Base variables
  public ManyConversations: ConversationModel[]
  public EachConversation: ConversationModel
  public ConversationMessages: ConversationMessagePaginator

  // Mutation payloads
  public JoinConversationPayload: MutationJoinConversationArgs
  public SaveConversationMessagePayload: MutationSaveConversationMessageArgs
  public StartConversationPayload: MutationStartConversationArgs

  // Queries
  public GetUserConversation = () => {
    return $api.conversation.GetUserConversations().then((response) => {
      this.ManyConversations = response.data?.AuthUser.conversations
      return response.data?.AuthUser.conversations
    })
  }

  public GetConversation = (uuid: string) => {
    return $api.conversation.GetConversation(uuid).then((response) => {
      this.EachConversation = response.data?.Conversation
      return response.data.Conversation
    })
  }

  public GetConversationMessages = (
    id: string,
    page: number,
    first: number,
  ) => {
    return $api.conversation
      .GetConversationMessages(page, first, id)
      .then((response) => {
        this.ConversationMessages = response.data?.ConversationMessages
        return response.data.ConversationMessages
      })
  }

  // Mutations
  public JoinConversation = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.conversation
      .JoinConversation(this.JoinConversationPayload)
      .then((response) => {
        this.EachConversation = response.data.JoinConversation
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public SaveConversationMessage = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.conversation
      .SaveConversationMessage(this.SaveConversationMessagePayload)
      .then((response) => {
        this.ConversationMessages.data.push(
          response.data.SaveConversationMessage,
        )
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public StartConversation = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.conversation
      .StartConversation(this.StartConversationPayload)
      .then((response) => {
        console.log('StartConversation response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
