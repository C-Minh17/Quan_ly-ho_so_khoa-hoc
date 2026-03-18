import { keycloakAuthority, keycloakClientID, keycloakSecret } from './ip';

export const oidcConfig = {
	authority: keycloakAuthority,
	client_id: keycloakClientID,
	client_secret: keycloakSecret,
};
