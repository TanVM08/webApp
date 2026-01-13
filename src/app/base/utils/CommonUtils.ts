import { HttpParameterCodec, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CommonUtils {
    public static buildParams(obj: any): HttpParams {
        return Object.entries(obj || {})
            .reduce((params, [key, value]) => {
                if (value === null) {
                    return params.set(key, String(''));
                } else if (value == '') {
                    return params;
                } else if (typeof value === typeof {}) {
                    return params.set(key, JSON.stringify(value));
                } else {
                    return params.set(key, String(value));
                }
            }, new HttpParams({ encoder: new CustomEncoder() }));
    }

    public static buildParamsPassNull(obj: any): Object {
        return Object.keys(obj)
            .reduce((acc, key) => {
                if (obj[key] !== null && obj[key] !== undefined) {
                    acc[key] = obj[key];
                }
                return acc;
            }, {} as any)
    }
}


class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }

    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}