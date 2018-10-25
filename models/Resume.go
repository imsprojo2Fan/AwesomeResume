package models

import (
	"time"
	"github.com/astaxie/beego/orm"
	"fmt"
)

// Model Struct
type Resume struct {
	Id  int
	Eid string
	Name string `orm:"size(32)"`
	Type string `orm:"size(32)"`
	Url string `orm:"size(32)"`
	Likes int `orm:"size(8)"`
	Views int `orm:"size(8)"`
	Mades int `orm:"size(8)"`
	Updated time.Time `orm:"auto_now_add;type(datetime)"`
	Created time.Time `orm:"auto_now_add;type(datetime)"`
}

func (a *Resume) TableName() string {
	return ResumeTBName()
}

func(this *Resume) Insert(Resume *Resume) bool {

	o := orm.NewOrm()
	_,err := o.Insert(Resume)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *Resume) Update(Resume *Resume) bool {

	o := orm.NewOrm()
	_,err := o.Update(Resume)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *Resume) Delete(Resume *Resume) bool {

	o := orm.NewOrm()
	_,err := o.Delete(Resume)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *Resume) Read(Resume *Resume) bool {

	o := orm.NewOrm()
	err := o.Read(Resume)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		return true
	}
}

func(this *Resume) SelectByEid(resume *Resume) {

	o := orm.NewOrm()
	o.Read(resume,"eid")
}
