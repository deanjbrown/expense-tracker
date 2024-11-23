/**
 * TODO => This needs to be rewritten if we're going to use it within our services
 *
 *
 */

type Options<T> = {
  actionFn: {
    (): Promise<T>;
  };
  //actionFn: () => Promise<T>;
  isProtected?: boolean;
  serverErrorMessage?: string;
  clientSuccessMessage?: string;
};

// TODO => Not so sure that we will need to do promise <{success: boolean; message: string;}> part
export async function executeAction<T>({
  actionFn,
  isProtected = true,
  serverErrorMessage="Error executing action",
  clientSuccessMessage = "Operation was successful"
}: Options<T>): Promise<{success: boolean; message: string; objectID?: number;}> {
  try {
    if(isProtected) {
      // Check if we are authenticated
      //
      // Else throw an error
    }
    const result = await actionFn();
    return {
      success: true,
      message: clientSuccessMessage,
//      objectID: result.objectID,
    }
  }
  catch(error) {
    console.error(serverErrorMessage, error);
    return {
      success: false,
      message: serverErrorMessage
    }
  }
}

type betterOptions<T> = {
  executeFn: () => Promise<T>
  isProtected?: boolean;
  serverErrorMessage?: string;
  clientSuccessMessage?: string;
}

export async function betterExecuteQuery<T>({
  executeFn,
  isProtected = true,
  serverErrorMessage = "Error executing action",
  clientSuccessMessage = "Action was successful"
}: betterOptions<T>): Promise<{success: boolean, message: string, objectID?: number;}> {
  try {
    console.log("[+] Trying to execute the executeFn");
    const result = await executeFn();



    return {
      success: true,
      message: clientSuccessMessage
    }
  }
  catch(error){
    console.error(serverErrorMessage, error)
    return {
      success: false,
      message: serverErrorMessage
    }
  }
}
