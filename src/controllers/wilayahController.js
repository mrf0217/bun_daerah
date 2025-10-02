// controllers/wilayahController.js
import { Provinsi, Kabupaten } from '../models/index.js';
import { logApiAccess, logApiStart } from '../utils/apiLogger.js';

export const getAll = async (req, res) => {
  logApiStart(req);
  
  try {
    const provinsi = await Provinsi.findAll({ 
      attributes: ['wilayah', 'nama_provinsi'] 
    });
    
    const kabupaten = await Kabupaten.findAll({ 
    attributes: ['wilayah', 'nama_kabupaten', ],
    include: { model: Provinsi, attributes: ['wilayah', 'nama_provinsi']  }
    });

    const responseData = {
      status: true,
      data: { provinsi, kabupaten },
      message: "OK"
    };

    res.json(responseData);
    
    // Log successful access to database
    await logApiAccess(req, res, { 
      provinsiCount: provinsi.length, 
      kabupatenCount: kabupaten.length 
    });
    
  } catch (err) {
    console.log(err);
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error to database
    await logApiAccess(req, res, null, err);
  }
};

export const getProvinsi = async (req, res) => {
  logApiStart(req);
  
  try {
    const data = await Provinsi.findAll(); // 
    const responseData = {
      status: true,
      data,
      message: "OK"
    };
    
    res.json(responseData);
    
    // Log successful access to database
    await logApiAccess(req, res, { provinsiCount: data.length });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error to database
    await logApiAccess(req, res, null, err);
  }
};

export const getKabupaten = async (req, res) => {
  logApiStart(req);
  
  try {
    const data = await Kabupaten.findAll({ include: Provinsi }); 
    const responseData = {
      status: true,
      data,
      message: "OK"
    };
    
    res.json(responseData);
    
    // Log successful access to database
    await logApiAccess(req, res, { kabupatenCount: data.length });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error to database
    await logApiAccess(req, res, null, err);
  }
};

export const getByWilayah = async (req, res) => {
  logApiStart(req);
  const { wilayah } = req.params;

  try {
    const provinsi = await Provinsi.findByPk(wilayah, { include: Kabupaten });
    if (provinsi) {
      const responseData = {
        status: true,
        data: provinsi,
        message: "OK"
      };
      
      res.json(responseData);
      
      // Log successful access to database
      await logApiAccess(req, res, { foundType: 'provinsi', wilayah });
      return;
    }

    const kabupaten = await Kabupaten.findByPk(wilayah, { include: Provinsi });
    if (kabupaten) {
      const responseData = {
        status: true,
        data: kabupaten,
        message: "OK"
      };
      
      res.json(responseData);
      
      // Log successful access to database
      await logApiAccess(req, res, { foundType: 'kabupaten', wilayah });
      return;
    }

    const notFoundResponse = {
      status: false,
      data: [],
      message: "404 Not Found"
    };
    
    res.status(404).json(notFoundResponse);
    
    // Log not found to database
    await logApiAccess(req, res, { foundType: 'none', wilayah });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log error to database
    await logApiAccess(req, res, null, err);
  }
};

export default {
  getAll,
  getProvinsi,
  getKabupaten,
  getByWilayah
};
