import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationJoinConversationArgs,
  MutationSaveConversationMessageArgs,
  MutationStartConversationArgs,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Conversation extends Common {
  constructor() {
    super()
  }

  //
  public JoinConversationPayload: MutationJoinConversationArgs = {
    associated_users_uuid: '' || undefined,
    conversation_uuid: '',
  }
  public SaveConversationMessagePayload: MutationSaveConversationMessageArgs = {
    content: '',
    conversation_id: 0,
    media: '',
    type: '',
  }
  public StartConversationPayload: MutationStartConversationArgs = {
    associated_users_uuid: '' || undefined,
  }

  //
  public JoinConversation = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.conversation
      .JoinConversation(this.JoinConversationPayload)
      .then((response) => {
        console.log('JoinConversation response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public SaveConversationMessage = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.conversation
      .SaveConversationMessage(this.SaveConversationMessagePayload)
      .then((response) => {
        console.log('SaveConversationMessage response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
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
