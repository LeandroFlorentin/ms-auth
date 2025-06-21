interface IResponseVerifyBody {
  message?: string;
  boolean: boolean;
}

export const verifyBody = (body: Record<string, any>, fields: string[]): IResponseVerifyBody => {
  const validateArray: string[] = [];
  fields.forEach((field) => {
    if (!body[field]) {
      validateArray.push(field);
    }
  });
  return validateArray.length ? structureResponse(false, `Los sigueientes campos son obligatorios: ${validateArray.join(', ')}.`) : structureResponse(true, '');
};

function structureResponse(boolean: boolean, message?: string): IResponseVerifyBody {
  return {
    boolean,
    message,
  };
}
