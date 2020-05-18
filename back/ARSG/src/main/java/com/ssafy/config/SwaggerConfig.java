/**
 * 
 */
package com.ssafy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author 전경윤
 *	Swagger의 설정
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any()).build();
	}
}
	
//	private String version;
//    private String title;
//
//    @Bean
//    public Docket apiV1() {
//        version = "V1";
//        title = "victolee API " + version;
//
//        return new Docket(DocumentationType.SWAGGER_2)
//                .useDefaultResponseMessages(false)
//                .groupName(version)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.victolee.swaggerexam.api.v1"))
//                .paths(PathSelectors.ant("/v1/api/**"))
//                .build()
//                .apiInfo(apiInfo(title, version));
//
//    }
//
//    @Bean
//    public Docket apiV2() {
//        version = "V2";
//        title = "victolee API " + version;
//
//        return new Docket(DocumentationType.SWAGGER_2)
//                .useDefaultResponseMessages(false)
//                .groupName(version)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.victolee.swaggerexam.api.v2"))
//                .paths(PathSelectors.ant("/v2/api/**"))
//                .build()
//                .apiInfo(apiInfo(title, version));
//
//    }
//
//    private ApiInfo apiInfo(String title, String version) {
//        return new ApiInfo(
//                title,
//                "Swagger로 생성한 API Docs",
//                version,
//                "www.example.com",
//                new Contact("Contact Me", "www.example.com", "foo@example.com"),
//                "Licenses",
//
//                "www.example.com",
//
//                new ArrayList<>());
//    }

