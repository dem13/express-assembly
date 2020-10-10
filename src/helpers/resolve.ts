import {container} from "tsyringe";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";

export default <T>(token: InjectionToken<T>): T => {
  return container.resolve(token)
}