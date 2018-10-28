package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeResume/utils"
)

type MainController struct {
	beego.Controller
}

func(this *MainController) Index()  {
	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	userInfo := session.Get("user")
	this.Data["userInfo"] = userInfo
	this.Data["account"] = session.Get("account")
	this.TplName = "main/index.html"
}

func(this *MainController) Redirect()  {
	htmlName := this.GetString("htmlName")
	htmlName = "main/"+htmlName+".html"
	this.TplName = htmlName
}
