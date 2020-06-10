package com.ssafy.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

public class Base64ToImgDecoder {

	public static boolean decoder(String base64, String target){
		
		String data = base64.split(",")[1];
		
		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);
		
		try {
			
			BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
			
			ImageIO.write(bufImg, "jpg", new File(target));
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			return false;
		}
		
		return true;
		
	}
	
}