package controllers

import (
	"github.com/astaxie/beego"
	"fmt"
	"AwesomeResume/models"
	"AwesomeResume/enums"

	"AwesomeResume/models/other"
)

type IndexController struct {
	beego.Controller
}

func (c *IndexController) Index() {

	//跳转页面及传递数据
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"

	//设置token
	token := c.XSRFToken()
	c.Data["_xrf"] = token
	fmt.Println(token)

	c.TplName = "index.html"

}

func (this *IndexController) Template() {

	eid := this.GetString("e")
	//查询resume表获取模板url
	resume:= new(models.Resume)
	resume.Eid = eid
	resume.SelectByEid(resume)
	if resume==nil{
		this.TplName = "tip/404.html"
	}
	htmlName:= resume.Url+".html"
	this.TplName = htmlName

}

func (c *IndexController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}

