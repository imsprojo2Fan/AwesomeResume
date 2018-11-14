package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeResume/enums"
	"AwesomeResume/models/other"
	"AwesomeResume/models"
	"AwesomeResume/utils"
	"net/http"
	"strconv"
	"time"
	"strings"
	"net/smtp"
	"fmt"
)

type Info4ResumeController struct {
	beego.Controller
}

func(this *Info4ResumeController) Insert()  {

	user := new(models.User)
	var UID string
	ShareID := utils.RandStringBytesMaskImprSrc(20)

	uid,_ := this.GetInt64("uid")//已存在用户则不新增用户
	if uid==0{
		UID = utils.RandStringBytesMaskImprSrc(16)
		user.Uid = UID
		user.Name = this.GetString("name")
		user.Gender = this.GetString("gender")
		user.Phone = this.GetString("phone")
		user.Email = this.GetString("email")
		user.Birthday = this.GetString("birthday")
		uid = user.ReadOrCreate(*user)//插入用户表记录
	}
	info4resume := new(models.Info4Resume)
	info4resume.Uid = uid
	info4resume.Rid = this.GetString("rid")
	info4resume.Sid = ShareID
	info4resume.Theme = this.GetString("theme")
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

func(this *Info4ResumeController) Insert4Use()  {
	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	qMap := make(map[string]interface{})
	var dataList []models.Info4Resume

	ShareID := utils.RandStringBytesMaskImprSrc(20)
	uid_ := session.Get("id").(int64)
	qMap["uid"] = strconv.FormatInt(uid_,10)
	rid := this.GetString("rid")
	qMap["rid"] = rid

	info4resume := new(models.Info4Resume)
	info4resume.ListMade(qMap,&dataList)
	if len(dataList)>0{
		*info4resume = dataList[0]
		info4resume.Id = 0
		info4resume.Uid = uid_
		info4resume.Sid = ShareID
		info4resume.Rid = rid
		info4resume.Updated = time.Now()
		info4resume.Created = time.Now()
		if !info4resume.Insert(info4resume){
			this.jsonResult(http.StatusOK,-1, "添加数据失败!请稍候再试", nil)
		}else{
			//添加当前用户操作记录
			operate := new(models.Operate)
			operate.Uid = uid_
			operate.Rid = this.GetString("rid")
			operate.Type = 2
			operate.Insert(operate)
			this.jsonResult(http.StatusOK,1, "数据插入成功!", ShareID)
		}
	}else{
		this.jsonResult(http.StatusOK,-1, "您还未填写过简历信息", nil)
	}
}

func (this *Info4ResumeController)ListByUid() {

	qMap := make(map[string]interface{})
	var dataList []models.Info4Resume
	//backMap := make(map[string]interface{})

	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	uid_ := session.Get("id").(int64)
	qMap["uid"] = strconv.FormatInt(uid_,10)
	info4resume := new(models.Info4Resume)
	info4resume.ListMade(qMap,&dataList)

	this.jsonResult(http.StatusOK,1,"数据查询成功",dataList)

}

func (this *Info4ResumeController)Update()  {
	info4resume := new(models.Info4Resume)
	id_ := this.GetString("id")
	uid_ := this.GetString("uid")
	info4resume.Id,_ = strconv.Atoi(id_)
	info4resume.Uid,_ = strconv.ParseInt(uid_, 10, 64)
	info4resume.Rid = this.GetString("rid")
	info4resume.Sid = this.GetString("sid")
	info4resume.Theme = this.GetString("theme")
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
	info4resume.Updated = time.Now()
	cteate_,_ := this.GetInt64("created")
	tm2 := time.Unix(cteate_/1000,0).Format("2006-01-02 15:04:05")
	t,_ := time.Parse("2006-01-02 15:04:05",tm2)
	info4resume.Created = t
	if !info4resume.Update(info4resume,""){
		this.jsonResult(http.StatusOK,-1, "更新数据失败!请稍候再试", nil)
	}else{
		this.jsonResult(http.StatusOK,1, "更新成功!", nil)
	}
}

func (this *Info4ResumeController)Reset4share()  {
	id := this.GetString("id")

	if id==""{
		this.jsonResult(http.StatusOK,-1,"参数错误!",nil)
	}

	sid := utils.RandStringBytesMaskImprSrc(20)
	info4resume := new(models.Info4Resume)
	info4resume.Id,_ = strconv.Atoi(id)
	info4resume.Sid = sid
	if !info4resume.Update(info4resume,"sid"){
		this.jsonResult(http.StatusOK,-1,"数据库操作失败!请稍后再试",nil)
	}
	this.jsonResult(http.StatusOK,1,"重置成功!",sid)
}

func (this *Info4ResumeController)Share()  {
	sid := this.GetString("v")
	if sid==""{
		this.TplName = "tip/404.html"
		return
	}
	//按sid查询rid
	info4resume := new(models.Info4Resume)
	info4resume.Sid = sid
	info4resume.SelectBySid(info4resume)

	if info4resume.Rid==""{
		this.TplName = "tip/404.html"
		return
	}
	//查询模板url
	resume := new(models.Resume)
	resume.Eid = info4resume.Rid
	resume.SelectByEid(resume)
	if resume.Url==""{
		this.TplName = "tip/404.html"
		return
	}
	//设置token
	this.Data["_xsrf"] = this.XSRFToken()
	this.Data["dbData"] = info4resume
	htmlName:= "resume/"+resume.Url+".html"
	this.TplName = htmlName
}

func (this *Info4ResumeController)Send2Mail()  {
	sid := this.GetString("sid")
	if sid==""{
		this.jsonResult(200,-1,"参数错误!",nil)
	}
	messageObj := new(models.Message)
	messageObj.Company = this.GetString("company")
	messageObj.Name = this.GetString("name")
	messageObj.Email = this.GetString("email")
	messageObj.Message = this.GetString("message")

	//按sid查询rid
	info4resume := new(models.Info4Resume)
	info4resume.Sid = sid
	info4resume.SelectBySid(info4resume)

	if info4resume.Email==""{
		this.jsonResult(200,-1,"ta似乎忘了填写邮箱地址!",nil)
	}
	//发送邮件
	go SendMail4Resume(info4resume.Email,messageObj)
	//添加消息记录
	messageObj.Uid = info4resume.Uid
	messageObj.Insert(messageObj)
	this.jsonResult(200,1,"您的留言信息我们已成功送达:)",nil)
}

func SendMail4Resume(mail string,messageObj *models.Message)  {
	auth := smtp.PlainAuth("", "zooori@foxmail.com", "fznqfopwakggibej", "smtp.qq.com")
	to := []string{"imsprojo2fan@foxmail.com"}

	nickname := "即刻简历"
	user := "zooori@foxmail.com"
	subject := "即刻简历-留言信息"
	content_type := "Content-Type: text/plain; charset=UTF-8"

	body := "【用户邮箱】："+mail
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
	err := smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	if err != nil {
		fmt.Printf("send mail error: %v", err)
	}

	if mail!=""{
		to[0] = mail
		body = "【您有新留言信息】\r\n公司名称:"+messageObj.Company+"\r\n对方称谓:"+messageObj.Name+"\r\n邮箱地址:"+messageObj.Email+"\r\n留言信息:"+messageObj.Message
		msg = []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
			"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
		smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	}
}

func (c *Info4ResumeController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}