import { environment } from "../../../environments/environment";
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    // Địa chỉ realm của Keycloak
    issuer: `${environment.keycloak.url}/realms/${environment.keycloak.realm}`,

    // ClientId đã đăng ký trong Keycloak
    clientId: environment.keycloak.clientId,

    // Đường dẫn callback sau khi login
    redirectUri: environment.keycloak.redirectUri,

    // Silent refresh (giúp làm mới token trong background)
    // silentRefreshRedirectUri: environment.keycloak.redirectUri + '/silent-refresh.html',

    // Phạm vi truy cập (openid là bắt buộc)
    scope: 'openid profile email',

    // Response type: code flow (chuẩn OIDC)
    responseType: 'code',

     // 👇 Cho phép dùng HTTP khi dev
    requireHttps: false,

    // Lưu tokens trong sessionStorage (hoặc localStorage)
    sessionChecksEnabled: false,
    // useSilentRefresh: true,
    showDebugInformation: true, // bật log debug trong console
};