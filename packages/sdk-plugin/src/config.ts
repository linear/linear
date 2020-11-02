import { RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";

export interface RawSdkPluginConfig extends RawClientSideBasePluginConfig {
  /**
   * usingObservableFrom: "import Observable from 'zen-observable';"
   * OR
   * usingObservableFrom: "import { Observable } from 'rxjs';"
   */
  usingObservableFrom?: string;
}
