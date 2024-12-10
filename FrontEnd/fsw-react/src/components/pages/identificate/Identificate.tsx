import { useForm } from 'react-hook-form';
import css from './identificate.module.css';
import { IFormData } from './IFormData';
import { useNavigate } from 'react-router-dom';
import { requestLogin, responseLogin } from '../../../models/User.module';
import axios from 'axios';
import { getUserInformation, saveToken } from '../../../utils/Token';
import { useContext } from 'react';
import AuthorizationContext from '../../authentication/AuthorizationContext';

export default function Identificate() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IFormData>();
    const {updateUserInformations} = useContext(AuthorizationContext);

    const save = async (data: IFormData) => {
        const request: requestLogin = { userName: data.txtUser, password: data.txtPassword };
        const answer = await axios.post<responseLogin>(`http://localhost:5198/api/user/login`, request);
        saveToken(answer.data.token);
        updateUserInformations(getUserInformation());
        navigate("/");
    };

    return (
        <div className={css["content"]}>
            <h3>Register User</h3>
            <div className={css["contentForm"]}>
                <form onSubmit={handleSubmit(save)}>
                    <div className={css["form"]}>
                        <div className={css["lblUser"]}>
                            <label htmlFor='txtUser'>User</label>
                        </div>
                        <div className={css["txtUser"]}>
                            <input type='text' {...register("txtUser")} />
                        </div>
                        <div className={css["lblPassword"]}>
                            <label htmlFor='txtPassword'>Password</label>
                        </div>
                        <div className={css["txtPassword"]}>
                            <input type='password' {...register("txtPassword")} />
                        </div>
                        <div className={css["buttons"]}>
                            <button type='submit'>Accept</button>
                            <button type='button' onClick={()=>navigate("/")}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}