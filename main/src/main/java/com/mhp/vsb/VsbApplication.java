package com.mhp.vsb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages="com.mhp")
@EnableJpaRepositories(basePackages="com.mhp")
@EntityScan(basePackages="com.mhp")
@Configuration
@EnableScheduling
public class VsbApplication {
	public static void main(String[] args) {
		SpringApplication.run(VsbApplication.class, args);
	}
}
