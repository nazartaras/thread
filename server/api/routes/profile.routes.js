import { Router } from 'express';
import * as profileService from '../services/profile.service';

const router = Router();

router
    .put('/', (req, res, next) => {
        profileService.updateProfile(req.user.id, req.body); 
        res.send('updated')});
    

export default router;