package routers

import (
	"AwesomeResume/controllers"
	"github.com/astaxie/beego"
)

func init() {
	//网站首页相关
	beego.Router("/", &controllers.IndexController{},"*:Index")
	beego.Router("/resume", &controllers.IndexController{},"*:Redirect")
	beego.Router("/resume/submit", &controllers.Info4ResumeController{},"*:Insert")
	beego.Router("/index/mail4index", &controllers.IndexController{},"*:Mail4Index")
	//登录相关
	beego.Router("/login", &controllers.LoginController{},"*:LoginIndex")
	beego.Router("/validate", &controllers.LoginController{},"*:Validate")
	beego.Router("/timeout", &controllers.LoginController{},"*:Timeout")
	//后台管理相关
    beego.Router("/main",&controllers.MainController{},"*:Index")
	beego.Router("/main/redirect",&controllers.MainController{},"*:Redirect")
	//图片上传
	beego.Router("/main/upload4pic",&controllers.MainController{},"POST:Upload4Pic")
	//模板信息管理
	beego.Router("/main/resume/insert",&controllers.ResumeController{},"POST:Insert")
	beego.Router("/main/resume/edit",&controllers.ResumeController{},"POST:Update")
	beego.Router("/main/resume/delete",&controllers.ResumeController{},"POST:Delete")
	beego.Router("/main/resume/list",&controllers.ResumeController{},"POST:ListByPage")
	beego.Router("/index/resume/list",&controllers.ResumeController{},"POST:ListByPage4Index")
	//简历信息管理
	beego.Router("/main/resume/made",&controllers.Info4ResumeController{},"POST:ListByUid")
	beego.Router("/main/resume/use",&controllers.Info4ResumeController{},"POST:Insert4Use")
	beego.Router("/main/info4resume/reset4share",&controllers.Info4ResumeController{},"POST:Reset4share")
	beego.Router("/main/info4resume/update",&controllers.Info4ResumeController{},"POST:Update")
	beego.Router("/share",&controllers.Info4ResumeController{},"*:Share")
	beego.Router("/resume/send2mail",&controllers.Info4ResumeController{},"POST:Send2Mail")
	//用户信息管理
	beego.Router("/main/user/listOne",&controllers.UserController{},"POST:ListOne")
	beego.Router("/main/user/update",&controllers.UserController{},"POST:Update")
	beego.Router("/main/user/validate4mail",&controllers.UserController{},"POST:Validate4mail")
	beego.Router("/main/user/mail4confirm",&controllers.UserController{},"POST:Mail4confirm")

	//定制错误页
	beego.ErrorController(&controllers.ErrorController{})

}
