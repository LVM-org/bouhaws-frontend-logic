import { createClient, Client, dedupExchange, cacheExchange, CombinedError, fetchExchange } from 'urql';
// import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { Logic } from "../../logic/modules";
import { API_URL } from "../../common/constants";

export class BaseApiService {
	private baseUrl: string = API_URL;
	public graphqlInstance: Client | undefined;

	constructor() {

	}

	public query = (query: any, variables: any): Promise<any> => {
		if (Logic.Common.apiUrl) {
			this.baseUrl = Logic.Common.apiUrl || ''
		}

		this.graphqlInstance = createClient({
			url: this.baseUrl,
			fetchOptions: () => {
				return {
					headers: { authorization: Logic.Auth.AccessToken ? `Bearer ${Logic.Auth.AccessToken}` : '' },
				};
			},
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

		return this.graphqlInstance.query(query, variables)
			.toPromise().then((response) => {
				if (response.error) {
					this.handleErrors(response.error)
					throw response.error
				}

				return response
			});
	}

	public mutation = (query: any, variables: any): Promise<any> => {
		if (Logic.Common.apiUrl) {
			this.baseUrl = Logic.Common.apiUrl || ''
		}
		this.graphqlInstance = createClient({
			url: this.baseUrl,
			fetchOptions: () => {
				return {
					headers: { authorization: Logic.Auth.AccessToken ? `Bearer ${Logic.Auth.AccessToken}` : '' },
				};
			},
			// exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
			exchanges: [dedupExchange, cacheExchange  ],
		});

		return this.graphqlInstance.mutation(query, variables)
			.toPromise().then((response) => {
				if (response.error) {
					this.handleErrors(response.error)
					throw response.error
				}

				return response
			});
	}

	public handleErrors(err: CombinedError): void {
		// Note: here you may want to add your errors handling
		if (err.graphQLErrors[0].message == "Unauthenticated.") {
			Logic.Common.GoToRoute('/auth/login')
			Logic.Common.hideLoader()
			return
		}
	}
}  