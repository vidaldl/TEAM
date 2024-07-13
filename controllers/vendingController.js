

const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const VendingMachine = require('../models/vendingMachine');
const Issue = require('../models/issue');
const Company = require('../models/company');

const vendingAll = async (req, res) => {
  try {
    const vendingMachines = await VendingMachine.find().populate('companyId');

    res.render('vendingAll', { vendingMachines });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const vendingDashboard = async (req, res) => {
  try {
    const vendingMachineId = req.params.id;
    const vendingMachine = await VendingMachine.findById(vendingMachineId).populate('companyId');
    const issues = await Issue.find({ vendingMachine: vendingMachineId });

    const outOfStockItems = await Issue.aggregate([
      { $match: { vendingMachine: vendingMachine._id, issueType: 'out_of_stock' } },
      { $group: { _id: '$description', count: { $sum: 1 } } },
      { $project: { name: '$_id', count: 1, _id: 0 } }
    ]);

    const maintenanceIssues = await Issue.aggregate([
      { $match: { vendingMachine: vendingMachine._id, issueType: 'maintenance' } },
      { $group: { _id: '$description', count: { $sum: 1 } } },
      { $project: { name: '$_id', count: 1, _id: 0 } }
    ]);
    const qrCodeUrl = `http://localhost:3000/issues/report/${vendingMachineId}`;
    const qrCode = await QRCode.toDataURL(qrCodeUrl);
    res.render('vendingDashboard', { vendingMachine, issues, outOfStockItems, maintenanceIssues, qrCode });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const generateQRCode = async (req, res) => {
  try {
    const vendingMachineId = req.params.id;
    const qrCodeUrl = `http://localhost:3000/issues/report/${vendingMachineId}`;
    const qrCode = await QRCode.toDataURL(qrCodeUrl);
    res.render('qrCode', { qrCode, qrCodeUrl });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const printQRCode = async (req, res) => {
  try {
    const vendingMachineId = req.params.id;
    const qrCodeUrl = `http://localhost:3000/issues/report/${vendingMachineId}`;
    const qrCode = await QRCode.toDataURL(qrCodeUrl);

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=qr-code-${vendingMachineId}.pdf`,
        })
        .end(pdfData);
    });

    doc.fontSize(25).text('Something went wrong? Report by scanning the code!', 100, 80);
    doc.image(qrCode, {
      fit: [250, 250],
      align: 'center',
      valign: 'center',
    });
    doc.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  vendingAll,
  vendingDashboard,
  generateQRCode,
  printQRCode,

};
