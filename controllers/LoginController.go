package controllers

import "github.com/astaxie/beego"

type LoginController struct {
	beego.Controller
}

func(this *LoginController) LoginIndex()  {
	this.TplName = "login/login.html"
}

