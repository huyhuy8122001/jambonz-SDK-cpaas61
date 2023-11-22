const router = require('express').Router();
const { WebhookResponse } = require('@jambonz/node-client');

router.post('/', (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, 'POST/from-zalo');
  try {
    const app = new WebhookResponse();
    app.dial({
      callerId: req.body.from,
      answerOnBridge: true,
      target: [
        // {
        //   type: 'user',
        //   name: '103@sip.cpaas61.epacific.net'
        // },
        {
          type: 'user',
          name: '103@sip.cpaas61.epacific.net'
        },
        // {
        //   "type": "phone",
        //   "number": "8844773997146980834",
        //   "trunk": "Zalo_ZCC"
        // }
      ]
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;