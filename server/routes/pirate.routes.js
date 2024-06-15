const PirateController = require('../controllers/pirate.controllers');
module.exports = (app) => {
    app.get('/api/pirate/:id', PirateController.getPirate);
    app.get('/api/pirates', PirateController.findAllPirates);
    app.post('/api/pirate/new', PirateController.createPirate);
    app.put('/api/pirates/edit/:id', PirateController.updatePirate);
    app.delete('/api/pirates/:id', PirateController.deletePirate);
};