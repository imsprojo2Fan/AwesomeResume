package utils

import (
	"testing"
	"fmt"
	"encoding/base64"
)

func TestRandomString(t *testing.T) {

	key := []byte("0123456789abcdef")
	result, err := AesEncrypt([]byte("123456AwesomeResume_"), key)
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
