package com.ssafy.configuration;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

public class ConfigurationUtilFactory {
	private static ModelMapper modelmapper;
	
    public static ModelMapper modelmapper(){
        if(modelmapper == null) {
        	ModelMapper mm = new ModelMapper();
        	mm.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        	return modelmapper = mm;
        }
        else
        	return modelmapper;
    }
}
