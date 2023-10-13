import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './signUp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../authSlice';
import { url } from '../const';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isLogIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [preview, setPreview] = useState('');

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${url}/users`, data)
      .then((res) => {
        setCookie('token', res.data.token);
        dispatch(logIn());
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。${err}`);
      });
  };

  const handleChangeFile = (e) => {
    const { files } = e.target;
    const file = files[0];

    const compressor = new Compressor(file, {
      quality: 0.6, 
      maxWidth: 200, 
      maxHeight: 200, 
      success(result) {
        const previewURL = window.URL.createObjectURL(result);
        setPreview(previewURL);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <div className="sign-up">
        <h1 className="title">サインアップ</h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">名前</label>
            <br />
            <input id="name" {...register('name')} placeholder="山田太郎" />
          </div>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <br />
            <input id="email" {...register('email')} placeholder="aaa@xxx.yy" />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <br />
            <input
              id="password"
              {...register('password')}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="user-icon">
            <label htmlFor="image">
              <img src={preview} alt="preview" className="preview-img" />
              <input
                id="image"
                type="file"
                onChange={handleChangeFile}
                className="input-img"
              />
            </label>
          </div>
          <div className="click-element">
            <Link className="login-link" to="/login">
              ログイン
            </Link>
            <button type="submit" className="sign-up-button">
              サインアップ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};