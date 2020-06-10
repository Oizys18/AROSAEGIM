package com.ssafy.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	private final String uploadPath;
	
	public WebConfig(@Value("${custom.path.upload}") String uploadPath) {
		this.uploadPath = uploadPath;
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/arsgfiles/**")
				.addResourceLocations("file:///"+uploadPath)
				.setCachePeriod(180);
	}
	
}
