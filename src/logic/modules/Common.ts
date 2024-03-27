import currency from 'currency.js'
import moment from 'moment'
import { CombinedError } from 'urql'
import { reactive } from 'vue'
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from 'vue-router'
import { Logic } from '..'
import { FetchRule, LoaderSetup } from '../types/common'
import Echo from 'laravel-echo'
import pusher from 'pusher-js'
// @ts-ignore
window.Pusher = pusher

export default class Common {
  public router: Router | undefined = undefined
  public route: RouteLocationNormalized | undefined = undefined

  public apiUrl: string | undefined = undefined

  public watchInterval: number | undefined = undefined

  public NavigateTo: any

  public loadingState = false

  public SetRouter = (router: Router) => {
    this.router = router
  }

  public SetRoute = (route: RouteLocationNormalized) => {
    this.route = route
  }

  public SetNavigator = (navigator: any) => {
    this.NavigateTo = navigator
  }

  public loaderSetup: LoaderSetup = reactive({
    show: false,
    useModal: false,
    hasError: false,
    loading: false,
    message: '',
    ctaText: '',
    ctaFunction: () => {},
    icon: 'success-thumb',
    title: '',
  })

  public SetApiUrl = (apiUrl: string) => {
    this.apiUrl = apiUrl
  }

  public GoToRoute = (path: string) => {
    this.router?.push(path)
  }

