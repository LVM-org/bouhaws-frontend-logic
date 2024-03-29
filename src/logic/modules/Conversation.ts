import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationJoinConversationArgs,
  MutationSaveConversationMessageArgs,
  MutationStartConversationArgs,
  Conversation as ConversationModel,
  ConversationMessagePaginator,
  ConversationMessage,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Conversation extends Common {
  constructor() {
    super()
  }

  // Base variables
  public ManyConversations: ConversationModel[] | undefined
  public EachConversation: ConversationModel | undefined
  public ConversationMessages: ConversationMessagePaginator | undefined
  public NewConversationMessage: ConversationMessage | undefined

  // Mutation payloads
  public JoinConversationPayload: MutationJoinConversationArgs | undefined
  public SaveConversationMessagePayload:
    | MutationSaveConversationMessageArgs
    | undefined
  public StartConversationPayload: MutationStartConversationArgs | undefined

  // Queries
  public GetUserConversation = () => {
    return $api.conversation.GetUserConversations().then((response) => {
      this.ManyConversations = response.data?.AuthUser.conversations || []
      return response.data?.AuthUser.conversations
    })
  }

  public GetConversation = (uuid: string) => {
    return $api.conversation.GetConversation(uuid).then((response) => {
      this.EachConversation = response.data?.Conversation
      return response.data?.Conversation
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
        return response.data?.ConversationMessages
      })
  }

  // Mutations
  public JoinConversation = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.JoinConversationPayload) {
      return $api.conversation
        .JoinConversation(this.JoinConversationPayload)
        .then((response) => {
          this.EachConversation = response.data?.JoinConversation
          Logic.Common.hideLoader()
          return response.data?.JoinConversation
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SaveConversationMessage = (showLoader = true) => {
    if (showLoader) {
      Logic.Common.showLoader({
        loading: true,
      })
    }
    if (this.SaveConversationMessagePayload) {
      return $api.conversation
        .SaveConversationMessage(this.SaveConversationMessagePayload)
        .then((response) => {
          if (response.data) {
            this.ConversationMessages?.data.push(
              response.data.SaveConversationMessage,
            )
          }

          if (showLoader) {
            Logic.Common.hideLoader()
          }

          return response.data?.SaveConversationMessage
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public StartConversation = () => {
    Logic.Common.showLoader({
      loading: true,
    })

    if (this.StartConversationPayload) {
      return $api.conversation
        .StartConversation(this.StartConversationPayload)
        .then((response) => {
          this.EachConversation = response.data?.StartConversation
          Logic.Common.hideLoader()
          return response.data?.StartConversation
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SubscribeToConversationMessageCreated = (
    conversationList: string[],
  ) => {
    $api.conversation.SubscribeToConversationMessageCreated(
      conversationList,
      (result: { conversationMessageCreated: ConversationMessage }) => {
        if (
          result.conversationMessageCreated.user.uuid !=
          Logic.Auth.AuthUser?.uuid
        ) {
          this.NewConversationMessage = result.conversationMessageCreated
        }
      },
    )
  }

  public SubscribeToConversationMembership = () => {
    $api.conversation.SubscribeToConversationMembership(
      Logic.Auth.AuthUser?.uuid || '',
      (result: { conversationMembership: Conversation }) => {
        console.log(result)
      },
    )
  }
}
