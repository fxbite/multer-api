import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { searchFile } from '../utils/search';

class UploadControllers {
  // [POST] /api/single
  uploadSingleFile(req: Request, res: Response, next: NextFunction) {
    try {
      const filename = req.file?.filename;
      const path = `${req.protocol}://${req.headers.host}/storage/${filename}`;

      res.status(200).json({
        path: path
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [POST] /api/multiple
  uploadMultipleFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const filename = (req.files as Express.Multer.File[]).map((e) => e.filename);

      const path = [
        `${req.protocol}://${req.headers.host}/storage/${filename[0]}`,
        `${req.protocol}://${req.headers.host}/storage/${filename[1]}`,
        `${req.protocol}://${req.headers.host}/storage/${filename[2]}`
      ];

      res.status(200).json({
        path: path
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [DELETE] /api/destroy/:file
  deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const filename = req.params.file;

      // Check file is exist
      if (!searchFile(filename)) {
        return res.status(404).send('File does not exist');
      }

      // Delete file
      fs.unlinkSync(path.join(__dirname, `../../../upload/${filename}`));
      res.status(200).send('File deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new UploadControllers();
