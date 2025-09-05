import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<any>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }

          const usersWithAddress: User[] = results.map((user: any) => {
              return {
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  address: {
                      street: user.street,
                      city: user.city,
                      state: user.state,
                      zipcode: user.zipcode,
                  },
              };
          });


          resolve(usersWithAddress);
      }
    );
  });
