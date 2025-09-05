// import { Factory } from "fishery"
// import {User} from "@/types/user";

// export const UserFactory = Factory.define<User>(({ sequence }) => ({
//     id: sequence.toString(),
//     name: `Test User ${sequence}`,
//     email: `user${sequence}@test.com`,
//     address: `${sequence} Test Street, Test City, T1T 1T1`,
// }));

import { Factory } from "fishery"
import { UserFromAPI } from "@/types/user"

export const UserFactory = Factory.define<UserFromAPI>(({ sequence }) => ({
    id: sequence.toString(),
    name: `Test User ${sequence}`,
    username: `user${sequence}`,
    email: `user${sequence}@test.com`,
    phone: `100-200-300${sequence}`,
    street: `${sequence} Test Street`,
    city: "Test City",
    state: "TS",
    zipcode: `T${sequence}T ${sequence}T${sequence}`,
}))


