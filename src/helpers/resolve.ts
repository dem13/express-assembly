import {container} from "tsyringe";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";

export default <T>(controller: InjectionToken<T>): T => {
  return container.resolve(controller)
}