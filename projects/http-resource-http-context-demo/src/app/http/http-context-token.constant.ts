import { HttpContextToken } from "@angular/common/http";
import { BinaryResponseType } from "./type/response-type.type";

export const RESPONSE_TYPE = new HttpContextToken<BinaryResponseType>(() => 'arraybuffer');
