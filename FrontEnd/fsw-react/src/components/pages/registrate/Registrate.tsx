import { useForm } from 'react-hook-form';
import css from './register.module.css';
import { IFormData } from './IFormData';
import { requestLogin, responseLogin } from '../../../models/User.module';
import axios from 'axios';
import { getUserInformation, saveToken } from '../../../utils/Token';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthorizationContext from '../../authentication/AuthorizationContext';

export default function Registrate() {
    const navigate = useNavigate();
    const {updateUserInformations} = useContext(AuthorizationContext);
    const { register, handleSubmit } = useForm<IFormData>();

    const save = async (data: IFormData) => {
        const request: requestLogin = { userName: data.txtUser, password: data.txtPassword1 };
        const answer = await axios.post<responseLogin>(`http://localhost:5198/api/user/registration`, request);
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
                        <div className={css["lblPassword1"]}>
                            <label htmlFor='txtPassword1'>Password</label>
                        </div>
                        <div className={css["txtPassword1"]}>
                            <input type='password' {...register("txtPassword1")} />
                        </div>
                        <div className={css["lblPassword2"]}>
                            <label htmlFor='txtPassword2'>Repeat password</label>
                        </div>
                        <div className={css["txtPassword2"]}>
                            <input type='password' {...register("txtPassword2")} />
                        </div>
                        <div className={css["buttons"]}>
                            <button type='submit'>Accept</button>
                            <button type='button' onClick={() => navigate("/")}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}