package models

import (
	"github.com/astaxie/beego/orm"
	"fmt"
	"time"
)

// Model Struct
type WXInfo struct {
	Id   int
	Openid string `orm:"size(64)"`
	Unionid string `orm:"size(64)"`
	Type int
	NickName string `orm:"size(128)"`
	Avatar string `orm:"size(128)"`
	Gender string `orm:"size(4)"`
	Country string `orm:"size(16)"`
	Province string `orm:"size(16)"`
	City string `orm:"size(16)"`
	Updated time.Time `orm:"auto_now_add;type(datetime)"`
	Created time.Time `orm:"auto_now_add;type(datetime)"`
}

func (a *WXInfo) TableName() string {
	return WXInfoTBName()
}

func(this *WXInfo) Insert(WXInfo *WXInfo) bool {

	o := orm.NewOrm()
	_,err := o.Insert(WXInfo)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *WXInfo) Update(WXInfo *WXInfo) bool {

	o := orm.NewOrm()
	_,err := o.Update(WXInfo)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *WXInfo) Delete(WXInfo *WXInfo) bool {

	o := orm.NewOrm()
	_,err := o.Delete(WXInfo)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *WXInfo) Read(WXInfo *WXInfo) bool {

	o := orm.NewOrm()
	err := o.Read(WXInfo)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		fmt.Println(WXInfo.Id, WXInfo.NickName)
		return true
	}
}

