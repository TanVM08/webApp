export const environment = {
    production: false,
    apiUrl: 'http://localhost:8081/',
    keycloak: {
        url: 'https://keycloak.vdss.com.vn',
        realm: 'cms-parking',
        clientId: 'angular-client',
        redirectUri: 'http://localhost:4200/*'
    },
    accessToken: 'access_token',
    refeshToken: 'refesh_token',
    userInfo: 'userInfo',
    assetPath: '',
    publicKey: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhRN56ZrXbamPwKqPcv7eN8gzTGIcHVgOa6DHYTzANkvOr3WBW+YB5/jO51bsPfMGgmJddlPES5CD0wRkq9/O8tG3cZkahiOvECBtNbhC9rYwmtY5rhysL+b3LBC/jBoP76yqZxa2BaeuzD6J1YY7mKMNGPK1IpyfBbzdaLBL57ocxi8gBQW0gPR+cU5PidrQ3IXw9sLvHGhvlmDA9x+ETcSrW6NgxZA/XrhVoNxYJZzEN95eYgjZjR2DnFNrG8rKlDw78lzDre92VhQQpmHJlG7cjLe82dtK24LigugNbOz3OVLdW8/cS6t/15fa9lMnnWQn7xkbfIywui811mJalwIDAQAB-----END PUBLIC KEY-----',
};

