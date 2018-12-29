package utils

import (
	"testing"
	"fmt"
	"encoding/base64"
)

func Test(t *testing.T) {
	fmt.Println(RandomNumber2(1000))
	key := []byte("0123456789abcdef")
	result, err := AesEncrypt([]byte("666666AwesomeResume_"), key)
	if err != nil {
		panic(err)
	}
	fmt.Println(base64.StdEncoding.EncodeToString(result))
	origData, err := AesDecrypt(result, key)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(origData))
}
