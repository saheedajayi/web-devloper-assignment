import { connection } from "../connection";
import { selectPostsTemplate, insertPostTemplate, deletePostTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const createPost = (title: string, body: string, userId: string): Promise<string> =>
  new Promise((resolve, reject) => {
    connection.get("SELECT id FROM users WHERE id = ?", [userId], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      
      if (!result) {
        reject(new Error("User not found"));
        return;
      }
      
      connection.run(insertPostTemplate, [userId, title, body], function(insertError) {
        if (insertError) {
          reject(insertError);
        } else {
          connection.get("SELECT id FROM posts WHERE rowid = ?", [this.lastID], (err, row: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(row.id);
            }
          });
        }
      });
    });
  });

export const deletePost = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.get("SELECT id FROM posts WHERE id = ?", [postId], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      
      if (!result) {
        reject(new Error("Post not found"));
        return;
      }
      
      connection.run(deletePostTemplate, [postId], function(deleteError) {
        if (deleteError) {
          reject(deleteError);
        } else {
          resolve();
        }
      });
    });
  });
