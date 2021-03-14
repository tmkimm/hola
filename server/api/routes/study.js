import { Router } from 'express'; 
import { Study } from '../../models/Study.js';
import { isAuth } from '../middlewares/isAuth.js';
import { checkStudy, isStudyValid } from '../middlewares/isStudyValid.js';
import StudyServcie from '../../services/study.js';
const route = Router();

export default (app) => {
  app.use('/study', route);
  
  /* GET study list. */
  route.get('/', async (req, res, next) => {
    const { offset, limit, sort, language } = req.query;
    let StudyServcieInstance = new StudyServcie();
    const studies = await StudyServcieInstance.findStudy(offset, limit, sort, language);

    res.status(200).json(studies);
  });
  
  /* GET study one. */
  route.get('/:sequence', async (req, res, next) => {
    const sequence = req.params.sequence;

    let StudyServcieInstance = new StudyServcie();
    const study = await StudyServcieInstance.findOneStudy(sequence);

    res.status(200).json(study);
  });

  /* POST study create. */
  route.post('/', checkStudy, isStudyValid, isAuth, function(req, res, next) {
    const study = new Study(req.body);
    study.save((err, studies) => {
      if (err)
        return res.status(400).json({ errors: [
          {
            location: 'body',
            param: 'name',
            error: 'TypeError',
            message: 'must be String'
          }
        ], err });
      return res.status(201).json(studies);
    })
  });
}