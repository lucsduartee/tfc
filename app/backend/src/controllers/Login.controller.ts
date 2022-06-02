import express from 'express';
import LoginService from './services/Login.service';

export default class LoginController {
  public loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }
};
