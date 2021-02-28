package com.mhp.coding.challenges.auth.configuration.oauth.keycloak;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Custom converter to find and extract realm roles as authorities from Keycloak JWT.
 * Each role found is transformed into the standardized spring role format (prefixed with ROLE_).
 */
public class KeycloakGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final String KEYCLOAK_JWT_ROLE_CLAIM_NAME = "roles";
    private final String ROLE_PREFIX = "ROLE_";

    public KeycloakGrantedAuthoritiesConverter() {
    }

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
        List<String> roles = (List<String>) realmAccess.get(this.KEYCLOAK_JWT_ROLE_CLAIM_NAME);
        return roles.stream()
                .map(roleName -> new SimpleGrantedAuthority(this.ROLE_PREFIX + roleName))
                .collect(Collectors.toList());
    }
}