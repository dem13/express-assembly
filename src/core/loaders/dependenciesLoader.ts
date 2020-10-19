import {container} from "tsyringe";

import PasswordEncoder from "../auth/PasswordEncoder";
import BcryptPasswordEncoder from "../auth/BcryptPasswordEncoder";

export default () => {
  container.register<PasswordEncoder>(
    "PasswordEncoder",
    {useFactory: (c) => c.resolve(BcryptPasswordEncoder)
    })
}