type Options<T> = {
  queryFn: {
    (): Promise<T>;
  }
  serverErrorMessage?: string;
  isProtected?: boolean;
};

export async function executeQuery<T>({
  queryFn,
  serverErrorMessage = "Error executing query",
  isProtected = true
}: Options<T>) {
  try {
    if(isProtected) {
      // Check if we are authenticated
      //
      // Else throw an error
    }
    return await queryFn();
  }
  catch(error) {
    console.error(serverErrorMessage, error);
    return null;
  }
}
