import { Router } from 'express';
import UserServcie from '../../services/user.js';
const route = Router();

export default (app) => {
    app.use('/users', route);
    
    // 사용자 정보 상세 보기
    route.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        
        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.findById(id);

        res.status(200).json(user);
    });

    // 사용자 정보 수정
    route.patch('/:id', async (req, res, next) => {
        const id = req.params.id;
        const userDTO = req.body;

        let UserServcieInstance = new UserServcie();
        const user = await UserServcieInstance.modifyUser(id, userDTO);

        res.status(200).json(user); 
    });

    // 사용자 정보 삭제(회원탈퇴)
    route.delete('/:id', async (req, res, next) => {
        const id = req.params.id;

        let UserServcieInstance = new UserServcie();
        await UserServcieInstance.deleteUser(id);
        res.status(204).json();
    });
}