  public connectToWebsocket = (
    pusherKey: string,
    websocketUrl: string,
    websocketHost: string,
  ) => {
    // If using http connection use this
    // @ts-ignore
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: pusherKey,
      cluster: 'mt1',
      wsHost: `${websocketHost}`, // Your domain
      encrypted: true,
      wsPort: 6001, // Your http port
      disableStats: true, // Change this to your liking this disables statistics
      forceTLS: true,
      enabledTransports: ['ws', 'wss'],
      disabledTransports: ['sockjs', 'xhr_polling', 'xhr_streaming'], // Can be removed
      auth: {
        headers: {
          authorization: `Bearer ${Logic.Auth.AccessToken}`,
        },
      },
      authEndpoint: `${websocketUrl}/graphql/subscriptions/auth`,
    })
  }

  public showError = (
    error: CombinedError | any,
    title: string,
    fallbackMsg = '',
  ) => {
    const message = error.graphQLErrors?.[0]?.message || undefined
    console.log({ message })

    this.showLoader({
      show: true,
      useModal: true,
      loading: false,
      hasError: true,
      message: message != 'null' ? message : fallbackMsg,
      title,
      type: 'error',
    })
  }

  public getLabel = (data: any, key: string) => {
    const thisData = data.filter((Option: any) => {
      return Option.key == key
    })

    return thisData.length > 0 ? thisData[0].value : ''
  }

  public showLoader = (loaderSetup: LoaderSetup) => {
    this.loaderSetup = loaderSetup
  }

  public showAlert = (loaderSetup: LoaderSetup) => {
    this.loaderSetup = loaderSetup
  }

  public goBack = () => {
    window.history.length > 1 ? this.router?.go(-1) : this.router?.push('/')
  }

  public hideLoader = () => {
    const Loader: LoaderSetup = {
      loading: false,
    }
    this.loaderSetup = Loader
  }

  public globalParameters = reactive<{
    currency: string
  }>({
    currency: 'ngn',
  })

  public momentInstance = moment

  public convertToMoney = (
    float: any,
    withZeros = true,
    currencyType = 'ngn',
    withSymbol = true,
  ) => {
    let currencySymbol = ''
    if (currencyType == 'usd') {
      currencySymbol = '$ '
    } else if (currencyType == 'ngn') {
      currencySymbol = '₦ '
    }
    if (!withSymbol) {
      currencySymbol = ''
    }
    if (withZeros) {
      return currency(float, {
        separator: ',',
        symbol: currencySymbol,
      }).format()
    } else {
      return currencySymbol + new Intl.NumberFormat().format(parseFloat(float))
    }
  }

  private isString = (x: any) => {
    return Object.prototype.toString.call(x) === '[object String]'
  }

  public searchArray = (arr: any[], searchKey: string) => {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return this.isString(obj[key]) ? obj[key].includes(searchKey) : false
      })
    })
  }

  public debounce = (
    method = () => {
      //
    },
    delay = 500,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (typeof window.LIT !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      clearTimeout(window.LIT)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.LIT = setTimeout(() => {
      method()
    }, delay)
  }

  public watchProperty = (objectToWatch: any, objectToUpdate: any) => {
    let upatedValue = (this as any)[`${objectToWatch}`]
    const watchAction = () => {
      upatedValue = (this as any)[`${objectToWatch}`]
      if (objectToUpdate) {
        objectToUpdate.value = upatedValue
      }
      this.watchInterval = window.requestAnimationFrame(watchAction)
    }

    watchAction()
  }

  public stopWatchAction = () => {
    if (this.watchInterval != undefined) {
      window.cancelAnimationFrame(this.watchInterval)
    }
  }

  private fetchFile = (url: string) => {
    return new Promise(function (resolve, reject) {
      // Get file name from url.
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function () {
        resolve(xhr)
      }
      xhr.onerror = reject
      xhr.open('GET', url)
      xhr.send()
    }).then(function (xhr: any) {
      const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0]
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(xhr.response) // xhr.response is a blob
      a.download = filename // Set the file name.
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      return xhr
    })
  }

  public downloadFiles = (urls = []) => {
    return Promise.all(urls.map(this.fetchFile))
  }

  public fomartDate = (date: string, format: string) => {
    return moment(date).format(format)
  }

  public countDownTime = (endTime: string) => {
    return moment(moment(endTime).diff(moment.now())).format('mm:ss')
  }

  public timeFromNow = (time: string) => {
    return moment(time).fromNow()
  }

  public updatedData = (oldData: any, newData: any) => {
    if (oldData != undefined && newData != undefined) {
      return { ...oldData, ...newData }
    }
    return oldData
  }

  public makeid = (length: number) => {
    let result = ''
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  public preFetchRouteData = (
    routeTo: RouteLocationNormalized | any,
    _routeFrom: RouteLocationNormalized | any,
    next: any,
    usePromise = true,
  ) => {
    const globalMiddleWare = (mainResolve: any | undefined) => {
      const allActions: Promise<any>[] = []
      if (this.loaderSetup.loading) {
        if (mainResolve) {
          mainResolve('')
        } else {
          return next()
        }
      }

      const routeMiddlewares: any = routeTo.meta.middlewares

      // handle fetchRules

      const fetchRules: FetchRule[] = routeMiddlewares.fetchRules

      if (!fetchRules) {
        if (mainResolve) {
          mainResolve('')
        } else {
          return next()
        }
      }

      let BreakException = {}

      try {
        for (let index = 0; index < fetchRules.length; index++) {
          const rule: FetchRule = JSON.parse(JSON.stringify(fetchRules[index]))

          if (rule.requireAuth) {
            if (!Logic.Auth.AuthUser) {
              this.GoToRoute('/auth/login')
              throw BreakException
            }
          }
          // @ts-ignore
          const domain = Logic[rule.domain]

          if (rule.alignCurrency) {
            if (rule.params[0] != this.globalParameters.currency) {
              rule.params[0] = this.globalParameters.currency
              rule.ignoreProperty = true
            }
          }

          if (
            domain[rule.property] == undefined ||
            (typeof rule.ignoreProperty == 'function' &&
              rule.ignoreProperty()) ||
            rule.ignoreProperty
          ) {
            allActions.push(
              new Promise((resolve) => {
                if (rule.useRouteId) {
                  rule.params.unshift(routeTo.params.id.toString())
                }
                if (rule.useRouteQuery) {
                  rule.queries?.forEach((item) => {
                    rule.params.unshift(routeTo.query[item])
                  })
                }
                const params = [...new Set(rule.params)]

                const request = domain[rule.method](...params)
                request?.then((value: any) => {
                  resolve(value)
                })
              }),
            )
          } else {
            if (rule.silentUpdate) {
              // run in silence
              if (rule.useRouteId) {
                rule.params.unshift(routeTo.params.id.toString())
              }
              if (rule.useRouteQuery) {
                rule.queries?.forEach((item) => {
                  rule.params.unshift(routeTo.query[item])
                })
              }
              const params = [...new Set(rule.params)]
              domain[rule.method](...params)
            }
          }
        }
      } catch (error) {
        if (error !== BreakException) throw error
      }

      // save user activities
      if (routeMiddlewares.tracking_data) {
        const trackingData: any = routeMiddlewares.tracking_data
      }

      if (allActions.length > 0) {
        this.showLoader({
          loading: true,
        })

        Promise.all(allActions).then(() => {
          this.hideLoader()
          if (mainResolve) {
            mainResolve('')
          } else {
            return next()
          }
        })
      } else {
        this.hideLoader()
        if (mainResolve) {
          mainResolve('')
        } else {
          return next()
        }
      }
    }

    if (usePromise) {
      return new Promise((resolve) => {
        return globalMiddleWare(resolve)
      })
    } else {
      return globalMiddleWare(null)
    }
  }
}
