
const cloudinary = require('../../../utils/cloudinaryConfig');

const uploadController = async (req, res) => {
 
  try {
    res.status(200).json({
      message: 'Uploaded successfully',
      url: req.file.path,         // Cloudinary URL
      public_id: req.file.filename // In case you want to delete later
    });
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" , error});
    console.log(error);
  }
};

const deleteFileFromCloudinary = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: 'public_id is required' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'Deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete', details: error });
  }
};


  module.exports = {
    uploadController,
    deleteFileFromCloudinary
  };
  