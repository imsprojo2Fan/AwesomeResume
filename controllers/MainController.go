package controllers

import "github.com/astaxie/beego"

type MainController struct {
	beego.Controller
}

func(this *MainController) Index()  {
	this.TplName = "main/index.html"
}

func(this *MainController) Redirect()  {
	htmlName := this.GetString("htmlName")
	htmlName = "main/"+htmlName+".html"
	this.TplName = htmlName
}
