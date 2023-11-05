import cloudinary from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: 'dahxeam00', 
  api_key: '677152774268772', 
  api_secret: 'LZb1c8wS_oQzGJr3uZpxSTgdbDM' 
});

const cloudinaryUploadImg = async (fileToUpload, folderName) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      folder: folderName,
    });

    // Delete the file from the server
    fs.unlinkSync(fileToUpload);

    return {
      url: data?.secure_url,
    };
  } catch (error) {
    return error;
  }
};

export default cloudinaryUploadImg;
