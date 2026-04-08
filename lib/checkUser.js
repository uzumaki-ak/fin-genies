import { getDbUser } from "./get-db-user";

export const checkUser = async () => {
  try {
    return await getDbUser();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
