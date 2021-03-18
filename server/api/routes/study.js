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

  /* GET study one. */
  route.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    let StudyServcieInstance = new StudyServcie();
    const study = await StudyServcieInstance.findById(id);

    res.status(200).json(study);
  });

  // 스터디 글 삭제
  route.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    let StudyServcieInstance = new StudyServcie();
    StudyServcieInstance.deleteStudy(id);
    res.status(204).json();
  });

  route.post('/comments', async (req, res, next) => {
    const { id, content, author } = req.body;

    let StudyServcieInstance = new StudyServcie();
    const study = await StudyServcieInstance.registerComment(id, content, author);

    return res.status(200).json(study);
  });
}