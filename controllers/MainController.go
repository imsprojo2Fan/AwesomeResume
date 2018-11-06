package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeResume/utils"
	"AwesomeResume/enums"
	"AwesomeResume/models/other"
	"net/http"
	"fmt"
	"os"
	"time"
	"strconv"
)

type MainController struct {
	beego.Controller
}

func(this *MainController) Index()  {
	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	userInfo := session.Get("user")
	this.Data["userInfo"] = userInfo
	this.Data["account"] = session.Get("account")
	this.Data["is2made"] = session.Get("is2made")//设置登录成功即跳转到我的制作页面
	session.Set("is2made",false)
	this.TplName = "main/index.html"
}

func(this *MainController) Redirect()  {
	htmlName := this.GetString("htmlName")
	this.Data["_xsrf"] = this.XSRFToken()
	htmlName = "main/"+htmlName+".html"
	this.TplName = htmlName
}

func(this *MainController) Upload4Pic()  {

	f, _, _ := this.GetFile("file")                  //获取上传的文件
	_dir := "../file4resume"
	exist, err := utils.PathExists(_dir)
	if err != nil {
		fmt.Printf("get dir error![%v]\n", err)
		return
	}

	if exist {
		fmt.Printf("has dir![%v]\n", _dir)
	} else {
		fmt.Printf("no dir![%v]\n", _dir)
		// 创建文件夹
		err := os.Mkdir(_dir, os.ModePerm)
		if err != nil {
			fmt.Printf("mkdir failed![%v]\n", err)
		} else {
			fmt.Printf("mkdir success!\n")
		}
	}
	fileName := time.Now().Unix()
	fileName_ := strconv.FormatInt(fileName,10)+".jpg"
	path := _dir+"/"+fileName_    //文件目录
	f.Close()                                          //关闭上传的文件，不然的话会出现临时文件不能清除的情况
	err = this.SaveToFile("file", path)      //存文件

	if err!=nil{
		this.jsonResult(http.StatusOK,-1, "上传文件失败!", nil)
	}else{
		this.jsonResult(http.StatusOK,1, "上传文件成功!", fileName_)
	}
}

func (c *MainController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}
