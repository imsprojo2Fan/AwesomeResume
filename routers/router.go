package routers

import (
	"AwesomeResume/controllers"
	"github.com/astaxie/beego"
)

func init() {
	//网站首页相关
	beego.Router("/", &controllers.IndexController{},"*:Index")
	beego.Router("/template", &controllers.IndexController{},"*:Index")
	//登录相关
	beego.Router("/login", &controllers.LoginController{},"*:LoginIndex")
	beego.Router("/validate", &controllers.LoginController{},"*:Validate")
	beego.Router("/timeout", &controllers.LoginController{},"*:Timeout")
	//后台管理相关
    beego.Router("/main",&controllers.MainController{},"*:Index")
	beego.Router("/main/redirect",&controllers.MainController{},"*:Redirect")
	//定制错误页
	beego.ErrorController(&controllers.ErrorController{})

}
