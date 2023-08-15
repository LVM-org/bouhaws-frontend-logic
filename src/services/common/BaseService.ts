import {
  createClient,
  Client,
  cacheExchange,
  CombinedError,
  fetchExchange,
} from 'urql'
import { Logic } from '../../logic/modules'
import { API_URL } from '../../common/constants'
import Echo, { Channel, PresenceChannel } from 'laravel-echo'

type FixedEchoChannel = PresenceChannel & Channel

export class BaseApiService {
  private baseUrl: string = API_URL
  public graphqlInstance: Client | undefined

  constructor() {}

  private subscribeToEcho(
    echoClient: Echo,
    channelName: string | null,
    handleSubscription: any,
  ) {
    if (channelName) {
      const channel = echoClient.private(
        channelName.replace(/^private\-/, ''),
      ) as FixedEchoChannel

      channel.listen('.lighthouse-subscription', (result: any) =>
        handleSubscription(result.result.data),
      )
    }
  }

  public query = (query: any, variables: any): Promise<any> => {
    if (Logic.Common.apiUrl) {
      this.baseUrl = Logic.Common.apiUrl || ''
    }

    Logic.Auth.setDefaultAuth()

    this.graphqlInstance = createClient({
      url: this.baseUrl,
      fetchOptions: () => {
        return {
          headers: {
            authorization: Logic.Auth.AccessToken
              ? `Bearer ${Logic.Auth.AccessToken}`
              : '',
          },
        }
      },
      exchanges: [cacheExchange, fetchExchange],
    })

    return this.graphqlInstance
      .query(query, variables)
      .toPromise()
      .then((response) => {
        if (response.error) {
          this.handleErrors(response.error)
          throw response.error
        }

        return response
      })
  }

  public subscription = (
    query: any,
    variables: any,
    handleSubscription: any,
  ): any => {
    if (Logic.Common.apiUrl) {
      this.baseUrl = Logic.Common.apiUrl || ''
    }

    Logic.Auth.setDefaultAuth()

    this.graphqlInstance = createClient({
      url: this.baseUrl,
      fetchOptions: () => {
        return {
          headers: {
            authorization: Logic.Auth.AccessToken
              ? `Bearer ${Logic.Auth.AccessToken}`
              : '',
          },
        }
      },
      fetchSubscriptions: true,
      exchanges: [cacheExchange, fetchExchange],
    })

    return this.graphqlInstance
      .subscription(query, variables)
      .subscribe((result) => {
        this.subscribeToEcho(
          // @ts-ignore
          window.Echo,
          result.extensions?.lighthouse_subscriptions.channel || null,
          handleSubscription,
        )
      })
  }

  public mutation = (query: any, variables: any): Promise<any> => {
    if (Logic.Common.apiUrl) {
      this.baseUrl = Logic.Common.apiUrl || ''
    }

    Logic.Auth.setDefaultAuth()
    this.graphqlInstance = createClient({
      url: this.baseUrl,
      fetchOptions: () => {
        return {
          headers: {
            authorization: Logic.Auth.AccessToken
              ? `Bearer ${Logic.Auth.AccessToken}`
              : '',
          },
        }
      },
      exchanges: [cacheExchange, fetchExchange],
    })

    return this.graphqlInstance
      .mutation(query, variables)
      .toPromise()
      .then((response) => {
        if (response.error) {
          this.handleErrors(response.error)
          throw response.error
        }

        return response
      })
  }

  public handleErrors(err: CombinedError): void {
    // Note: here you may want to add your errors handling

    if (err.graphQLErrors) {
      if (err.graphQLErrors[0].message == 'Unauthenticated.') {
        if (localStorage.getItem('passcode')) {
          Logic.Common.GoToRoute('/auth/passcode')
        } else {
          Logic.Common.GoToRoute('/auth/login')
        }
        Logic.Common.hideLoader()
        return
      }
    } else {
    }
  }
}
