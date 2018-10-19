package models

import (
	"github.com/astaxie/beego/orm"
	"fmt"
)

// Model Struct
type User struct {
	Id   int
	Name string `orm:"size(100)"`
}

func (a *User) TableName() string {
	return UserTBName()
}

func(this *User) Insert(user *User) bool {

	o := orm.NewOrm()
	_,err := o.Insert(user)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *User) Update(user *User) bool {

	o := orm.NewOrm()
	_,err := o.Update(user)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *User) Delete(user *User) bool {

	o := orm.NewOrm()
	_,err := o.Delete(user)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *User) Read(user *User) bool {

	o := orm.NewOrm()
	err := o.Read(user)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		fmt.Println(user.Id, user.Name)
		return true
	}
}

