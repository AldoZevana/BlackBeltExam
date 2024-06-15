const Pirate=require('../models/pirate.models')


module.exports.createPirate = (req, res) => {
    if (req.body.position === 'Captain') {
        Pirate.findOne({ position: 'Captain' })
            .then(existingCaptain => {
                if (existingCaptain) {
                    if (!res.headersSent) {
                        return res.status(400).json({ errors: { position: { message: 'There can be only one captain' } } });
                    }
                } else {
                    return Pirate.create(req.body);
                }
            })
            .then((newPirate) => {
                if (!res.headersSent) {
                    res.json(newPirate);
                }
            })
            .catch((err) => {
                if (!res.headersSent) {
                    res.status(400).json(err);
                }
            });
    } else {
        Pirate.create(req.body)
            .then((newPirate) => {
                res.json(newPirate);
            })
            .catch((err) => {
                if (!res.headersSent) {
                    res.status(400).json(err);
                }
            });
    }
};

module.exports.findAllPirates=(request,response)=>{
    Pirate.find({})
    .then(pirate=>response.json(pirate))
    .catch(err=>response.json(err))
}

module.exports.updatePirate = (request, response) => {
    Pirate.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPirate => response.json(updatedPirate))
        .catch(err => response.json(err))
}


module.exports.getPirate= (request, response) => {
    Pirate.findOne({_id:request.params.id})
        .then(pirate => response.json(pirate))
        .catch(err => response.json(err));
}

module.exports.deletePirate = (request, response) => {
    Pirate.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}



