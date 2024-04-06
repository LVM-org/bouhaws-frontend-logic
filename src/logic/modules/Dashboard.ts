import { $api } from "../../services";
import { CombinedError } from "urql";
import Common from "./Common";
import { Logic } from "..";

export default class Auth extends Common {
  constructor() {
    super();
  }

  public DashboardData: any | undefined;
  public hasResponse: boolean = false;
  public ExhibitionData: any | undefined;
  public SearchResults: any | undefined;

  //
  public GetDashboardData = () => {
    return $api.dashboard
      .GetDashboardData()
      .then((response) => {
        console.log("dashboard  response", response.data);
        this.DashboardData = response?.data;
        this.hasResponse = true;

        Logic.Common.hideLoader();
        // Logic.Common.showError(customError, "Oops!", "error-alert");
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };
  public GetExhibitionData = () => {
    return $api.dashboard
      .GetExhibitionData()
      .then((response) => {
        console.log("dashboard  response", response.data);
        this.ExhibitionData = response?.data;

        Logic.Common.hideLoader();
        // Logic.Common.showError(customError, "Oops!", "error-alert");
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };
  public SearchData = (searchTerm: string) => {
    return $api.dashboard
      .Search(searchTerm)
      .then((response) => {
        console.log("search  response", response.data);
        this.SearchResults = response?.data;

        Logic.Common.hideLoader();
        // Logic.Common.showError(customError, "Oops!", "error-alert");
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };
}
