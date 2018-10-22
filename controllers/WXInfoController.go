package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeResume/models"
	"AwesomeResume/utils"
	"net/http"
)

type WXInfoController struct {
	beego.Controller
}

func (this *WXInfoController)Insert()  {
	rJson := new(utils.ResultJson)
	name:= this.GetString("name","")
	user := new(models.WXInfo)
	user.NickName = name
	if user.Insert(user){
		rJson.Status = http.StatusOK
		rJson.Code = 1
		rJson.Message = "Add Success"
		rJson.Data = nil
	}else{
		rJson.Status = http.StatusOK
		rJson.Code = -1
		rJson.Message = "Add Failure"
		rJson.Data = nil
	}
	this.Data["json"] = rJson
	this.ServeJSON()
	this.StopRun()

}
