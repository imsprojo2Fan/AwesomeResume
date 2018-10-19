package controllers

import (
	"github.com/astaxie/beego"
	"fmt"
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

