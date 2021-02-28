package com.mhp.coding.challenges.auth.configuration;

import com.mhp.coding.challenges.auth.configuration.oauth.keycloak.KeycloakGrantedAuthoritiesConverter;
import com.mhp.coding.challenges.auth.core.logic.DoorService;
import com.mhp.coding.challenges.auth.core.outbound.DoorDatabaseProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

@Configuration
public class GlobalBeanConfiguration {

    @Bean(name = "doorService")
    public DoorService doorService(DoorDatabaseProvider doorDatabaseProvider) {
        return new DoorService(doorDatabaseProvider);
    }

    @Bean(name = "jwtAuthenticationConverter")
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(new KeycloakGrantedAuthoritiesConverter());
        return jwtConverter;
    }
}
