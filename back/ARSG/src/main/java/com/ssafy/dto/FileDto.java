package com.ssafy.dto;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

import com.ssafy.entity.Files;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class FileDto {
	private Long id;
	private Long saegimId;
	private String url;
	private String extension;
	
	public static FileDto of(Files files) {
		PropertyMap<Files, FileDto> filesMap = new PropertyMap<Files, FileDto>() {
			@Override
			protected void configure() {
				String src = "https://saegim.me/api/arsgfiles/" + files.getId() + '.' + files.getExtension();
				map().setUrl(src);
			}
		};
		ModelMapper modelMapper = UtilFactory.getModelMapper();
		modelMapper.addMappings(filesMap);
		FileDto dto = modelMapper.map(files, FileDto.class);
		return dto;
	}
}
