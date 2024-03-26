import { $api } from "../../services";
import { CombinedError } from "urql";
import Common from "./Common";
import {
  MutationCreateBouhawsClassArgs,
  MutationUpdateBouhawsClassArgs,
} from "../../gql/graphql";
import { Logic } from "..";

export default class Upload extends Common {
  constructor() {
    super();
  }

  //
  public CreateClassPayload: MutationCreateBouhawsClassArgs = {
    description: "",
    title: "",
  };
  public UpdateClassPayload: MutationUpdateBouhawsClassArgs = {
    description: "",
    title: "",
    projects_id: "",
    bouhaws_class_uuid: "",
  };
  //
  public CreateClass = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true });
    $api.class
      .CreateClass(this.CreateClassPayload)
      .then((response) => {
        console.log("CreateClass  response:::", response);
        Logic.Common.hideLoader();
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };

  //
  public UpdateClass = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true });
    $api.class
      .UpdateClass(this.UpdateClassPayload)
      .then((response) => {
        console.log("UpdateClass  response:::", response);
        Logic.Common.hideLoader();
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };
  public UploadImage = (payload: any) => {
    Logic.Common.showLoader({ loading: true, show: false, useModal: true });
    $api.upload
      .UploadImage(payload)
      .then((response) => {
        console.log("UpdateClass  response:::", response);
        Logic.Common.hideLoader();
        return response;
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };
}
