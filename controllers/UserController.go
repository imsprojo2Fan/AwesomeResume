package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeResume/models"
	"AwesomeResume/utils"
	"net/http"
)

type UserController struct {
	beego.Controller
}

func (this *UserController)Insert()  {
	rJson := new(utils.ResultJson)
	name:= this.GetString("name","")
	user := new(models.User)
	user.Name = name
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
