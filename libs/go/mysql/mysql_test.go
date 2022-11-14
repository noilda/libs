package mysql

import (
	"testing"
)

func TestMysql(t *testing.T) {
	result := Mysql("works")
	if result != "Mysql works" {
		t.Error("Expected Mysql to append 'works'")
	}
}