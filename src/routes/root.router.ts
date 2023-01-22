import express from 'express';

const router = express.Router();

router.get('/', (_request, response) => {
  response.render('index.html');
});
export default router;
