const express = require('express');
const router = express();
const statesController = require("../../controller/statesController");


router.route("/").get(statesController.getDoesContig)
.post(statesController.createStateInDatabase)
.put(statesController.updateFunfactsInDatabase);;

router.route("/:code")
.get(statesController.getState);

router.route("/:code/capital")
.get(statesController.getStateCapital);

router.route("/:code/nickname")
.get(statesController.getStateNickname);

router.route("/:code/population")
.get(statesController.getStatePopulation);

router.route("/:code/admission")
.get(statesController.getStateAdmissiondate);

router.route("/:code/funfact")
.get(statesController.getStateFunfact);








module.exports = router;
