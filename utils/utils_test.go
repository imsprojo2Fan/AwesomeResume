package utils

import (
	"testing"
	"fmt"
	"encoding/base64"
)

func Test(t *testing.T) {
	fmt.Println(RandomNumber2(1000))
	key := []byte("0123456789abcdef")
	salt := "AwesomeResume_"
	result, err := AesEncrypt([]byte("AwesomeRoot"+salt), key)
	if err != nil {
		panic(err)
	}
	fmt.Println("Dec:",base64.StdEncoding.EncodeToString(result))
	origData, err := AesDecrypt(result, key)
	if err != nil {
		panic(err)
	}
	fmt.Println("OriData:",string(origData))
}
