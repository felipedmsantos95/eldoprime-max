import {Router} from 'express';
import Multer  from 'multer';

//Category
import CategoriesController from '../app/Controllers/CategoriesController'

//Movies
import MoviesController from '../app/Controllers/MoviesController'
import MoviesValidator from '../app/Validator/MoviesValidator';
import uploadConfig from './multer';

//Users
import AuthController from "../app/Controllers/AuthController";
import AuthValidator from '../app/Validator/AuthValidator';
import Auth from '../app/Middlewares/AuthMiddleware';
import UserController from "../app/Controllers/UserController";



const router = Router();
const upload = Multer(uploadConfig);



//Users
router.post('/auth', AuthValidator, AuthController.auth);
router.post('/user', UserController.create);
router.get('/users', UserController.index);

//Categories
router.get('/categories', CategoriesController.index);
router.get('/category/:id', CategoriesController.view);
router.post('/category', CategoriesController.create);
router.delete('/category/:id', CategoriesController.delete);

//Movies
//router.use(Auth);
router.get('/movies', MoviesController.index);
router.get('/movies/:id', MoviesController.indexByCategory);
router.get('/movie/:id', MoviesController.view);
router.post('/movie', upload.single('poster'), MoviesValidator, MoviesController.create);
router.put('/movie/:id', upload.single('poster'), MoviesValidator, MoviesController.update);
router.delete('/movie/:id', MoviesController.delete);



export default router;