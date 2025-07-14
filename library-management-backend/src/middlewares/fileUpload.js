const multer = require('multer'); 
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Book cover upload (images)
const bookCoverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'library/book-covers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    resource_type: 'image'
  }
});
const uploadBookCover = multer({ storage: bookCoverStorage });

// Book PDF upload (pdfs)
const bookPdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'library/book-pdfs',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
});
const uploadBookPdf = multer({ storage: bookPdfStorage });

// Certificate upload
const certificateStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'library/certificates',
    allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
    resource_type: 'auto'
  }
});
const uploadCertificate = multer({ storage: certificateStorage });

// Book upload with both cover and PDF
const uploadBookWithDetailsMiddleware = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      let folder = 'library/others';
      let allowed_formats = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
      let resource_type = 'auto';

      if (file.fieldname === 'bookCover') {
        folder = 'library/book-covers';
        allowed_formats = ['jpg', 'jpeg', 'png'];
        resource_type = 'image';
      } else if (file.fieldname === 'bookPdf') {
        folder = 'library/book-pdfs';
        allowed_formats = ['pdf'];
        resource_type = 'raw';
      }

      return {
        folder,
        allowed_formats,
        resource_type
      };
    }
  })
});
const uploadBookWithDetails = uploadBookWithDetailsMiddleware.fields([
  { name: 'bookCover', maxCount: 1 },
  { name: 'bookPdf', maxCount: 1 }
]);

module.exports = {
  uploadBookCover: uploadBookCover.single('bookCover'),
  uploadBookPdf: uploadBookPdf.single('bookPdf'),
  uploadCertificate: uploadCertificate.single('certificate'),

  // ✅ Wrap fields() to return a proper middleware function
  uploadBookWithDetails,
};