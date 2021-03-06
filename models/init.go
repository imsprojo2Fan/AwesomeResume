package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

//初始化
func init() {
	orm.RegisterModel(new(User))
	orm.RegisterModel(new(WXInfo))
	orm.RegisterModel(new(Resume))
	orm.RegisterModel(new(Info4Resume))
	orm.RegisterModel(new(Operate))
	orm.RegisterModel(new(Message))
}

//下面是统一的表名管理
func TableName(name string) string {
	prefix := beego.AppConfig.String("db_dt_prefix")
	return prefix + name
}

//获取 BackendUser 对应的表名称
func UserTBName() string {
	return TableName("user")
}

//获取 BackendUser 对应的表名称
func WXInfoTBName() string {
	return TableName("wxinfo")
}

func ResumeTBName() string {
	return TableName("resume")
}

func Info4ResumeTBName() string {
	return TableName("info4resume")
}

func OpetrateTBName() string {
	return TableName("operate")
}

func MessageTBName() string {
	return TableName("message")
}
