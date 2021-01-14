# OAuth2 auth guide

# Linear OAuth2

Linear supports OAuth2 authentication which is recommended if you're building applications which integrate with Linear.

- **Authorization URL**: `https://linear.app/oauth/authorize`
- **Access Token URL**: `https://api.linear.app/oauth/token`

You'll first need to create an OAuth2 application in [Linear's API settings](https://linear.app/settings/api). It's recommended that you create a workspace just for the purpose of managing the application as each admin user will have access to it.

## Authorizing your OAuth2 application

### Step 1 : Redirect user requests for access to Linear

```
GET https://linear.app/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URL&state=SECURE_RANDOM&scope=read
```

When redirecting a user to Linear to authorize access to your application, you’ll need to construct the authorization URL with the correct parameters and scopes. Here’s a list of parameters you should always specify:

**Parameters**

- `client_id` (required) - Client ID which is provided when you create the application
- `redirect_uri` (required) - Redirect URI
- `response_type=code` (required) - Expected response type
- `scope` (required) - Comma separated list of scopes (listed below)
- `state` (optional) - Prevents CSRF attacks and should always be supplied. Read more about it [here](https://auth0.com/docs/protocols/state-parameters)

**Scopes**

- `read` - (Default) Read access for the user's account. This scope will always be present.
- `write` - Write access for the user's account.
- `issues:create` - Special scope to only gain access in order to create new issues. If this is the main reason for your application, you should ask for this scope instead of `write`
- `admin` - Full access to admin level endpoints. You should never ask for this permission unless it's absolutely needed

Example of an authorization URL:

```
https://linear.app/oauth/authorize?client_id=client1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fcallback&response_type=code&scope=read,write
```

> Note: If the user has already authorized your application for the given scopes, they will be automatically redirected to your redirect url rather than having to approve your application again.

### Step 2: Linear redirects back to your site or application

Once the user approves your application they will be redirected to your application with the OAuth authorization `code` in the URL. If you specified a state parameter in step 1, it will be returned as well. The parameter will always match the value specified in step 1. If the values don’t match, the request should not be trusted.

Example of the redirect:

```
GET https://example.com/oauth/callback?code=9a5190f637d8b1ad0ca92ab3ec4c0d033ad6c862&state=b1ad0ca92
```

### Step 3: Exchange `code` for an access token

After receiving the `code`, you can exchange it for an access token for API authentication. Make a POST request (`application/x-www-form-urlencoded`):

```
POST https://api.linear.app/oauth/token
```

You'll need to supply the following parameters in the POST request:

- `code` - Authorization code from the previous step
- `redirect_uri` - Same redirect URI which you used in the previous step
- `client_id` - Application's client ID
- `client_secret` - Application's client secret
- `grant_type=authorization_code`

After a successful request, a valid access token will be returned in the response:

```json
{
  "access_token": "00a21d8b0c4e2375114e49c067dfb81eb0d2076f48354714cd5df984d87b67cc",
  "token_type": "Bearer",
  "expires_in": 315705599,
  "scope": [
    "read",
    "write"
  ]
}
```
> Note: A user can only have a maximum of *10* valid access tokens for the same application and scopes at any given time. If a request is made for an 11th access token from your app with the same scopes, the oldest token will automatically be revoked.

### Step 4: Making an API request

Once you have obtained a valid access token, you can make a request to Linear's GraphQL API. Pass the token as an authorization header:

```bash
curl https://api.linear.app/graphql \
  -X POST \
  -H "Content-Type: application/json" \
  -H 'Authorization: Bearer 00a21d8b0c4e2375114e49c067dfb81eb0d2076f48354714cd5df984d87b67cc' \
  --data '{ "query": "{ viewer { id name } }" }' \
```

## Revoking an access token

To revoke a user's access to your application, you can use the `/token/revoke` endpoint:

```
POST https://api.linear.app/oauth/revoke
```

You'll also need to pass the access token as Bearer token in the authorization header (`Authorization: Bearer <ACCESS_TOKEN>`) or as the `access_token` form field.

Expected responses:

- `200` - token was revoked
- `400` - unable to revoke token (e.g. token was already revoked)
- `401` - unable to authenticate with the token
