package com.mhp.coding.challenges.auth.configuration;

import com.mhp.coding.challenges.auth.core.logic.DoorService;
import com.mhp.coding.challenges.auth.core.outbound.DoorDatabaseProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GlobalBeanConfiguration {

    @Bean(name = "doorService")
    public DoorService doorService(DoorDatabaseProvider doorDatabaseProvider) {
        return new DoorService(doorDatabaseProvider);
    }

}
