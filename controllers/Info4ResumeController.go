package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeResume/enums"
	"AwesomeResume/models/other"
	"AwesomeResume/models"
	"AwesomeResume/utils"
	"net/http"
)

type Info4ResumeController struct {
	beego.Controller
}

func(this *Info4ResumeController) Insert()  {

	user := new(models.WXInfo)
	var UID string
	ShareID := utils.RandStringBytesMaskImprSrc(20)

	uid,_ := this.GetInt64("uid")//已存在用户则不新增用户
	if uid==0{
		UID = utils.RandStringBytesMaskImprSrc(16)
		user.Uid = UID
		uid =user.ReadOrCreate(*user)//插入用户表记录
	}

	info4resume := new(models.Info4Resume)
	info4resume.Uid = uid
	info4resume.Rid = this.GetString("rid")
	info4resume.Sid = ShareID
	info4resume.Name = this.GetString("name")
	info4resume.Objective = this.GetString("objective")
	info4resume.Gender = this.GetString("gender")
	info4resume.Birthday = this.GetString("birthday")
	info4resume.Phone = this.GetString("phone")
	info4resume.Email = this.GetString("email")
	info4resume.Province = this.GetString("province")
	info4resume.City = this.GetString("city")
	info4resume.Address = this.GetString("address")
	info4resume.Hobby = this.GetString("hobby")
	info4resume.Honors = this.GetString("honor")
	info4resume.Introduce = this.GetString("introduce")
	info4resume.Works = this.GetString("works")
	info4resume.Skills = this.GetString("skills")
	info4resume.Educations = this.GetString("edus")
	if !info4resume.Insert(info4resume){
		this.jsonResult(http.StatusOK,-1, "提交数据失败!请稍候再试", nil)
	}else{
		//添加当前用户操作记录
		operate := new(models.Operate)
		operate.Uid = uid
		operate.Rid = this.GetString("rid")
		operate.Type = 2
		operate.Insert(operate)

		if UID!=""{
			this.jsonResult(http.StatusOK,1, "数据插入成功!", UID)
		}else{
			this.jsonResult(http.StatusOK,1, "数据插入成功!", ShareID)
		}

	}


}

func (c *Info4ResumeController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}