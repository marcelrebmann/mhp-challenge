package com.mhp.coding.challenges.auth.configuration.oauth;

import net.minidev.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private JwtAuthenticationConverter jwtAuthenticationConverter;

    public SecurityConfig(JwtAuthenticationConverter jwtAuthenticationConverter) {
        this.jwtAuthenticationConverter = jwtAuthenticationConverter;
    }

    /**
     * Configures the authentication for the endpoints.
     * - Read doors (GET /v1/door) is only permitted for users with DOOR_VIEWER role.
     * - Modify doors (POST /v1/door) is only permitted for users with DOOR_USER role.
     *
     * Configures the error http response code mapping for unauthorized requests to 403 (Forbidden)
     * This way, unauthenticated users as well as authenticated, but unauthorized users get
     * the same http response code.
     * @param http The http security object.
     * @throws Exception If an error during the configuration occurs.
     */
    @Override
    protected void configure(final HttpSecurity http) throws Exception {

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/v1/door").hasRole(UserRoles.DOOR_VIEWER.toString())
                .antMatchers(HttpMethod.POST, "/v1/door").hasRole(UserRoles.DOOR_USER.toString())
                .anyRequest()
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthenticationConverter);

        http.exceptionHandling()
                .authenticationEntryPoint((request, response, e) -> {
                    response.setContentType("application/json;charset=UTF-8");
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write(new JSONObject().toString());
                });
    }
}