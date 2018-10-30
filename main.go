package main

import (
	_ "AwesomeResume/routers"
	"github.com/astaxie/beego"
	_"AwesomeResume/sysinit"
	"github.com/astaxie/beego/context"
	"AwesomeResume/utils"
	"fmt"
	"strings"
	"net/http"
)

func init()  {

	//是否开启 XSRF，默认为 false，不开启  防跨站
	beego.BConfig.WebConfig.EnableXSRF = true
	beego.BConfig.WebConfig.XSRFExpire = 3600  //过期时间，默认1小时
	beego.BConfig.WebConfig.XSRFKey = "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o"
	//是否开启热升级，默认是 false，关闭热升级。
	beego.BConfig.Listen.Graceful=false

	//透明static
	beego.InsertFilter("/static", beego.BeforeRouter, TransparentStatic)

	//判断用户是否登录/登录超时
	var FilterUser = func(ctx *context.Context) {
		session,_ := utils.GlobalSessions.SessionStart(ctx.ResponseWriter, ctx.Request)
		id, ok := session.Get("id").(int)
		fmt.Println("-------id:",id)
		if !ok {
			ctx.Redirect(302, "/timeout")
		}
	}
	beego.InsertFilter("/main/*",beego.BeforeRouter,FilterUser,false)
}

func TransparentStatic(ctx *context.Context) {
	if strings.Index(ctx.Request.URL.Path, "v1/") >= 0 {
		return
	}
	http.ServeFile(ctx.ResponseWriter, ctx.Request, "static/"+ctx.Request.URL.Path)
}

func main() {
	beego.Run()
}


